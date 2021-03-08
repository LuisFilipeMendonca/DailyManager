<template>
  <router-view></router-view>
  <section class="section">
    <base-card>
      <header class="tasks__header">
        <h1 class="header__title">{{ formatedDate }}</h1>
        <div class="header__actions">
          <base-button :isLink="true" :path="addTaskUrl" mode="outline"
            >Add Task</base-button
          >
          <base-input
            id="filter"
            :type="date.type"
            :value="inputDateFormat"
            classValue="mb-none"
            :noLabel="true"
            :disabled="date.isDisabled"
            @file-change-handler="fileChangeHandler"
          />
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
        :date="date.value"
        :checked="task.checked"
        :taskDate="task.date"
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
      date: {
        type: "date",
        value: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
        isDisabled: false,
      },
    };
  },
  methods: {
    async fetchTodos() {
      this.$store.dispatch("todos/getTodos", this.date.value);
    },
    fileChangeHandler(target) {
      this.date.value = new Date(target.value);
    },
  },
  computed: {
    tasksList() {
      return this.$store.getters["todos/getTodos"];
    },
    formatedDate() {
      return dateFormated(this.date.value);
    },
    addTaskUrl() {
      return `/tasks/add?date=${this.date.value.getTime()}`;
    },
    inputDateFormat() {
      return dateFormated(this.date.value, true);
    },
  },
  watch: {
    "date.value": function() {
      this.fetchTodos();
    },
    $route(newValue) {
      if (newValue.fullPath !== "/tasks") {
        this.date.isDisabled = true;
      } else {
        this.date.isDisabled = false;
      }
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
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
  align-items: center;
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

@media screen and (min-width: 768px) {
  .header__actions {
    flex-direction: row;
  }

  .header__actions > *:not(:last-child) {
    margin-bottom: 0;
    margin-right: 16px;
  }

  .tasks__menu {
    margin-top: 24px;
  }
}
</style>
