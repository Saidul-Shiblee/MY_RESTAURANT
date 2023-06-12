import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import React from "react";
import Image from "next/image";
import carouselPic1 from "../public/images/carousel/1.png";
import carouselPic2 from "../public/images/carousel/2.png";
import carouselPic3 from "../public/images/carousel/3.png";
import leftArrow from "../public/images/arrowl.png";
import rightArrow from "../public/images/arrowr.png";
const allImages = [
  {
    path: "../public/images/carousel/1.png",
    id: 1,
  },
  {
    path: "../public/images/carousel/2.jpg",
    id: 2,
  },
  {
    path: "../public/images/carousel/3.jpg",
    id: 3,
  },
];

const arrowStyles = {
  position: "absolute",
  zIndex: 2,
  top: "calc(50% - 15px)",
  width: 70,
  height: 70,
  cursor: "pointer",
};

const indicatorStyles = {
  background: "rgba(255, 255, 255, 0.2)",
  width: 8,
  height: 8,
  display: "inline-block",
  margin: "0 8px",
};

class Hero extends React.Component {
  render() {
    return (
      <div className="h-screen bg-gradient-solid" id="hero">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, left: 15 }}
              >
                <Image src={leftArrow} fill />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, right: 15 }}
              >
                <Image src={rightArrow} fill />
              </button>
            )
          }
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  style={{ ...indicatorStyles, background: "white" }}
                  aria-label={`Selected: ${label} ${index + 1}`}
                  title={`Selected: ${label} ${index + 1}`}
                />
              );
            }
            return (
              <li
                style={indicatorStyles}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            );
          }}
        >
          <div className="carousel   flex items-center justify-center  h-3/5 w-1/2 px-20">
            <div className="w-1/4 text-3xl text-white font-semibold flex justify-end"></div>
            <div className="w-2/4 h-[70%]">
              <Image
                src={carouselPic1}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-1/4 text-3xl text-white font-semibold flex "></div>
          </div>
          <div className="carousel  flex items-center justify-center  h-3/5 w-1/2 px-20">
            <div className="w-1/4 text-3xl text-white font-semibold flex justify-end"></div>
            <div className="w-2/4 h-[70%]">
              <Image
                src={carouselPic2}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-1/4 text-3xl text-white font-semibold flex "></div>
          </div>
          <div className="carousel  flex items-center justify-center  h-3/5 w-1/2 px-20">
            <div className="w-1/4 text-3xl text-white font-semibold flex justify-end"></div>
            <div className="w-2/4 h-[70%]">
              <Image
                src={carouselPic3}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-1/4 text-3xl text-white font-semibold flex "></div>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Hero;
