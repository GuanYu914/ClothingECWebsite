import { Carousel } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const CarouselImage = styled.img.attrs<{ src: string; alt?: string }>(
  (props) => ({
    src: props.src,
    alt: props.alt || "slide",
  })
)<{ maxHeight?: string; borderRadius?: string }>`
  width: 100%;
  height: auto;
  max-height: ${(props) => props.maxHeight || "50rem"};
  border-radius: ${(props) => props.borderRadius || "unset"};
  cursor: pointer;
`;

const StyledCarousel = styled(Carousel)<{ width?: string }>`
  width: ${(props) => props.width || "100%"};
  height: fit-content;
`;

interface BSCarouselProps {
  slides: {
    useForBanner: boolean;
    frame: {
      width?: boolean;
      maxHeight?: string;
      borderRadius?: string;
    };
    slide: {
      id: number;
      src: string;
      alt?: string;
      link: string;
    }[];
  };
}

export default function BSCarousel({ slides }: BSCarouselProps) {
  const history = useHistory();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
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
                  if (typeof slide.link === "string") {
                    history.push(slide.link);
                  } else {
                    throw new Error("BSCarousel Component: Pass wrong type");
                  }
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
