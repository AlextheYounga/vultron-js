# Vultron JS
## An Electron MVC for building desktop apps that makes sense
#### [Electron](https://www.electronjs.org/) | [Vue3](https://v3.vuejs.org/) | [Knex](https://knexjs.org/) & [Bookshelf](https://bookshelfjs.org/) | [Tailwind](https://tailwindcss.com/)

Vultron allows devs with an MVC background to jump right into making self-contained, desktop applications. Vultron handles the esoteric parts of Electron for you. It also allows you to use SQL databases with Electron, all wrapped in a framework that feels more like Rails or Laravel. Desktop applications can be locally contained environments or implement an external API for third party authentication, (this is possible now, but working on giving more robust examples).

Databases are handled using [Knex](https://knexjs.org/) and [Bookshelf](https://bookshelfjs.org/), which can support Sqlite3, Mysql, and Postgres. 

Testing is handled using [Jest](https://jestjs.io/). To run tests, you may simply use `yarn test`.

By default, the first time you run electron:serve, a sqlite database is automatically generated under ```vultron.db``` and migrations will run programmatically if any exist.

To run Electron's dev environment:
```
yarn run electron:serve
```

To build electron:
```
yarn run electron:build
```

File structure:
```
├── app
│   ├── config
│	├── api.js // External API configurations
│       └── channels.js // Place controllers and actions you want to be recognized by Electrons Ipc API
│   ├── controllers // Your controllers and controller actions will get compiled by framework/Electron/ipc-api.js
│   └── models
├── database
│   ├── migrations // Migrations handled by Knex
│	├── seeds // DB Seeds handled by Knex
│   └── schema.json // Tracks your db tables and columns
├── framework // Stores all Vultron framework related files.
├── knexfile.js // Handles Knex configs and is primary database config file.
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
├── storage // App storage, holds session files by default
├── src
│   ├── App.vue
│   ├── assets
│   ├── background.js // Electron create window functions
│   ├── components
│   ├── main.js // Main file for Vue
│   ├── router
│   └── views //Frontend views
├── test // Holds all test files facilitated by Jest
├── tailwind.config.js
├── vue.config.js //Handles Vue configs and Electron builder configs
├── vultron.db
├── yarn-error.log
└── yarn.lock
```

## Controllers
The magic happens in the ```app/controller``` folder, which use Electron's [ipcMain](https://www.electronjs.org/docs/latest/api/ipc-main) module to create a backend-to-frontend api. No third party server system like Express is necessary, it is all handled through Electron. 

You create your controllers with this strategy:
```javascript
const Controller = {
	ping: function () {
		return 'pong'
	},
}

module.exports = Controller
```

## Backend Routes
You will need to specify which routes, or "channels", as they're referred to in Electron, that you'll want to be recognized, as you would do in a similar way for most MVC frameworks. These can be found in `app/config/channels.js`

Keep in mind these are only backend routes, for instance if you need to fetch something from the DB, or call some backend method that you would prefer to keep separate from your frontend Vue files.

Your frontend routes used for switching pages are handled by the [Vue Router](https://router.vuejs.org/) in `src/router/index.js`, and you can follow the Vue Router documentation to handle those accordingly. 

So you will essentially have two sets of routes here: `app/config/channels.js` and `src/router/index.js`, which sounds like more work, but it's useful for separating actual backend logic calls and something simple like switching pages. 
```javascript
const Channels = [
	//Controller
	{
		name: 'controller.ping',
		controller: 'Controller',
		action: 'ping'
	},
]


module.exports = Channels
```

## Fetching Data from Backend to Frontend
From the frontend you will use the `this.$electron` global variable of ipcRenderer to fire ipcMain events like this: 
```javascript
pingApi() {
	return this.$electron.invoke("controller.ping").then((pinged) => {
		console.log(pinged)
		this.$data.ping = pinged
	});
},
```

These calls are asynchronous, (and I haven't figured out a way to make them synchronous). You'll have to keep this in mind when building out your Vue frontends.
Here's an example of passing data to a Vue template on page load. 

```vue
<template>
	<!-- The v-if will handle the null value, so it won't show until the value is returned. -->
	<p v-if="dataFromBackend"> {{ dataFromBackend }} </p> 
</template>
<script>
    import App from "@/App.vue"

    export default {
        layout: App,
        data() {
		return {
			// The value should be instantiated here. If you work with Vue you should be used to doing that already.
			dataFromBackend: null, 
		}
        },
	created() { // This will be fired on page load.
		return this.$electron.invoke("controller.ping").then((pinged) => {
			console.log(pinged)
			this.$data.dataFromBackend = pinged
		});
	}
}
</script>
```

## Models
Your models are handled by a combination of [Knex JS](https://knexjs.org/) & [Bookshelf JS](https://bookshelfjs.org/), (which is an extension of knex). If you come from a Laravel/Rails background, this is surely more familiar than the normal messiness of the common Javascript frameworks.

```javascript
const DBConnection = require('../../framework/Database/dbconnection')
const bookshelf = DBConnection.bookshelf()
const encryptOnSave = require('../../framework/Database/encrypt-on-save') // Function for encrypting fields on save

const User = bookshelf.model('User', {
	tableName: 'users',
	hidden: ['password'], // Fields that should be hidden on fetch
	hashable: ['password'], // Fields that should be encrypted before saving
	initialize: function () { // Handles event actions, i.e., 'saving', 'fetching', 'updating', 'destroying'
		this.on('saving', this.hashAttributes, this);
	},
	hashAttributes: function (model) { // Handles encryption on saving
		return encryptOnSave(model, this.hashable)
	},
	accounts: function () {
		return this.hasMany(require('./Account')); // Associate relationship with accounts table
	},
})

module.exports = User
```

Then, elsewhere, you can make Bookshelf SQL queries like:
```javascript
User.where({email: userEmail})
.then((user) => {
	if(!user) return null
	return user.toJSON()
}).catch((err) => {
	console.log(err)
})
```

Keep in mind that all (useful) Bookshelf functions are async, so write your code accordingly. Some of the Bookshelf documentation can seem... sporadic, but I have provided many useful examples of Bookshelf queries already, especially in the test folder.

For more information here, please refer to the [knex](https://knexjs.org/) and [bookshelf](https://bookshelfjs.org/) documentations. 

### Migrations
To make new migrations 
```
knex migrate:make migration_name 
```
To push migrations
```
knex migrate:latest
```
See some of the example migrations for how to build them out.

### Schema
I hate building out forms line by line; I do everything programmatically. So by default a schema file is generated in ```database/schema.json``` as soon as Electron is built. You can use this schema in the frontend if you'd like by calling ```this.$schema.``` I have even included a DynamicTable file that uses this schema file to programmatically build out forms. If your app is going to extensively connect to the internet, you may want to consider removing this from the frontend to prevent the vulnerability of your database structure being exposed. For isolated desktop apps, this poses no real harm. 

## Views
For the frontend, we use Vue and Tailwind, which is a really fun combination. 
I have included a few global variables you can use by default in main.js: 

```javascript
app.config.globalProperties.$electron = ipcRenderer // Electron's back-to-front ipc API
app.config.globalProperties.$schema = schema // Access json object of database schema
app.config.globalProperties.$session = SessionManager // Access session functions.

```

This is how Vue3 handles global variables. You can call these in your views like ```this.$electron``` (for the electron ipc variable)


## This is being actively developed, and more is to come, but this is more than enough to get most started. 
## I'd like to make this great, please reach out to me with any issues/features you would like to see. I will respond.

# Enjoy
