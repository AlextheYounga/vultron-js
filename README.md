# Vultron JS
## An Electron MVC for building desktop apps that makes sense
#### [Electron](https://www.electronjs.org/) | [Vue3](https://v3.vuejs.org/) | [Knex](https://knexjs.org/) & [Bookshelf](https://bookshelfjs.org/) | [Tailwind](https://tailwindcss.com/)

Coming from a full-stack, MVC mindset makes Electron seem foreign. I sought to find the best way to bring the MVC mindset to Electron.

No third party database, data is stored in a sql environment using Knex and Bookshelf, which can support Sqlite3, Mysql, and Postgres. The data is all stored locally by default in Sqlite3

To run Electron's dev environment:
```
yarn run electron:serve
```

To build electron:
```
yarn run electron:build
```

## Controllers
The magic happens in the server folder, which uses Electron's [ipcMain](https://www.electronjs.org/docs/latest/api/ipc-main) module to create a backend-to-frontend api. 

You create your controllers with this strategy:
```javascript
const User = require('../../models/User')

const AuthController = {
	/* Specify which functions here will be included in Electron's ipcMain module. 
	* This is what you will query on the frontend. 
	*/
	endpoints: ['login'], 

	login: function (arg) {
		User.verify(arg.username, arg.password).then(function (verified) {
			return verified.toJSON()
		})
	},
}

export default AuthController
```

You place your functions in the controller object, and just specify which functions you want to appear as callable endpoints in Electron's ipcMain module. Any functions not listed in the endpoints array will not be sent to the api.

From the frontend you will use the this.$api global variable of ipcRenderer to fire ipcMain events like this: 
```javascript
this.$api.on('login', (event, arg) => { //function that fires when a response is received from 'login' event
	let user = arg // returned value
	if (!user) return
	if (user instanceof Error) { // Error handling
		this.$data.notFound = user.message
		return
	}
	if (user.id) {
		this.$router.push('dashboard') // Go to dashboard
	}
})
// Fire login call to ipcMain, first param endpoint, second param payload.
this.$api.send('login', {
	username: this.$data.form.username, //payload
	password: this.$data.form.password
})
```

These calls are asynchronous because Javascript (if you're new to Javascript just get used to the messy cody blocks that come from async functions). You'll have to keep this in mind when building out your Vue frontends.
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
	created(){ // This will be fired on page load.
            this.$api.on('ping', (event, arg) => {
		this.$data.apiValue = arg // This will change the value of apiValue as soon as it returns.
            })
            this.$api.send('ping')
	}
    };
</script>
```

## Models
Your models are handled by a combination of knex.js & bookshelf.js, (which is an extension of knex). If you come from a Laravel/Rails background, you will love how nice your models are. 

```javascript
const bookshelf = require('../database/bookshelf');
const User = require('./User.js');

const Bank = {
	model: bookshelf.Model.extend({
		tableName: 'banks',
		user: function () {
			return this.belongsTo(User); //Specify relations like this.
		},
	}),
}

module.exports = Bank;
```

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
I don't know about you, but I hate building out forms, going back and forth to find which fields go where. I hate that. I do everything programmatically. So by default a schema file is generated in src/database/schema.json as soon as Electron is built. You can use this schema in the frontend if you'd like by calling ```this.$schema.``` I have even included a DynamicTable file to give an example of what I mean. 

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
## I'd like to make this great, please reach out to me with any issues/features you would like to see. 

# Enjoy
