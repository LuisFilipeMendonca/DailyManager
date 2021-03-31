<template>
  <router-view></router-view>
  <section class="section">
    <base-card>
      <header class="tasks__header">
        <h1 class="header__title">{{ formatedDate }}</h1>
        <div class="header__actions">
          <base-button :isLink="true" :path="addTaskUrl" mode="primary"
            >Add Task</base-button
          >
          <base-input
            id="filter"
            :type="date.type"
            :value="inputDateFormat"
            classValue="mb-none"
            :noLabel="true"
            :disabled="date.isDisabled"
            :isValid="true"
            @change-handler="changeHandler"
          />
        </div>
      </header>
    </base-card>
    <div class="spinner" v-if="isLoading">
      <base-spinner />
    </div>
    <p class="tasks__empty" v-else-if="!isLoading && !hasTasks">
      You have no tasks for today.
    </p>
    <ul class="tasks__menu" v-else>
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
  inject: ["errorHandler"],
  data() {
    return {
      isLoading: false,
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
      this.isLoading = true;
      try {
        await this.$store.dispatch("todos/getTodos", this.date.value);
      } catch (e) {
        this.errorHandler(e, {
          redirect: {
            name: "Authentication",
            query: { redirect: this.$route.path },
          },
        });
      }
      this.isLoading = false;
    },
    changeHandler(target) {
      if (target.value.length <= 0) return;
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
    hasTasks() {
      return this.$store.getters["todos/hasTasks"](this.date.value);
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
    if (this.hasTasks) return;
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

.section > *:not(:last-child) {
  margin-bottom: 16px;
}

.spinner {
  display: flex;
  justify-content: center;
}

.header__title {
  flex: 1;
}

.header__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header__actions > *:not(:last-child) {
  margin-bottom: 8px;
}

.tasks__empty {
  text-align: center;
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

  .section > *:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
