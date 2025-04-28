"use client";

import React, { useState } from "react";
import HeroSlideContainer from "./slide/HeroSlideContainer";
import { useFetch } from "@/app/lib/hooks/useFetch";

// * HeroDataDTO is the data structure that the API returns
export type HeroDataDTO = {
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { data, loading } = useFetch<HeroDataDTO[]>(dataURL);

  // * Increment Slide and infinite loop
  const incrementSlide = () => {
    if (loading) return;
    setCurrentSlide((prev) => (prev + 1) % data!.length);
  };

  // * Get Animation State for each slide
  const getAnimationState = (index: number): AnimationState => {
    if (loading) {
      return "inactive";
    }
    if (index === currentSlide) {
      return "active";
    } else if (index === (currentSlide + 1) % data!.length) {
      return "nextInLine";
    } else {
      return "inactive";
    }
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      )}
      {data &&
        data.map((item, index) => (
          <HeroSlideContainer
            key={index}
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
