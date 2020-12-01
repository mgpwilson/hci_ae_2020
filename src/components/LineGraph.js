import { colors } from "@material-ui/core";
import Chart from "react-apexcharts";

// Using ApexCharts
const LineGraph = (props) => {
  const { pandemic, days } = props;

  const N = 5463000; // Population
  const hospitalBedCapacity = new Array(days).fill(20553 / 0.075);

  const series = [
    {
      name: "Susceptible",
      data: pandemic.map((x) => Math.round(x[0] * N)).slice(0, days),
    },

    {
      name: "Infected",
      data: pandemic.map((x) => Math.round(x[1] * N)).slice(0, days),
    },
    {
      name: "Recovered",
      data: pandemic.map((x) => Math.round(x[2] * N)).slice(0, days),
    },

    {
      name: "Deaths",
      data: pandemic.map((x) => Math.round(x[3] * N * 0.1)).slice(0, days),
    },
    {
      name: "NHS Scotland Max Capacity (Infections/Day)",
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
      width: [4, 4, 4, 4, 2],
      dashArray: [0, 0, 0, 0, 8],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "numeric",
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-label',
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: (value) => { return "day " + Math.round(value) },
      },
    },
    yaxis: {
      max: 5500000,
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-yaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: (value) => { return (value.toPrecision(2) / 1000000) + " million" },
      },
    },
    tooltip: {
      fixed: {
        enabled: true,
        position: 'topRight',
        offsetX: 350,
        offsetY: 50,
      }
    }
  };

  const height = (window.innerHeight - 128) / 2 - 20;
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
