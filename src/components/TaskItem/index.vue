<template>
  <base-card>
    <li class="task">
      <span class="task__checked" v-if="checked">
        <font-awesome-icon icon="check" />
      </span>
      <div class="task__details" :class="{ 'task__details--time': hasTime }">
        <p class="task__description">{{ description }}</p>
        <div class="task__actions" v-if="!checked">
          <base-button mode="primary" @click="checkHandler">Check</base-button>
          <base-button :isLink="true" :path="editPath" mode="secondary"
            >Edit</base-button
          >
          <base-button @click="deleteTask" mode="danger">Delete</base-button>
        </div>
      </div>
      <span v-if="time" class="task__time">{{ time }}</span>
    </li>
  </base-card>
</template>

<script>
export default {
  props: ["time", "description", "id", "date", "checked", "taskDate"],
  inject: ["errorHandler"],
  computed: {
    hasTime() {
      return !!this.time;
    },
    editPath() {
      return `/tasks/edit/${this.id}?date=${new Date(this.date).getTime()}`;
    },
  },
  methods: {
    async deleteTask() {
      try {
        await this.$store.dispatch("todos/deleteTask", this.id);
      } catch (e) {
        this.errorHandler(e, {
          redirect: {
            name: "Authentication",
            query: { redirect: this.$route.path },
          },
        });
      }
    },
    async checkHandler() {
      try {
        await this.$store.dispatch("todos/storeUpdateTask", {
          formData: { checked: true, date: this.taskDate },
          isEditing: true,
          taskId: this.id,
          atualDate: new Date(this.date).getTime(),
        });
      } catch (e) {
        this.errorHandler(e, {
          redirect: {
            name: "Authentication",
            query: { redirect: this.$route.path },
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.task {
  display: flex;
  padding: 16px;
  align-items: center;
}

.task__checked {
  padding-right: 16px;
  color: var(--secondary);
  display: flex;
}

.task__time {
  padding-left: 16px;
}

.task__details {
  width: 100%;
}

.task__details--time {
  padding-right: 16px;
  border-right: 1px solid var(--secondary);
}

.task__actions {
  margin-top: 8px;
}

.task__actions > *:not(:last-child) {
  margin-right: 8px;
}

@media screen and (min-width: 768px) {
  .task {
    padding: 16px 24px;
  }

  .task__actions {
    margin-top: 16px;
  }
}
</style>
