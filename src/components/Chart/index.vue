<template>
  <canvas :id="id"></canvas>
</template>

<script>
import Chart from "chart.js";

export default {
  props: ["id", "data"],
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
