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
      nameLocation: "middle",
      nameGap:
        probabilities.length >= 16
          ? probabilities.length >= 32
            ? 45
            : 35
          : 25,
    },
    yAxis: {
      type: "value",
      name: "Probability",
      min: 0,
      max: 100,
      nameLocation: "middle",
      nameRotate: 90,
      nameGap: 35,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let tooltipText = `<b>State ${params[0].name}</b> <br />`;
        tooltipText += `Probability <b>${params[0].data}%</b>`;
        return tooltipText;
      },
      extraCssText: `
        box-shadow: ${theme.shadowsCustom[2]};
        border-radius: ${theme.shape.borderRadius};
      `,
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
      bottom: theme.spacing(2.5),
      left: theme.spacing(4),
      right: theme.spacing(1),
      containLabel: true,
    },
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", minHeight: "125px" }}
    />
  );
}
