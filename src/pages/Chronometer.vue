<template>
  <section class="chronometer">
    <base-card>
      <div class="chronometer__container">
        <span class="chronometer__time">{{ formatChronometer }}</span>
        <div class="chronometer__actions">
          <button @click="startChronometer">Start</button>
          <button @click="pauseChronometer">Pause</button>
          <button @click="stopChronometer">Stop</button>
        </div>
      </div>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      secs: 0,
      timer: null,
      status: "pause",
    };
  },
  methods: {
    startChronometer() {
      this.timer = setInterval(() => {
        this.secs++;
      }, 1000);
    },
    pauseChronometer() {
      clearInterval(this.timer);
    },
    stopChronometer() {
      clearInterval(this.timer);
      this.secs = 0;
    },
    addZero(val) {
      return val > 9 ? val : `0${val}`;
    },
  },
  computed: {
    formatChronometer() {
      const hours = Math.floor(this.secs / 3600);
      const mins = Math.floor((this.secs - hours * 3600) / 60);
      const secs = Math.floor(this.secs - hours * 3600 - mins * 60);

      return `${this.addZero(hours)}:${this.addZero(mins)}:${this.addZero(
        secs
      )}`;
    },
  },
};
</script>

<style scoped>
.chronometer {
  padding: 24px 0;
}

.chronometer__container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chronometer__time {
  font-size: 3rem;
  margin-bottom: 16px;
}

.chronometer__actions > *:not(:last-child) {
  margin-right: 16px;
}
</style>
