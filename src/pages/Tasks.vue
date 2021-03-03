<template>
  <router-view></router-view>
  <section class="tasks">
    <base-card>
      <header class="tasks__header">
        <h1 class="header__title">{{ formatedDate }}</h1>
        <div class="header__actions">
          <base-button :isLink="true" path="/tasks/add" mode="outline"
            >Add Task</base-button
          >
          <base-button mode="flatten">Calendar</base-button>
        </div>
      </header>
    </base-card>
    <ul class="tasks__menu">
      <task-item
        v-for="task in tasksList"
        :key="task.id"
        :time="task.time"
        :description="task.description"
        :id="task.id"
      />
    </ul>
  </section>
</template>

<script>
import { dateFormated } from "../util/dates";
import TaskItem from "../components/TaskItem";

export default {
  components: {
    "task-item": TaskItem,
  },
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
    tasksList() {
      return this.$store.getters["todos/getTodos"];
    },
    formatedDate() {
      return dateFormated(this.date);
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.tasks {
  width: 100%;
  padding: 24px 0;
}

.tasks__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.header__title {
  flex: 1;
  margin-right: 16px;
}

.header__actions {
  display: flex;
  flex-direction: column;
}

.header__actions > *:not(:last-child) {
  margin-bottom: 8px;
}

.tasks__menu {
  margin-top: 16px;
}

.tasks__menu > *:not(:last-child) {
  margin-bottom: 16px;
}
</style>
