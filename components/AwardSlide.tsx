"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

interface AwardSlideProps {
  foregroundVideoUrl: string;
  backgroundVideoUrl: string;
}

function AwardSlide({
  foregroundVideoUrl,
  backgroundVideoUrl,
}: AwardSlideProps) {
  const foregroundVideoRef = React.useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    var tl = gsap.timeline({
      repeat: -1,
      onRepeat: onTimeLineStart,
      onStart: onTimeLineStart,
    });

    tl.fromTo(
      "#foregroundVideo",
      {
        y: "100%",
      },
      {
        y: 0,
        ease: "power4.out",
        duration: 2,
      }
    );

    tl.fromTo(
      "#foregroundVideo",
      {
        opacity: 1,
      },
      {
        opacity: 1,
        duration: 2,
      }
    );
  }, []);

  const onTimeLineStart = () => {
    console.log("Timeline started");

    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.currentTime = 0;
      backgroundVideoRef.current.play();
    }

    if (foregroundVideoRef.current) {
      foregroundVideoRef.current.pause();
      foregroundVideoRef.current.currentTime = 0;
      // foregroundVideoRef.current.play();
    }
  };

  const onTimeLineEnd = () => {
    console.log("Timeline ended");

    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.pause();
    }
  };

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

export default AwardSlide;
