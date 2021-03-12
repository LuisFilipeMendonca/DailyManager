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
    responsive: true,
    lineTension: 1,
    tooltips: {},
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "#eee",
          },
          gridLines: {
            zeroLineColor: "#eee",
            color: "#eee",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            zeroLineColor: "#eee",
            color: "#eee",
          },
          ticks: {
            fontColor: "#eee",
          },
        },
      ],
    },
  },
};
