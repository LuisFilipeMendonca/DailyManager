<template>
  <div class="chart__container">
    <base-card>
      <canvas :id="id" class="chart"></canvas>
      <p class="chart__msg" v-if="noValue">{{ errorMsg }}</p>
    </base-card>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: ["id", "data", "noValue", "errorMsg"],
  watch: {
    data() {
      this.createChart();
    },
  },
  methods: {
    createChart() {
      const ctx = document.getElementById(this.id);
      new Chart(ctx, this.data);
    },
  },
  mounted() {
    this.createChart();
  },
};
</script>

<style scoped>
.chart__container {
  position: relative;
}

.chart {
  border-radius: 3px;
  height: 200px;
}

.chart__msg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--bg);
  padding: 16px;
  border: 2px solid var(--secondary);
  border-radius: 3px;
  color: var(--secondary);
  width: 60%;
  text-align: center;
}
</style>
