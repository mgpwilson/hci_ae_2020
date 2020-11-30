import { colors } from "@material-ui/core";
import Chart from "react-apexcharts";

// Using ApexCharts
const LineGraph = (props) => {
  const { pandemic, days } = props;

  const N = 5463000; // Population
  const hospitalBedCapacity = new Array(days).fill(20553);

  const series = [
    {
      name: "Susceptible",
      data: pandemic.map((x) => Math.round(x[0] * N)).slice(0, days),
    },

    {
      name: "Cases",
      data: pandemic.map((x) => Math.round(x[1] * N)).slice(0, days),
    },
    {
      name: "Infected",
      data: pandemic.map((x) => Math.round(x[2] * N)).slice(0, days),
    },

    {
      name: "Deaths",
      data: pandemic.map((x) => Math.round(x[3] * N * 0.1)).slice(0, days),
    },
    {
      name: "Hospital Bed Capacity",
      data: hospitalBedCapacity,
    },
  ];

  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      animations: {
        easing: "easeout",
      },
    },
    colors: [
      colors.blue[400],
      colors.red[400],
      colors.green[400],
      colors.grey[900],
      colors.purple[400],
    ],
    stroke: {
      width: [5, 5, 5, 5, 2],
      dashArray: [0, 0, 0, 0, 8],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: { type: "numeric", formatter: (value) => Math.round(value) },
    yaxis: { max: 5500000 },
  };

  const height = (window.innerHeight - 128) / 2 - 10;
  const width = (window.innerWidth * 3.5) / 12;

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={height}
      width={width}
    />
  );
};

export default LineGraph;
