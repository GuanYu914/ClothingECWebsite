import { Carousel } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

const CarouselImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt || "slide",
}))`
  width: 100%;
  height: auto;
  max-height: ${(props) => props.maxHeight || "50rem"};
  border-radius: ${(props) => props.borderRadius || "unset"};
  cursor: pointer;
`;

const StyledCarousel = styled(Carousel)`
  width: ${(props) => props.width || "100%"};
  height: fit-content;
`;

export default function BSCarousel({ slides }) {
  const history = useHistory();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {slides.useForBanner ? (
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
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(slide.link);
                }}
                maxHeight={slides.frame.maxHeight}
                borderRadius={slides.frame.borderRadius}
              />
            </Carousel.Item>
          ))}
        </StyledCarousel>
      ) : (
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
      )}
    </>
  );
}

// 使用 react-bootstrap5 Carousel 原生組件
// Prop 參數
/**
 * slides (required) {
 *  useForBanner:   boolean
 *  frame: {
 *    width:        string (optional)
 *    maxHeight:    string (optional)
 *    borderRadius: string (optional)
 *  }
 *  slide: [
 *    {
 *      id  : number (required)
 *      src : string (required)
 *      alt : string (required)
 *      link: string (當 useForBanner 為 true 才傳入)
 *    }
 *  ]
 * }
 */

BSCarousel.propTypes = {
  slides: PropTypes.shape({
    useForBanner: propTypes.bool,
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
