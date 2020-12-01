import Chart from "react-apexcharts";
import {colors} from "@material-ui/core";

const BarChart = (props) => {
  const { pandemic1, pandemic2, days, chartTitle } = props;

  console.log(pandemic1.getInfectedAtDay(days));
  console.log(pandemic2.getInfectedAtDay(days));

  const series = [
    {
      name: "Infected",
      data: [pandemic1.getInfectedAtDay(days), pandemic2.getInfectedAtDay(days)],
    },
    {
      name: "Dead",
      data: [pandemic1.getDeathsAtDay(days), pandemic2.getDeathsAtDay(days)],
    },
  ];

  const options = {
    chart: {
      toolbar: { show: false },
      animations: {
        easing: "easeout",
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ["Model 1", "Model 2"],
      style: {
        fontFamily: "Roboto",
        fontWeight: "normal",
      },
    },
    yaxis: {
      max: 2000000,
    },
    colors: [
      colors.red[400],
      colors.grey[900],
    ],
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={window.innerHeight / 2}
      width={window.innerWidth / 3 - 80}
    />
  );
};

export default BarChart;
