"use client";

import React, { use, useEffect, useState } from "react";
import HeroSlideContainer from "./HeroSlideContainer";
import gsap from "gsap";

export type HeroDataDTO = {
  id: number;
  name: string;
  video: string;
  achievementID: number;
  achievementTitle: string;
  achievementVideo: string;
  details: {
    title: string;
  };
};

export type AnimationState = "nextInLine" | "active" | "inactive";

function HeroPresentation({ dataURL }: { dataURL: string }) {
  const [data, setData] = useState<HeroDataDTO[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [animationState, setAnimationState] =
    useState<AnimationState>("inactive");

  // * Fetch data from API
  useEffect(() => {
    fetch(dataURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [dataURL]);

  const incrementSlide = () => {
    // * Increment Slide and infinite loop

    setCurrentSlide((prev) => (prev + 1) % data.length);
    // console.log("Incrementing from", currentSlide, "to", currentSlide + 1);
  };

  const onCurrentSlideEnd = (slideID: number) => {
    console.log("Current Slide Ended ", slideID);
    incrementSlide();
  };

  useEffect(() => {
    console.log("Current Slide: ", currentSlide);
  }, [currentSlide]);

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
          key={item.achievementID}
          data={item}
          animationState={getAnimationState(index)}
          slideID={index}
          onCurrentSlideEnd={onCurrentSlideEnd}
          // timeline={gsap.timeline()}
        />
      ))}
    </div>
  );
}

export default HeroPresentation;
