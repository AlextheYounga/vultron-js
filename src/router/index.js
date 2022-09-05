import {
	createRouter,
	createWebHistory
} from 'vue-router'
const SessionManager = require('../../framework/Session/session-manager')

function loadView(view) {
	return () => import(`../views/${view}.vue`);
}

const routes = [{
	path: '/',
	name: 'welcome',
	component: loadView('Welcome'),
	// props: {hi: 'this is the prop'},
},
{
	path: '/login',
	name: 'auth.login',
	component: loadView('auth/Login'),
}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})


function redirectAuth(to, path, param) {
	console.log(`Redirecting ${path}`)
	return {
		path: path,
		// save the location we were at to come back later
		query: {
			q: param,
			redirect: to.fullPath
		},
	}
}

router.beforeEach(async (to) => {
	// instead of having to check every route record with
	// to.matched.some(record => record.meta.requiresAuth)

	if (to.meta.requiresAuth) {
		let validSession = await SessionManager.validate()
		if (!validSession) {
			let restoreSession = await SessionManager.restore()
			if (restoreSession.id) {
				return redirectAuth(to, '/soft-login', restoreSession.id)
			}
			return redirectAuth(to, '/login')
		}
	}
	if (to.path == '/') {
		return {
			path: '/dashboard'
		}
	}
})


export default router