import React, { useRef, useEffect } from "react";
import "../index.css";
import RawDataTable from "./RawData";
import { Chart } from "chart.js";
import Missing from "../media/missinglogo.png";
import Drop from "../media/droplogo.png";

const PredictionResult = ({
  selectedStock,
  predictionData,
  error,
  rawData,
}) => {
  const chartRef = useRef(null);
  const svrChartRef = useRef(null);
  const lassoChartRef = useRef(null);
  const graphChartRef = useRef(null);
  const comparisonChartRef = useRef(null);
  const scatterChartRef = useRef(null);

  useEffect(() => {
    if (predictionData) {
      const scatterCtx = scatterChartRef.current.getContext("2d");
      if (scatterChartRef.current.chart) {
        scatterChartRef.current.chart.destroy(); // Destroy existing chart instance
      }
      // Filter close and high values between 100 and 200
      const filteredData = predictionData.closeValues
        .map((close, index) => ({
          x: predictionData.highValues[index],
          y: close,
        }))
        .filter(({ x, y }) => x >= 1 && x <= 200 && y >= 1 && y <= 200);

      const colors = filteredData.map(({ x, y }) => {
        // Determine color based on close and high values
        const closeColor = y > x ? "red" : "green";
        return closeColor;
      });

      scatterChartRef.current.chart = new Chart(scatterCtx, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "Data Points",
              data: filteredData,
              backgroundColor: colors,
              pointRadius: 5,
            },
            {
              type: "line",
              label: ` ${predictionData.correlation}`,
              data: [
                { x: predictionData.minHigh, y: predictionData.minClose },
                { x: predictionData.maxHigh, y: predictionData.maxClose },
              ],
              backgroundColor: "rgba(255, 99, 132, 0)", // Transparent background
              borderColor: "#FF0000", // Red color for regression line
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "High Values",
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Close Values",
                },
              },
            ],
          },
        },
      });

      const ctx = chartRef.current.getContext("2d");
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy(); // Destroy existing chart instance
      }
      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Total Data", "Training Data", "Testing Data"],
          datasets: [
            {
              label: "Data Splitting",
              data: [
                predictionData.totalData,
                predictionData.trainData,
                predictionData.testData,
              ],
              backgroundColor: ["#ffcc00", "#00cc66", "#00bfff"], // Adjust colors as needed
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
      if (svrChartRef.current.chart) {
        svrChartRef.current.chart.destroy();
      }
      const svrCtx = svrChartRef.current.getContext("2d");
      new Chart(svrCtx, {
        type: "pie",
        data: {
          labels: Object.keys(predictionData.svr_metrics),
          datasets: [
            {
              label: "SVR Metrics",
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#66FF66",
                "#6666FF",
                "#FF66FF",
                "#FFFF66",
              ],
              data: Object.values(predictionData.svr_metrics),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      if (lassoChartRef.current.chart) {
        lassoChartRef.current.chart.destroy();
      }
      // Generate Lasso metrics pie chart
      const lassoCtx = lassoChartRef.current.getContext("2d");
      new Chart(lassoCtx, {
        type: "pie",
        data: {
          labels: Object.keys(predictionData.lasso_metrics),
          datasets: [
            {
              label: "Lasso Metrics",
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#66FF66",
                "#6666FF",
                "#FF66FF",
                "#FFFF66",
              ],
              data: Object.values(predictionData.lasso_metrics),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      const graphCtx = graphChartRef.current.getContext("2d");
      if (graphChartRef.current.chart) {
        graphChartRef.current.chart.destroy();
      }
      const graphChart = new Chart(graphCtx, {
        type: "line",
        data: {
          labels: predictionData.predictions.map(
            (prediction) => prediction.date
          ),
          datasets: [
            {
              label: "Closed Price",
              data: predictionData.predictions.map((prediction) =>
                parseFloat(prediction.price.toFixed(2))
              ),
              borderColor: "#9a5e72",
              borderWidth: 2,
              fill: false,
              tension: 0.4,
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "day",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
      graphChartRef.current.chart = graphChart;
      const comparisonCtx = comparisonChartRef.current.getContext("2d");
      new Chart(comparisonCtx, {
        type: "bar",
        data: {
          labels: ["SVR", "Lasso Regression"],
          datasets: [
            {
              label: "Performance",
              data: [
                predictionData.svr_metrics.mae,
                predictionData.lasso_metrics.mae,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    }
  }, [predictionData]);
  return (
    <div className="prediction-result">
      {predictionData && (
        <div className="margindena">
          <h1 className="prediction-heading">{selectedStock} Prediction</h1>
          <div className="data-analysis">
            {rawData && <RawDataTable rawData={rawData} />}
            <div className="data-preprocessing" style={{ marginTop: "6px" }}>
              <h4 className="heading">Data Preprocessing</h4>
              <div className="missing-values">
                <h6 className="sub-heading">Missing Values Count</h6>
                <div className="missing-values-logo">
                  <img
                    src={Missing}
                    alt="Missing Values Logo"
                    style={{ height: "80px", width: "80px", margin: "10px" }}
                  />
                </div>
                <div className="missing-values-table">
                  <p>Date: 0</p>
                  <p>Open: 0</p>
                  <p>High: 0</p>
                  <p>Low: 0</p>
                  <p>Close: 0</p>
                </div>
              </div>
              <div className="dropped-columns">
                <h6 className="sub-heading">Dropped Columns</h6>
                <div className="dropped-columns-logo">
                  <img
                    src={Drop}
                    alt="Dropped Columns Logo"
                    style={{ height: "80px", width: "80px", margin: "10px" }}
                  />
                </div>
                <div className="dropped-columns-table">
                  <p>Volume</p>
                  <p>Adj Close</p>
                </div>
              </div>
            </div>
            <div className="correlation">
              <h6 className="heading">Feature Selection</h6>
              <div
                className="correlation-value"
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <p>{predictionData?.correlation}</p> */}
                <div
                  style={{
                    width: "80.5vw",
                    height: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1 className="heading">Scatter Plot</h1>
                  <canvas ref={scatterChartRef} />
                </div>
              </div>
            </div>
            <div className="chart-container" style={{ width: "87.5vw" }}>
              <div className="data-splitting-section">
                <h1 className="heading">Data Splitting</h1>
                <canvas ref={chartRef} />
              </div>
            </div>
            <div
              className="chart-metircs"
              style={{
                width: "87.5vw",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className="metrics-section"
                style={{ width: "43.5vw", height: "49.5vh" }}
              >
                <h6 className="heading">SVR Metrics </h6>
                <canvas ref={svrChartRef} />
              </div>
              <div
                className="metrics-section"
                style={{ width: "43.5vw", height: "49.5vh" }}
              >
                <h6 className="heading">Lasso Metrics </h6>
                <canvas ref={lassoChartRef} />
              </div>
            </div>
            <div className="chart-container" style={{ width: "87.5vw" }}>
              <h6 className="heading">Predictions</h6>
              <ul className="predictions-list">
                {predictionData.predictions.map((prediction, index) => (
                  <li key={index} className="prediction-item">
                    <div className="prediction-info">
                      <span>Date: {prediction.date}</span>
                      <span style={{ color: "#9a5e72" }}>
                        Closed Price: {prediction.price.toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="chart-container"
              style={{ width: "87.5vw", height: "83vh" }}
            >
              <div
                style={{
                  width: "80vw",
                  height: "70vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h6 className="heading">Graph Chart</h6>
                <canvas ref={graphChartRef} />
              </div>
            </div>
            <div
              className="chart-container"
              style={{ width: "87.5vw", height: "83vh" }}
            >
              <h6 className="heading">Comparison Graph -- Error Values</h6>
              <div
                style={{
                  width: "80vw",
                  height: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <canvas ref={comparisonChartRef} />
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PredictionResult;
