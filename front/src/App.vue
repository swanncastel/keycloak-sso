<template>
  <v-app v-if="isAuth">
    <v-navigation-drawer
      app
      clipped
      permanent
      :mini-variant.sync="mini"
    >
      <v-list dense class="pt-0">
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span>SSO</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuth" flat icon href="http://localhost:8080/auth/realms/sso/account/">
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn v-if="isAuth" flat icon @click="logout">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'App',

  data() {
    return {
      mini: false,
      items: [
        { title: 'Home', icon: 'dashboard', to: '/' },
        { title: 'About', icon: 'question_answer', to: '/about' },
        { title: 'Todo List', icon: 'list', to: '/todo-list' }
      ]
    }
  },

  computed: mapGetters(['isAuth']),

  methods: mapActions(['logout'])
}
</script>
