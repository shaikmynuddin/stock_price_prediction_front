import React, { useState } from "react";
import PredictionResult from "./PredictionResult";

const TextForm = ({ stocks, onSubmit }) => {
  const [selectedStock, setSelectedStock] = useState(
    stocks && stocks.length > 0 ? stocks[0] : ""
  );
  const [predictionData, setPredictionData] = useState(null);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict_stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selected_stock: selectedStock }),
      });

      if (response.ok) {
        const data = await response.json();
        setPredictionData(data);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(
          `Error: ${errorData.error}. Details: ${errorData.details}`
        );
        setPredictionData(null);
      }
    } catch (error) {
      setError(`Connection slow: ${error.message}`);
      setPredictionData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDropdownItemClick = (stock) => {
    setSelectedStock(stock);
    setSearchInput(stock);
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleClearInput = () => {
    setSearchInput("");
  };

  return (
    <div className="mt-10">
      <h5 className="mt-5" style={{color:'#469094'}}>Enter a Stock symbol</h5>
      <div className="input-group mb-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Symbol
        </button>
        <ul className="dropdown-menu">
          {filteredStocks.map((stock) => (
            <li key={stock}>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleDropdownItemClick(stock)}
              >
                {stock}
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search stock"
        />
      </div>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="text-center">
          <button type="submit" className="btn btn-primary" style={{margin:'6px'}}>
            Predict
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleClearInput} style={{margin:'6px'}}>
            Clear
          </button>
        </form>
      )}
      <PredictionResult
        selectedStock={selectedStock}
        predictionData={predictionData}
        error={error}
        rawData={predictionData?.rawData}
      />
    </div>
  );
};

export default TextForm;
