import Chart from "react-apexcharts";
import {colors} from "@material-ui/core";

const BarChart = (props) => {
  const { pandemic1, pandemic2, days, chartTitle } = props;

  console.log(pandemic1.getInfectedAtDay(days));
  console.log(pandemic2.getInfectedAtDay(days));

  const yMax = Math.max(pandemic1.getTotalInfections(days), pandemic2.getTotalInfections(days));

  const series = [
    {
      name: "Infected",
      data: [pandemic1.getTotalInfections(days), pandemic2.getTotalInfections(days)],
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
      forceNiceScale: true,
      max: yMax,
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
        formatter: (value) => { return (value.toPrecision(3) / 1000000) + "million" },
      },
      showAlways: false,
    },
    yaxis: {
      max: yMax,
      showAlways: false,
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
