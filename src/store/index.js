import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        name: '',
        id: '',
        role: ''
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_ROLE: (state, role) => {
            state.role = role
        }
    },
    actions: {
        SetUserInfo: ({commit}, user) => {
            commit('SET_ID', user.id)
            commit('SET_NAME', user.name)
            commit('SET_ROLE', user.role)
        },
        logout: ({commit}) => {
            commit('SET_ID', '')
            commit('SET_NAME', '')
            commit('SET_ROLE', '')
        }
    },
    getters
})
