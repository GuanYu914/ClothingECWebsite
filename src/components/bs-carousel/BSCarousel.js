import { Carousel } from "react-bootstrap";
import styled from "styled-components/macro";
import { useState } from "react";
import PropTypes from "prop-types";

const CarouselImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt || "slide",
}))`
  width: 100%;
  height: auto;
  max-height: ${(props) => props.maxHeight || "30rem"};
  border-radius: ${(props) => props.borderRadius || "unset"};
`;

const StyledCarousel = styled(Carousel)`
  width: ${(props) => props.width || "100%"};
  height: fit-content;
`;

export default function BSCarousel({ slides }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <StyledCarousel
      activeIndex={index}
      onSelect={handleSelect}
      width={slides.frame.width}
    >
      {slides.slide.map((slide) => (
        <Carousel.Item key={slide.id}>
          <CarouselImage
            src={slide.src}
            alt={slide.alt}
            maxHeight={slides.frame.maxHeight}
            borderRadius={slides.frame.borderRadius}
          />
        </Carousel.Item>
      ))}
    </StyledCarousel>
  );
}

// 使用 react-bootstrap5 Carousel 原生組件
// Prop 參數
/**
 * slides (required) {
 *  frame: {
 *    width:        string (optional)
 *    maxHeight:    string (optional)
 *    borderRadius: string (optional)
 *  }
 *  slide: [
 *    {
 *      id:  number (required)
 *      src: string (required)
 *      alt: string (required)
 *    }
 *  ]
 * }
 */

BSCarousel.propTypes = {
  slides: PropTypes.shape({
    frame: PropTypes.shape({
      width: PropTypes.string,
      maxHeight: PropTypes.string,
      borderRadius: PropTypes.string,
    }),
    slide: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      })
    ),
  }),
};
