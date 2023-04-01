import { Carousel } from "react-bootstrap";
import styled from "styled-components/macro";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CAROUSEL_LAZY_LOADING_CONFIG,
  CAROUSEL_LAZY_LOADING_TAG,
} from "../../constant";
import usePrevious from "../../hooks/usePrevious";

const CarouselImage = styled.img.attrs<{ src: string; alt?: string }>(
  (props) => ({
    className: CAROUSEL_LAZY_LOADING_TAG,
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

export interface ExternalBSCarouselProps {
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
    link?: string;
  }[];
}

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
      link?: string;
    }[];
  };
}

// 將帶有 CAROUSEL_LAZY_LOADING_TAG 的 DOM elements 掛上 IntersectionObserver
function initLazyLoading(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLImageElement;
          // 預設行為，如果出現在 view port 裡面，則從 data-src 欄位載入圖片
          element.src = element.dataset.src as string;
          observer.unobserve(element);
        }
      });
    },
    {
      root: CAROUSEL_LAZY_LOADING_CONFIG.root,
      rootMargin: CAROUSEL_LAZY_LOADING_CONFIG.rootMargin,
      threshold: CAROUSEL_LAZY_LOADING_CONFIG.threshold,
    }
  );

  const observedTargets = document.querySelectorAll(
    `.${CAROUSEL_LAZY_LOADING_TAG}`
  );
  // 如果沒有任何 lazy-loading tag 的物件
  if (observedTargets.length === 0) {
    throw new Error(
      "can't select any lazy-loading items, check selector query"
    );
  }
  Array.from(observedTargets).forEach((target) => observer.observe(target));
}

export default function BSCarousel({ slides }: BSCarouselProps) {
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const prevSlide = usePrevious(slides.slide);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    // 確保 items 裡面 value 為不一致才做，避免不同 ref 相同 value 傳入，掛載重複的 IntersectionObserver
    if (JSON.stringify(slides.slide) === JSON.stringify(prevSlide)) return;
    initLazyLoading();
    // eslint-disable-next-line
  }, [slides.slide]);

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
                alt={slide.alt}
                data-src={slide.src}
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof slide.link === "string") {
                    history.push(slide.link);
                  } else {
                    throw new Error("need to pass link prop");
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
                alt={slide.alt}
                data-src={slide.src}
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
