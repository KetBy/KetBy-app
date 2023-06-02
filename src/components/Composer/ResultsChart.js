import React from "react";
import ReactECharts from "echarts-for-react";
import theme from "../../themes/default";

export default function ResultsChart({ results, shots }) {
  const option = {
    xAxis: {
      type: "value",
      name: "Counts",
      min: 1,
      max: shots,
      nameLocation: "middle",
      nameGap: 25,
    },
    yAxis: {
      type: "category",
      data: results
        .map((item) => ({
          value: item.outcome,
          sortIndex: item.sortIndex,
        }))
        .reverse(),
      interval: 0,
      axisLabel: {
        interval: 0,
      },
      name: "",
      nameLocation: "middle",
      //nameGap: 45,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        let tooltipText = `<b>Outcome ${params[0].name}</b> <br />`;
        tooltipText += `Counts <b>${params[0].value}</b>/${shots} (${(
          (params[0].value / shots) *
          100
        ).toFixed(2)}%)`;
        return tooltipText;
      },
      extraCssText: `
        box-shadow: ${theme.shadowsCustom[2]};
        border-radius: ${theme.shape.borderRadius};
      `,
    },
    series: [
      {
        name: "Counts",
        data: results.map((item) => item.counts),
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
      left: theme.spacing(1),
      right: theme.spacing(2.5),
      containLabel: true,
    },
  };

  return (
    <ReactECharts
      option={option}
      style={{
        height: "100%",
        minHeight: `${Math.max(results.length * 20, 125)}px`,
      }}
    />
  );
}
