import React from "react";
import ReactECharts from "echarts-for-react";
import theme from "../../themes/default";
import { getPhaseColor } from "../../utils/auxiliary";

export default function StatevectorChart({ statevector }) {
  const option = {
    xAxis: {
      type: "category",
      data: statevector.amplitudes.map((item) => item.base),
      interval: 0,
      axisLabel: {
        interval: 0,
        rotate:
          statevector.amplitudes.length > 8
            ? statevector.amplitudes.length > 16
              ? 90
              : 60
            : 0,
      },
      name: "Computational basis state",
      nameLocation: "middle",
      nameGap:
        statevector.amplitudes.length >= 16
          ? statevector.amplitudes.length >= 32
            ? 45
            : 35
          : 25,
    },
    yAxis: {
      type: "value",
      name: "Amplitude",
      min: 0,
      max: 1,
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
        tooltipText += `Amplitude <b>${params[0].value}</b> <br />`;
        tooltipText += `Phase <b>${
          statevector.phases_str[params[0].dataIndex]
        }</b> (${
          Math.round(
            ((statevector.phases[params[0].dataIndex] * 180) / Math.PI) * 100
          ) / 100
        }°)`;
        return tooltipText;
      },
      extraCssText: `
        box-shadow: ${theme.shadowsCustom[2]};
        border-radius: ${theme.shape.borderRadius};
      `,
    },
    series: [
      {
        name: "Amplitude",
        data: statevector.amplitudes.map((item) => item.amplitude),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(72, 74, 91, 0.05)",
        },
        color: theme.palette.primary.main,
        barMaxWidth: 12,
        itemStyle: {
          color: function (params) {
            return getPhaseColor(statevector.phases[params.dataIndex]);
          },
        },
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
