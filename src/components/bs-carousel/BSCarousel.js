import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

const CarouselImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt || "slide",
}))`
  display: block;
  width: ${(prop) => prop.width || "100%"};
  height: ${(prop) => prop.height || "auto"};
  max-height: ${(prop) => prop.maxHeight || "30rem"};
  border-radius: ${(prop) => prop.borderRadius || "unset"};
`;

// 使用 react-bootstrap5 Carousel 原生組件
export default function BSCarousel({ slides }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <CarouselImage
            src={slide.src}
            alt={slide.alt}
            width={slide.style.width}
            height={slide.style.height}
            maxHeight={slide.style.maxHeight}
            borderRadius={slide.style.borderRadius}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

BSCarousel.propTypes = {
  slides: PropTypes.array,
};
