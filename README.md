# Vultron JS
## An Electron MVC for building desktop apps that makes sense
#### [Electron](https://www.electronjs.org/) | [Vue3](https://v3.vuejs.org/) | [Knex](https://knexjs.org/) & [Bookshelf](https://bookshelfjs.org/) | [Tailwind](https://tailwindcss.com/)

Vultron allows devs with an MVC background to jump right into making small-scale, non-enterprise desktop applications. Vultron handles the esoteric parts of Electron for you. It also allows you to use SQL databases with Electron, all wrapped in a framework that feels more like Rails or Laravel. 

Databases are handled using [Knex](https://knexjs.org/) and [Bookshelf](https://bookshelfjs.org/), which can support Sqlite3, Mysql, and Postgres. 

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
│   ├── models
│   ├── modules
│   └── server
│       ├── api.js // Handles Electron's ipcMain functions
|		├── routes.js // Place your API routes 
│       └── controllers // Your controllers and controller actions will get compiled by api.js
├── database
│   ├── bookshelf.js // Handles Bookshelf configs for models.
│   ├── database.js // Handles initial db functions and schema functions
│   ├── migrations // Migrations handled by Knex
│   └── schema.json // Schema file
├── knexfile.js // Handles Knex configs and is primary database config file.
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   ├── background.js // Electron create window functions
│   ├── components
│   ├── main.js // Main file for Vue
│   ├── router
│   └── views //Frontend views
├── tailwind.config.js
├── vue.config.js //Handles Vue configs and Electron builder configs
├── vultron.db
├── yarn-error.log
└── yarn.lock
```

## Controllers
The magic happens in the ```app/server``` folder, which use Electron's [ipcMain](https://www.electronjs.org/docs/latest/api/ipc-main) module to create a backend-to-frontend api. No third party server system like Express is necessary, it is all handled through Electron. 

You create your controllers with this strategy:
```javascript
const User = require('../../models/User')

const AuthController = {
	login: function (event, creds) {
		User.verify(creds.username, creds.password).then(function (verified) {
			event.reply(event.routeName, verified.toJSON()) // Send reply back using name of endpoint event automatically stored in the event variable.
		})
	},
}

export default AuthController
```

You place your functions in the controller object, and you can specify your API routes in the server/routes.js file.

```javascript
const Routes = {
	auth: [{ //grouping should match prefix of controller
		name: 'login', //add custom names to the route
		action: 'login' //corresponds to a function in your controller file.
	}],
}
```

From the frontend you will use the this.$api global variable of ipcRenderer to fire ipcMain events like this: 
```javascript
this.$api.send('api.ping') // Call api endpoint

this.$api.on('api.ping', (args) => { // Runs when ipcRenderer responds
	console.log(arg)
	this.$data.apiValue = arg // This will change the value of apiValue as soon as it returns.
})
```

These calls are asynchronous because Javascript (if you're new to Javascript just get used to the messy code blocks that come from async functions). You'll have to keep this in mind when building out your Vue frontends.
Here's an example of passing data to a Vue template on page load. 

```vue
<template>
	<!-- The v-if will handle the null value, so it won't show until the value is returned. -->
	<p v-if="apiValue"> {{ apiValue }} </p> 
</template>
<script>
    import App from "@/App.vue"

    export default {
        layout: App,
        data() {
			return {
				// The value should be instantiated here. If you work with Vue you should be used to doing that already.
				apiValue: null, 
			}
        },
		created() { // This will be fired on page load.
			this.$api.send('api.ping') // Call api endpoint

			this.$api.on('api.ping', (event, arg) => { // Runs when ipcRenderer responds
				this.$data.apiValue = arg // This will change the value of apiValue as soon as it returns.
			})
		}
	},
	created() { // This will be fired on page load.
		this.$api.send('api.ping') // Call api endpoint

		this.$api.on('api.ping', (event, arg) => { // Runs when ipcRenderer responds
			this.$data.apiValue = arg // This will change the value of apiValue as soon as it returns.
		})
	}
    };
</script>
```

## Models
Your models are handled by a combination of [Knex JS](https://knexjs.org/) & [Bookshelf JS](https://bookshelfjs.org/), (which is an extension of knex). If you come from a Laravel/Rails background, you will love how nice your models look and how familiar they feel. 

```javascript
const bookshelf = require('../database/config/bookshelf')
const User = require('./User.js');

// Bank Model that belongs to User
const Bank = {
	model: bookshelf.Model.extend({
		tableName: 'banks',
		user: function () {
			return this.belongsTo(User); // Set relations in a very MVC fashion. 
		},
	}),
}

module.exports = Bank;
```

Then, elsewhere, you can call Bookshelf SQL queries by calling Bank.model:
```javascript
Bank.model.fetchAll().then((banks) => {
	/* Do async here. 
	* Read the bookshelf-js documentation for more detailed documentation here.
	* https://bookshelfjs.org/
	*/
})
```

Keep in mind that all (useful) Bookshelf functions are async, so write your code accordingly. Some of the Bookshelf documentation can seem... sporadic, but I have provided examples of successful Bookshelf queries without ever writing a single Promise.

I have also included examples of how to automatically encrypt fields and handle user verification. 

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
app.config.globalProperties.$http = () => axios
app.config.globalProperties.$api = ipcRenderer
app.config.globalProperties.$schema = schema
app.config.globalProperties.$helpers = Helpers

```

This is how Vue3 handles global variables. You can call these in your views like ```this.$http``` (for the axios variable)

I have also included a Helpers.js file with some useful functions you can use in all your views by calling this.$helpers. 


## This is being actively developed, and more is to come, but this is more than enough to get most started. 
## I'd like to make this great, please reach out to me with any issues/features you would like to see. I will respond.

# Enjoy
