import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import heroBg from "../assets/img/minecraft.webp";
import heroBg2 from "../assets/img/drop.webp";
import heroBg3 from "../assets/img/sinners.webp";

function Hero() {
  return (
    <Carousel data-bs-theme="dark">
      {/* Banner 1 */}
      <Carousel.Item>
        <a href="https://www.odeoncinemas.ie/films/a-minecraft-movie/HO00006718/" target="_blank" rel="noopener noreferrer">
          <img className="hero" src={heroBg} alt="A Minecraft Movie" />
          <Carousel.Caption>
            <h1>A Minecraft Movie</h1>
            <p>
              Four misfits — Garrett “The Garbage Man” Garrison, Henry, <br />
              Natalie and Dawn —find themselves struggling with ordinary problems.
            </p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>

      {/* Banner 2 */}
      <Carousel.Item>
        <a href="https://www.odeoncinemas.ie/films/drop/HO00007005/" target="_blank" rel="noopener noreferrer">
          <img className="hero" src={heroBg2} alt="Drop" />
          <Carousel.Caption>
            <h1>Drop</h1>
            <p>
              First dates are nerve-wracking enough. Going on a first date while
              an unnamed, <br />
              unseen troll pings you personal memes that escalate from annoying to
              homicidal?
            </p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>

      {/* Banner 3 */}
      <Carousel.Item>
        <a href="https://www.odeoncinemas.ie/films/sinners/HO00006624/" target="_blank" rel="noopener noreferrer">
          <img className="hero" src={heroBg3} alt="Sinners" />
          <Carousel.Caption>
            <h1>Sinners</h1>
            <p>
              Trying to leave their troubled lives behind, twin brothers return to
              <br />
              their hometown to start again, only to discover that <br />
              an even greater evil is waiting to welcome them back.
            </p>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
    </Carousel>
  );
}

export default Hero;
