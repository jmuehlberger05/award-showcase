"use client";

import React from "react";

interface AwardSlideProps {
  foregroundVideoUrl: string;
  backgroundVideoUrl: string;
}

function AwardSlide({
  foregroundVideoUrl,
  backgroundVideoUrl,
}: AwardSlideProps) {
  return (
    <div>
      <video
        className="absolute h-dvh w-full object-cover"
        autoPlay
        controls={false}
        loop
        muted
      >
        <source src={backgroundVideoUrl} />
      </video>
      <video
        className="absolute h-dvh w-1/2 object-cover left-0"
        autoPlay
        controls={false}
        loop
        muted
      >
        <source src={foregroundVideoUrl} type="video/webm" />
      </video>
    </div>
  );
}

export default AwardSlide;
