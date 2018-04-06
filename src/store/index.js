import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import * as API from '../api/user'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        id: '',
        name: '',
        role: '',
        account: ''
    },
    mutations: {
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ACCOUNT: (state, account) => {
            state.account = account
        },
        SET_ROLE: (state, role) => {
            state.role = role
        }
    },
    actions: {
        GetUserInfo: ({commit}, id) => {
            return new Promise((resolve, reject) => {
                API.getUserInfo({id}).then(user => {
                    commit('SET_ID', user.id)
                    commit('SET_ACCOUNT', user.account)
                    commit('SET_NAME', user.name)
                    commit('SET_ROLE', user.role)
                    sessionStorage.setItem('loginUserId', user.id)
                    resolve()
                }).catch(() => {
                    sessionStorage.setItem('loginUserId', '')
                    reject()
                })
            })
        },
        SetUserInfo: ({commit}, user) => {
            commit('SET_ID', user.id)
            commit('SET_ACCOUNT', user.account)
            commit('SET_NAME', user.name)
            commit('SET_ROLE', user.role)
            sessionStorage.setItem('loginUserId', user.id)
        },
        logout: ({commit}) => {
            commit('SET_ID', '')
            // commit('SET_ACCOUNT', '')
            commit('SET_NAME', '')
            commit('SET_ROLE', '')
            sessionStorage.setItem('loginUserId', '')
        }
    },
    getters
})
