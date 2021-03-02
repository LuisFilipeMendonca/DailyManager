<template>
  <h1>{{ date }}</h1>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
    };
  },
  methods: {
    async fetchTodos() {
      this.$store.dispatch("todos/getTodos", this.date);
    },
  },
  computed: {
    todosList() {
      console.log(this.$store.getters["todos/getTodos"]);
      return null;
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>
