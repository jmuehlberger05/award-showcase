"use client";

import React from "react";

interface HeroSlideProps {
  foregroundVideo: Video;
  backgroundVideo: Video;
  slideId: number;
}

export type Video = {
  url: string;
  ref: React.RefObject<HTMLVideoElement>;
};

function HeroSlide({
  foregroundVideo,
  backgroundVideo,
  slideId,
}: HeroSlideProps) {
  return (
    <div>
      <video
        className="absolute h-dvh w-full object-cover"
        controls={false}
        muted
        ref={backgroundVideo.ref}
        id={"backgroundVideo" + slideId}
      >
        <source src={backgroundVideo.url} />
      </video>
      <video
        className="absolute h-dvh w-full object-cover left-0"
        controls={false}
        muted
        id={"foregroundVideo" + slideId}
        ref={foregroundVideo.ref}
      >
        <source src={foregroundVideo.url} type="video/webm" />
      </video>
    </div>
  );
}

export default HeroSlide;
