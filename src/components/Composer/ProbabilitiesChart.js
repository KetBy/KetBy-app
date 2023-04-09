import React from "react";
import ReactECharts from "echarts-for-react";
import theme from "../../themes/default";

export default function ProbabilitiesChart({ probabilities }) {
  console.log(probabilities);
  const option = {
    xAxis: {
      type: "category",
      data: probabilities.map((item) => item.value),
      interval: 0,
      axisLabel: {
        interval: 0,
        rotate: probabilities.length > 8 ? 60 : 0,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1,
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Outcome probability",
        data: probabilities.map((item) => item.probability),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        color: theme.palette.primary.main,
      },
    ],
    grid: {
      top: theme.spacing(1),
      bottom: theme.spacing(0),
      left: theme.spacing(1),
      right: theme.spacing(2),
      containLabel: true,
    },
  };
  console.log(option);

  return <ReactECharts option={option} style={{ height: "100%" }} />;
}
