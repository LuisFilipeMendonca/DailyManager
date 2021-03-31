<template>
  <base-card>
    <li
      class="chronometer__item"
      :class="{ 'chronometer__item--selected': isSelected }"
    >
      <h2>{{ time }}</h2>
      <h3 v-if="description">{{ description }}</h3>
      <div class="chronometer__actions">
        <base-button
          type="button"
          :clickHandler="selectChronometerHandler"
          mode="primary"
          >Select</base-button
        >
        <base-button
          type="button"
          :clickHandler="deleteChronometerHandler"
          mode="danger"
          >Delete</base-button
        >
      </div>
    </li>
  </base-card>
</template>

<script>
export default {
  props: ["id", "description", "time", "selectedId"],
  emits: ["select-chronometer", "stop-chronometer"],
  inject: ["errorHandler"],
  methods: {
    selectChronometerHandler() {
      this.$emit("select-chronometer", this.id);
    },
    deleteChronometerHandler() {
      this.$emit("stop-chronometer");
      try {
        this.$store.dispatch("chronometers/deleteChronometer", this.id);
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

.chronometer__actions > *:not(:last-child) {
  margin-right: 8px;
}
</style>
