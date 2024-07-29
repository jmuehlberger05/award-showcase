"use client";

import React, { useEffect } from "react";
import AwardDescription from "./AwardDescription";
import AwardSlide from "./AwardSlide";
import { AnimationState, AwardDataDTO } from "./AwardPresentation";

function AwardSlideContainer({
  data,
  animationState,
}: {
  data: AwardDataDTO;
  animationState: AnimationState;
}) {
  return (
    <div className="h-dvh w-full relative">
      <AwardSlide
        foregroundVideoUrl={data.video}
        backgroundVideoUrl={data.achievementVideo}
      />
      <AwardDescription
        person={data.name}
        title={data.achievementTitle}
        state={animationState}
      />
    </div>
  );
}

export default AwardSlideContainer;
