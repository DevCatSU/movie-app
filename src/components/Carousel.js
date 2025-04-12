import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import heroBg from "../assets/img/warfare.webp";
import heroBg2 from "../assets/img/drop.webp";
import heroBg3 from "../assets/img/sinners.webp";

function Hero() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img className="hero" src={heroBg} alt="Second slide" />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="hero" src={heroBg2} alt="Second slide" />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="hero" src={heroBg3} alt="Third slide" />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Hero;
