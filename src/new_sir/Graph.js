import { colors } from "@material-ui/core";
import Chart from "react-apexcharts";

// Using ApexCharts
const Graph = (props) => {
  const { pandemic, days } = props;

  const N = 5424000; // Population

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
      name: "Recovered",
      data: pandemic.map((x) => Math.round(x[2] * N)).slice(0, days),
    },
    // {
    //   name: "Deaths",
    //   data: pandemic.map((x) => Math.round(x[2] * N * 0.1)).slice(0, days),
    // },
  ];

  const options = {
    chart: {
      height: 350,
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
    colors: [colors.blue[400], colors.red[400], colors.green[400]],
    dataLabels: {
      enabled: false,
    },
    xaxis: { type: "numeric", formatter: (value) => Math.round(value) },
    yaxis: { max: 5500000 },
    title: { text: "Model 1" },
  };

  // const height = (window.innerHeight - 128) / 2;
  // const width = window.innerWidth / 3;

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      // height={height}
      // width={width}
    />
  );
};

export default Graph;
