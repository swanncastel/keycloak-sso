import Vue from 'vue'
import Vuex from 'vuex'
import Keycloak from 'keycloak-js'

Vue.use(Vuex)

export const keycloak = new Keycloak(`${window.location.origin}/keycloak.json`)

const TODOS_FETCH = 'TODOS_FETCH'
const TODOS_ERROR = 'TODOS_ERROR'

export const state = {
  token: null,
  tokenParsed: null,
  todos: []
}

const getters = {
  isAuth: state => !!state.token
}

const mutations = {
  [TODOS_FETCH]: (state, todos) => (state.todos = todos),
  [TODOS_ERROR]: state => (state.todos = [])
}

const actions = {
  logout: () => keycloak.logout(),

  getTodos: ({ state, commit }) => {
    fetch('/api/todos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${state.token}`
      }
    })
      .then(res => {
        if (!res.ok) throw res
        return res.json()
      })
      .then(todos => commit(TODOS_FETCH, todos))
      .catch(err => {
        console.error(err)
        commit(TODOS_ERROR)
      })
  }
}

keycloak.init({ onLoad: 'login-required' })
  .success(isAuth => {
    if (isAuth) {
      state.token = keycloak.token
      state.tokenParsed = keycloak.tokenParsed
    }
  }).error(() => {
    console.error('failed to initialize')
  });

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
