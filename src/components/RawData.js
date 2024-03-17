import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import { Chart } from "chart.js/auto";

const RawDataTable = ({ rawData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Slice the rawData to get 5 rows from each year starting from 2015
  const slicedData = rawData.reduce((acc, current) => {
    const year = new Date(current.Date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    if (acc[year].length < 2) {
      // Format the date without the time
      const formattedDate = new Date(current.Date).toLocaleDateString(
        undefined,
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }
      );
      // Round the numerical values to 2 decimal places
      const roundedData = {
        ...current,
        Date: formattedDate,
        High: current.High.toFixed(2),
        Low: current.Low.toFixed(2),
        Open: current.Open.toFixed(2),
        Close: current.Close.toFixed(2),
        "Adj Close": current["Adj Close"].toFixed(2),
      };
      acc[year].push(roundedData);
    }
    return acc;
  }, {});

  // Flatten the slicedData object into an array of rows
  const flattenedData = Object.values(slicedData).flat();

  // Define the desired column order
  const columnOrder = [
    "Date",
    "High",
    "Low",
    "Open",
    "Close",
    "Adj Close",
    "Volume",
  ];
  const presentDayData = rawData[rawData.length - 1];
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (chartInstanceRef.current !== null) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Calculate start and end index based on slider value
      const startIndex = Math.max(0, sliderValue - 5);
      const endIndex = Math.min(rawData.length - 1, sliderValue + 5);

      // Get the data within the range
      const slicedData = rawData.slice(startIndex, endIndex + 1);

      const labels = slicedData.map((item) =>
        new Date(item.Date).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })
      );
      const highData = slicedData.map((item) => item.High.toFixed(2));
      const lowData = slicedData.map((item) => item.Low.toFixed(2));

      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "High",
              data: highData,
              borderColor: "rgba(6, 79, 240, 1)",
              borderWidth: 1,
              fill: false,
              tension: 0.4,
            },
            {
              label: "Low",
              data: lowData,
              borderColor: "rgba(255, 0, 0, 1)",
              borderWidth: 1,
              fill: false,
              tension: 0.4,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Price",
              },
            },
          },
        },
      });

      chartInstanceRef.current = newChartInstance;
    }
  }, [rawData, sliderValue]);

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value));
  };
  return (
    <div className="raw-data">
      <h5
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Stock Data
      </h5>
    <div className="table-responsive" >
        {" "}
        {/* Make the table responsive */}
        <table className="table" >
          <thead>
            <tr>
              {columnOrder.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flattenedData.map((data, index) => (
              <tr key={index}>
                {columnOrder.map((column) => (
                  <td key={`${column}-${index}`}>{data[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display present day's stock data */}
      {presentDayData && (
        <div className="today">
          <h5
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Today's Stock Data
          </h5>
          <div className="stock-data">
            <div
              className="price-box label"
              style={{ backgroundColor: "#3a678e" }}
            >
              High{" "}
              <span className="value">{presentDayData.High.toFixed(2)}</span>
            </div>
            <div
              className="price-box label"
              style={{ backgroundColor: "orange" }}
            >
              Low <span className="value">{presentDayData.Low.toFixed(2)}</span>
            </div>
            <div
              className="price-box label"
              style={{ backgroundColor: "#c9596c" }}
            >
              Open{" "}
              <span className="value">{presentDayData.Open.toFixed(2)}</span>
            </div>
            <div
              className="price-box label"
              style={{ backgroundColor: "#43ac43" }}
            >
              Close{" "}
              <span className="value">{presentDayData.Close.toFixed(2)}</span>
            </div>
            <div
              className="price-box label"
              style={{ backgroundColor: "rgb(35 52 53)" }}
            >
              Adj Close{" "}
              <span className="value">
                {presentDayData["Adj Close"].toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
      <h5
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop:'50px',
        }}
      >
        Stock Data chart 
      </h5>
      <canvas ref={chartRef} style={{marginTop:'29px',width: "200px", height: "99px"}}></canvas>
      <input
        type="range"
        min={0}
        max={rawData.length - 1}
        value={sliderValue}
        onChange={handleSliderChange}
        className="slider"
      />
      <span>
        {new Date(rawData[sliderValue]?.Date).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}
      </span>
    </div>
  );
};

export default RawDataTable;
