"use client";

import React, { useEffect, useState } from "react";
import HeroSlideContainer from "./slide/HeroSlideContainer";

// * HeroDataDTO is the data structure that the API returns
export type HeroDataDTO = {
  id: number;
  hero: {
    name: string;
    video: string;
  };
  achievement: {
    title: string;
    video: string;
    details: {
      title: string;
    };
  };
};

// * Animation State for each slide
export type AnimationState = "nextInLine" | "active" | "inactive";

function HeroPresentation({ dataURL }: { dataURL: string }) {
  const [data, setData] = useState<HeroDataDTO[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // * Fetch data from API
  useEffect(() => {
    // Disable the default caching in Next.js 14
    fetch(dataURL, { cache: "no-store", next: { revalidate: 0 } })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [dataURL]);

  // * Increment Slide and infinite loop
  const incrementSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  };

  // * Get Animation State for each slide
  const getAnimationState = (index: number): AnimationState => {
    if (index === currentSlide) {
      return "active";
    } else if (index === (currentSlide + 1) % data.length) {
      return "nextInLine";
    } else {
      return "inactive";
    }
  };

  return (
    <div>
      {data.map((item, index) => (
        <HeroSlideContainer
          key={item.id}
          data={item}
          animationState={getAnimationState(index)}
          slideID={index}
          onCurrentSlideEnd={incrementSlide}
        />
      ))}
    </div>
  );
}

export default HeroPresentation;
