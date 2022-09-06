import {
	createStore
} from 'vuex'

// Create a new store instance.
const store = createStore({
	state() {
		return {
			someState: {} // Data from file imported
		}
	},
	mutations: {
		setSomeState(state, payload) {
			state.someState = payload
		}
	},
	getters: {
		getSomeState(state) {
			return state.someState;
		}
	}
})

export default store