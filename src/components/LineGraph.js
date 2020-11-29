import { colors } from "@material-ui/core";
import Chart from "react-apexcharts";

const LineGraph = (props) => {
  const { pandemic, days } = props;

  const susceptible = pandemic.pandemic.seriesSusceptibleByDay();
  const deaths = pandemic.pandemic.seriesDeathsByDay();
  const cases = pandemic.pandemic.seriesCasesByDay();
  const recovered = pandemic.pandemic.seriesRecoveredByDay();

  const series = [
    {
      name: "Susceptible",
      data: susceptible.slice(0, days),
    },
    {
      name: "Deaths",
      data: deaths.slice(0, days),
    },
    {
      name: "Cases",
      data: cases.slice(0, days),
    },
    {
      name: "Recovered",
      data: recovered.slice(0, days),
    },
  ];

  const options = {
    colors: [
      colors.blue[400],
      colors.grey[900],
      colors.red[400],
      colors.green[400],
    ],
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
        easing: "easeinout",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: { type: "numeric", formatter: (value) => Math.round(value) },
  };

  const height = (window.innerHeight - 128) / 2;
  const width = window.innerWidth / 3;

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
