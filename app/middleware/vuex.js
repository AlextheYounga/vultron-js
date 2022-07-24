import {
	createStore
} from 'vuex'

// Create a new store instance.
const store = createStore({
	state() {
		return {
			importData: {} // Data from file imported
		}
	},
	mutations: {
		setImportData(state, payload) {
			state.importData = payload
		}
	},
	getters: {
		getImportData(state) {
			return state.importData;
		}
	}
})

export default store