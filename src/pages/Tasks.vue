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
import TaskItem from "../components/TaskItem";
import Dates from "../helpers/Dates";

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
        value: new Dates(),
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
      this.date.value.setDate(target.value);
      console.log(this.date.value.date);
    },
  },
  computed: {
    tasksList() {
      return this.$store.getters["todos/getTodos"];
    },
    formatedDate() {
      return this.date.value.getDateFormated();
    },
    addTaskUrl() {
      return `/tasks/add?date=${this.date.value.getTimestampsWithoutTime()}`;
    },
    inputDateFormat() {
      return this.date.value.getInputDateFormat();
    },
    hasTasks() {
      return this.$store.getters["todos/hasTasks"](
        this.date.value.getTimestampsWithoutTime()
      );
    },
  },
  watch: {
    "date.value.date": function() {
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
  flex-direction: column;
  padding: 16px;
}

.section > *:not(:last-child) {
  margin-bottom: 16px;
}

.spinner {
  display: flex;
  justify-content: center;
}

.header__actions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.tasks__empty {
  text-align: center;
}

.tasks__menu > *:not(:last-child) {
  margin-bottom: 1rem;
}

@media screen and (min-width: 576px) {
  .tasks__header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .header__actions {
    flex-direction: row;
    width: unset;
    margin-top: 0;
  }
}

@media screen and (min-width: 768px) {
  .header__actions > *:not(:last-child) {
    margin-bottom: 0;
    margin-right: 16px;
  }

  .section > *:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
