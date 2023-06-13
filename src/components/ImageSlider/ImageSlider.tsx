import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1541443131876-44b03de101c5",
    title: "beach",
  },
  {
    url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    title: "boat",
  },
  {
    url: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    title: "forest",
  },
  {
    url: "https://images.unsplash.com/photo-1518987048-93e29699e79a",
    title: "city",
  },
  {
    url: "https://images.unsplash.com/photo-1503174971373-b1f69850bded",
    title: "italy",
  },
];

const ImageSlider = () => {
  return (
    <div className="slider">
      <Carousel autoPlay infiniteLoop showArrows={true} showThumbs={true}>
        {slides.map((slides, index) => (
          <div className="slider-image-container" key={index}>
            <img src={slides.url} alt={slides.title} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
