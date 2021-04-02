export const dataset = {
  label: "",
  data: [],
  borderColor: "#fbe384",
  borderWidth: 2,
};

export const chartData = {
  type: "",
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {},
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            fontColor: "#eee",
          },
          gridLines: {
            zeroLineColor: "#eee",
            color: "rgba(238,238,238,0.2)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            zeroLineColor: "#eee",
            color: "transparent",
          },
          ticks: {
            fontColor: "#eee",
          },
        },
      ],
    },
  },
};
