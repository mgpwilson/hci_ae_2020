import Chart from "react-apexcharts";
import {colors} from "@material-ui/core";

const BarChart = (props) => {
  const { pandemic1, pandemic2, days, chartTitle } = props;

  const series = [
    {
      name: "Infections",
      data: [pandemic1.getRecoveredAtDay(days), pandemic2.getRecoveredAtDay(days)],
    },
      //TODO why is deaths larger than line graph by factor of 10??
    {
      name: "Dead",
      data: [pandemic1.getDeathsAtDay(days)/10, pandemic2.getDeathsAtDay(days)/10],
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
    },
    colors: [
      colors.red[400],
      colors.grey[900],
    ],
    tooltip: {
      x: {
        show: true,
      },
      y: {
        show: true,
        formatter: (value) => { return (value / 1000000).toPrecision(3) + "million" }
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
