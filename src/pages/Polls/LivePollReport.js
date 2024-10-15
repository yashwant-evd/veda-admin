import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
const PieChart = ({ labelsReportArray, valuesReportArray }) => {

  const chartOptions = {
    series: valuesReportArray && valuesReportArray,
    options: {
      chart: {
        width: 550,
        type: "pie",
      },
      labels: labelsReportArray && labelsReportArray,
      legend: {
        position: "bottom",
      },
    },
  };

  const allZeroes = valuesReportArray?.every((element) => element === 0);

  return (
    <div className="pie-chart">
      {!allZeroes ? (
        <Chart
          options={chartOptions?.options}
          series={chartOptions?.series}
          type={chartOptions?.options?.chart?.type}
          width={chartOptions?.options?.chart?.width}
        />
      ) : (
        <p style={{ position: "absolute", top: "296px", right: "260px" }}>
          There are no records to display
        </p>
      )}
    </div>
  );
};

export default PieChart;
