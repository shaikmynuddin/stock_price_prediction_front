import React from 'react';
import { Link } from 'react-router-dom';
import BgVideo from '../media/Bg2.mp4'; // Import your video file here
const Dashboard = () => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1 style={{ color: 'whitesmoke' }}>Predict The Future</h1>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: '0',
          left: '-12px',
          width: '102%',
          height: '79%',
          objectFit: 'cover',
          zIndex: '-1'
        }}
      >
        <source src={BgVideo} type="video/mp4" />
        {/* Add more source elements for different video formats if necessary */}
      </video>
      <Link to="/prediction">
        <button
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Example background color with transparency
            padding: '10px 20px',
            margin: '10px 0px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '15px',
            cursor: 'pointer',
            color: 'white',
            fontFamily: 'sanserif',
          }}
        >
          Click Here
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
