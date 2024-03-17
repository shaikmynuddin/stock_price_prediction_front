import React from 'react';
import '../index.css'; // Import your CSS file here
import BgVideo from '../media/Bg.mp4'; // Import your video file here
import slide1 from '../media/slide1.jpg'; // Import your video file here
import slide2 from '../media/slide2.jpg'; // Import your video file here
import slide3 from '../media/slide3.jpg'; // Import your video file here
import { Carousel } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <div className="landingpage">
      {/* Background Video */}
      <video src={BgVideo} autoPlay muted loop className="video-bg" />
      <div className="bg-overlay"></div>

      <div className="home-text">
        <h1>Stock Price Prediction</h1>
        <p>Come live out your ideal Stocks with us</p>
      </div>
    </div>
  );
}

const SlidingPhotosCarousel = () => {
  return (
    <Carousel className="carousel" style={{width:'100vw',height:'74vh'}}>
      <Carousel.Item>
        <img src={slide1} className="d-block w-50 mx-auto" alt="Your Dream House" />
        <Carousel.Caption className="text-center">
          <h5>Your Dream House</h5>
          <p className="carousel-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, nulla, tempore. Deserunt excepturi quas vero.</p>
          <button className="btn btn-warning mt-3">Learn More</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={slide2} className="d-block w-50 mx-auto" alt="Always Dedicated" />
        <Carousel.Caption className="text-center">
          <h5>Always Dedicated</h5>
          <p className="carousel-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, nulla, tempore. Deserunt excepturi quas vero.</p>
          <button className="btn btn-warning mt-3">Learn More</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={slide3} className="d-block w-50 mx-auto" alt="True Construction" />
        <Carousel.Caption className="text-center">
          <h5>True Construction</h5>
          <p className="carousel-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, nulla, tempore. Deserunt excepturi quas vero.</p>
          <button className="btn btn-warning mt-3">Learn More</button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const HomePage = () => {
  return (
    <div>
      <LandingPage />
      <SlidingPhotosCarousel />
    </div>
  );
}

export default HomePage;
