<template>
  <div>
    <ul>
      <li v-for="(todo, i) in todos" :key="i">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TodoList',

  computed: mapState(['todos']),

  created() {
    this.getTodos()
  },

  methods: mapActions(['getTodos'])
}
</script>
