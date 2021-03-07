<template>
  <base-card>
    <li class="chronometer__item">
      <h2 v-if="description">{{ description }}</h2>
      <h3>{{ time }}</h3>
      <button @click="selectChronometerHandler">Select</button>
      <button @click="deleteChronometerHandler">Delete</button>
    </li>
  </base-card>
</template>

<script>
export default {
  props: ["id", "description", "time"],
  emits: ["selectChronometer"],
  methods: {
    selectChronometerHandler() {
      this.$emit("selectChronometer", this.id);
    },
    deleteChronometerHandler() {
      this.$store.dispatch("chronometers/deleteChronometer", this.id);
    },
  },
};
</script>

<style scoped>
.chronometer__item {
  padding: 16px;
}

.chronometer__item > *:not(:last-child) {
  margin-bottom: 8px;
}
</style>
