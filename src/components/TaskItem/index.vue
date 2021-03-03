<template>
  <base-card>
    <li class="task">
      <div class="task__details" :class="{ 'task__details--time': hasTime }">
        <p class="task__description">{{ description }}</p>
        <div class="task__actions">
          <base-button mode="flatten">Check</base-button>
          <base-button mode="flatten">Edit</base-button>
          <base-button mode="flatten">Delete</base-button>
        </div>
      </div>
      <span v-if="time" class="task__time">{{ time }}</span>
    </li>
  </base-card>
</template>

<script>
export default {
  props: ["time", "description"],
  computed: {
    hasTime() {
      return !!this.time;
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

.task__description {
  margin-bottom: 8px;
}

.task__actions > *:not(:last-child) {
  margin-right: 8px;
}
</style>
