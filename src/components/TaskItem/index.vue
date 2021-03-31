<template>
  <base-card>
    <li class="task">
      <span class="task__checked" v-if="checked">
        <font-awesome-icon icon="check" />
      </span>
      <div class="task__details" :class="{ 'task__details--time': hasTime }">
        <p class="task__description">{{ description }}</p>
        <div class="task__actions" v-if="!checked">
          <base-button mode="flatten" @click="checkHandler">Check</base-button>
          <base-button :isLink="true" :path="editPath" mode="flatten"
            >Edit</base-button
          >
          <base-button @click="deleteTask" mode="flatten">Delete</base-button>
        </div>
      </div>
      <span v-if="time" class="task__time">{{ time }}</span>
    </li>
  </base-card>
</template>

<script>
export default {
  props: ["time", "description", "id", "date", "checked", "taskDate"],
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
        if (e.status === 401) {
          this.$store.commit("auth/logout");
          this.$router.push({
            name: "Authentication",
            query: { redirect: this.$route.path },
          });
        }
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
        if (e.status === 401) {
          this.$store.commit("auth/logout");
          this.$router.push({
            name: "Authentication",
            query: { redirect: this.$route.path },
          });
        }
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
</style>
