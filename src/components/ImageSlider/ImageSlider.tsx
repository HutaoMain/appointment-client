import { Carousel } from "react-responsive-carousel";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";

import image4 from "../../assets/4.jpg";
import "./ImageSlider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    url: image1,
    title: "beach",
  },
  {
    url: image2,
    title: "boat",
  },

  {
    url: image4,
    title: "city",
  },
];

const ImageSlider = () => {
  return (
    <div className="slider">
      <Carousel autoPlay infiniteLoop showArrows={true} showThumbs={true}>
        {slides.map((slides, index) => (
          <div className="slider-image-container" key={index}>
            <img src={slides.url} alt={slides.title} className="slider-image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
