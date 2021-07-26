import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { SliderData } from "./SliderData";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;
  const timeout = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };
    timeout.current = setTimeout(nextSlide, 5000);
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="heroSection" id="home">
      <div className="heroWrapper">
        {SliderData.map((slide, index) => {
          return (
            <div className="heroSlide" key={index}>
              {index === current && (
                <div className="heroSlider">
                  <img
                    className="heroImage"
                    src={slide.image}
                    alt={slide.alt}
                  />
                  <div className="heroContent">
                    <h1>{slide.title}</h1>
                    <p>{slide.price}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className="sliderButtons">
          <ArrowBackIcon className="arrow" onClick={prevSlide} />
          <ArrowForwardIcon className="arrow" onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
