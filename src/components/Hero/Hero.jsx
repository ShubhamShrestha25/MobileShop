import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Hero.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import firebase from "firebase/app";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [slider, setSlider] = useState([]);
  const length = slider.length;
  const timeout = useRef(null);

  const getSlider = useCallback(() => {
    firebase
      .firestore()
      .collection("sliders")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setSlider(items);
      });
  }, []);

  useEffect(() => {
    getSlider();
  }, [getSlider]);

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
        {slider.map((slide, index) => {
          return (
            <div className="heroSlide" key={index}>
              {index === current && (
                <div className="heroSlider">
                  <img
                    className="heroImage"
                    src={slide.SliderImg}
                    alt={slide.SliderAlt}
                  />
                  <div className="heroContent">
                    <h1>{slide.SliderTitle}</h1>
                    <p>{slide.SliderPrice}</p>
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
