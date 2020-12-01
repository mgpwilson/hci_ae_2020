import Chart from "react-apexcharts";
import {colors} from "@material-ui/core";

const BarChart = (props) => {
  const { pandemic1, pandemic2, days, chartTitle } = props;

  console.log(pandemic1.getInfectedAtDay(days));
  console.log(pandemic2.getInfectedAtDay(days));

  const yMax = Math.max(pandemic1.getRecoveredAtDay(days), pandemic2.getRecoveredAtDay(days),
      pandemic1.getDeathsAtDay(days), pandemic2.getDeathsAtDay(days));

  const series = [
    {
      name: "Infections",
      data: [pandemic1.getRecoveredAtDay(days), pandemic2.getRecoveredAtDay(days)],
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
      min: 0,
      forceNiceScale: true,
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
        formatter: (value) => { return (value / 1000000).toPrecision(2) + "million" },
      },
    },
    yaxis: {
      min: 0,
      max: yMax,
    },
    colors: [
      colors.red[400],
      colors.grey[900],
    ],
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter: (value) => { return (value / 1000000).toPrecision(4) + "million" }
      }
    }
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
