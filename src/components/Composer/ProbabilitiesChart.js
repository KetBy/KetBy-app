import React from "react";
import ReactECharts from "echarts-for-react";
import theme from "../../themes/default";

export default function ProbabilitiesChart({ probabilities }) {
  const option = {
    xAxis: {
      type: "category",
      data: probabilities.map((item) => item.value),
      interval: 0,
      axisLabel: {
        interval: 0,
        rotate:
          probabilities.length > 8 ? (probabilities.length > 16 ? 90 : 60) : 0,
      },
      name: "Outcome",
    },
    yAxis: {
      type: "value",
      name: "Probability",
      min: 0,
      max: 100,
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
          color: "rgba(72, 74, 91, 0.05)",
        },
        color: theme.palette.primary.main,
        barMaxWidth: 12,
      },
    ],
    grid: {
      top: theme.spacing(1),
      bottom: theme.spacing(0),
      left: theme.spacing(1),
      right: theme.spacing(1),
      containLabel: true,
    },
  };

  return <ReactECharts option={option} style={{ height: "100%" }} />;
}
