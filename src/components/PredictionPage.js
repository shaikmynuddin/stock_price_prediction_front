import React from 'react';
import TextForm from './Textform'; // Import the TextForm component
import predictionImage from '../media/predictionimg.jpg'; // Import the image file


const PredictionPage = ({ stocks }) => {
  // Define a function to handle form submission
  const handleFormSubmit = (formData) => {
    // Handle form submission here, maybe update state with new data
    console.log('Form submitted with data:', formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* Add the image above the input form */}

      <img src={predictionImage} alt="Prediction" style={{ height:'60vh' ,width:'100vw',marginTop:'-20em'}} />

      {/* Add the TextForm component with necessary props */}
      <TextForm stocks={stocks} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default PredictionPage;