<template>
  <base-card>
    <li
      class="chronometer__item"
      :class="{ 'chronometer__item--selected': isSelected }"
    >
      <h2>{{ time }}</h2>
      <h3 v-if="description">{{ description }}</h3>
      <div class="chronometer__actions">
        <button @click="selectChronometerHandler">Select</button>
        <button @click="deleteChronometerHandler">Delete</button>
      </div>
    </li>
  </base-card>
</template>

<script>
export default {
  props: ["id", "description", "time", "selectedId"],
  emits: ["selectChronometer"],
  methods: {
    selectChronometerHandler() {
      this.$emit("selectChronometer", this.id);
    },
    deleteChronometerHandler() {
      this.$store.dispatch("chronometers/deleteChronometer", this.id);
    },
  },
  computed: {
    isSelected() {
      return this.id === this.selectedId;
    },
  },
};
</script>

<style scoped>
.chronometer__item {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chronometer__item--selected {
  background-color: var(--bg);
  border-radius: 3px;
}

.chronometer__item > *:not(:last-child) {
  margin-bottom: 8px;
}
</style>
