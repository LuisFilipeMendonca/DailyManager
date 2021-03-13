<template>
  <div class="chart-container" v-if="data">
    <base-card>
      <canvas :id="id" class="chart"></canvas>
    </base-card>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: ["id", "data"],
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
.chart-container {
  position: relative;
}

.chart {
  border-radius: 3px;
}
</style>
