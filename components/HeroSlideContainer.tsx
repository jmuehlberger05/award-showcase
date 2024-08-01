"use client";

import React, { useEffect } from "react";
import HeroDescription from "./HeroDescription";
import { AnimationState, HeroDataDTO } from "./HeroPresentation";
import SlideUpDescription from "./description/SlideUpDescription";
import HeroSlide from "./HeroSlide";

function HeroSlideContainer({
  data,
  animationState,
}: {
  data: HeroDataDTO;
  animationState: AnimationState;
}) {
  return (
    <div className="h-dvh w-full relative overflow-hidden isolate">
      <HeroSlide
        foregroundVideoUrl={data.video}
        backgroundVideoUrl={data.achievementVideo}
      />
      <SlideUpDescription
        person={data.name}
        title={data.achievementTitle}
        state={animationState}
      />
    </div>
  );
}

export default HeroSlideContainer;
