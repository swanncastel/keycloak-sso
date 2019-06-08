import Vue from 'vue'
import Vuex from 'vuex'
import Keycloak from 'keycloak-js'

Vue.use(Vuex)

export const keycloak = new Keycloak()

export const state = {
  token: null,
  tokenParsed: null
}

const mutations = {}

const getters = {
  isAuth: state => !!state.token
}

const actions = {
  signin: () => {
    console.log('signin')
    keycloak.login({ redirectUri: '/' })
      .then(console.log)
      .catch(console.error)
  },

  logout: () => keycloak.logout()
}


keycloak.init({ onLoad: 'login-required' })
  .success(isAuth => {
    console.log(keycloak)
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
