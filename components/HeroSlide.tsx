"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

interface HeroSlideProps {
  foregroundVideoUrl: string;
  backgroundVideoUrl: string;
  foregroundVideoRef: React.RefObject<HTMLVideoElement>;
  backgroundVideoRef: React.RefObject<HTMLVideoElement>;
}

function HeroSlide({
  foregroundVideoUrl,
  backgroundVideoUrl,
  foregroundVideoRef,
  backgroundVideoRef,
}: HeroSlideProps) {
  return (
    <div>
      <video
        className="absolute h-dvh w-full object-cover"
        controls={false}
        muted
        ref={backgroundVideoRef}
      >
        <source src={backgroundVideoUrl} />
      </video>
      <video
        className="absolute h-dvh w-full object-cover left-0"
        // autoPlay
        controls={false}
        // loop
        muted
        id="foregroundVideo"
        ref={foregroundVideoRef}
      >
        <source src={foregroundVideoUrl} type="video/webm" />
      </video>
    </div>
  );
}

export default HeroSlide;
