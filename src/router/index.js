// import session from '../middleware/session'
import {
	createRouter,
	createWebHistory
} from 'vue-router'

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
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})


export default router