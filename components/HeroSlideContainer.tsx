"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimationState, HeroDataDTO } from "./HeroPresentation";
import SlideUpDescription from "./description/SlideUpDescription";
import HeroSlide from "./HeroSlide";
import gsap from "gsap";
import SplitType from "split-type";
import { toKebabCase } from "@/app/lib/util/stringFunctions";

function HeroSlideContainer({
  data,
  animationState,
  slideID,
  onCurrentSlideEnd,
}: {
  data: HeroDataDTO;
  animationState: AnimationState;
  slideID: number;
  onCurrentSlideEnd: (slideID: number) => void;
}) {
  const foregroundVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  const stepDurations = {
    step1: 2,
    step2: 2,
    step3: 1,
  } as const;

  const initTimeLine = ({
    title,
    hero,
    details,
  }: {
    title: SplitType;
    hero: SplitType;
    details: SplitType;
  }) => {
    var tl = gsap.timeline({
      onStart: onTimeLineStart,
      onComplete: onTimeLineEnd,
    });

    // Set initial Conditions
    tl.set([hero!.words, details!.words, title!.words], {
      opacity: 0,
      y: 100,
    });

    // Pause till the slide gets activated
    tl.pause();

    // * Start Step 1 -> Animate Title in
    tl.fromTo(
      title!.words,
      {
        opacity: 0,
        y: 100,
        duration: stepDurations.step1,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power3.inOut",
        duration: stepDurations.step1,
        stagger: 0.1,
      }
    );

    // * End Step 1 -> Animate Title out
    tl.fromTo(
      title!.words,
      {
        opacity: 1,
        y: 0,
        delay: 1,
      },
      {
        opacity: 0,
        delay: 1,
        duration: 1,
        y: -100,
        ease: "power3.inOut",
        stagger: 0.1,
        onComplete: startForegroundVideo,
      }
    );

    // * Start Step 2 -> Animate Foreground Video in
    tl.fromTo(
      foregroundVideoRef.current,
      {
        y: "100%",
        delay: -1,
        duration: 2,
      },
      {
        y: 0,
        ease: "power3.inOut",
        delay: -1,
        duration: 2,
      }
    );

    // * Start Step 2 -> Animate Hero Name in
    tl.fromTo(
      [hero!.words, details!.words],
      {
        opacity: 0,
        delay: -0.1,
        duration: 1.5,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        delay: -0.1,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.2,
      }
    );

    // * End Step 2 -> Animate Hero Name out
    tl.fromTo(
      [hero!.words, details!.words],
      {
        delay: 1,
        opacity: 1,
        y: 0,
      },
      {
        delay: 1,
        opacity: 0,
        y: -100,
        ease: "power3.inOut",
        stagger: 0.1,
      }
    );

    // * Start Step 3 -> Animate Foreground Video out
    tl.to(foregroundVideoRef.current, {
      y: "100%",
      ease: "power3.inOut",
      delay: -0.5,
      duration: 1,
      onComplete: stopForegroundVideo,
    });

    setTimeline(tl);
  };

  // * Start timeline when animationstate is active.
  useEffect(() => {
    if (animationState === "active") {
      console.log("Starting Timeline", slideID);

      // Add a delay to initialize Splittype and Timelines first.
      setTimeout(() => {
        timeline?.time(0);
        timeline?.resume();
      }, 30);
    }
  }, [animationState, timeline]);

  // * Start Foreground Video
  const startForegroundVideo = () => {
    if (!foregroundVideoRef.current) return;

    foregroundVideoRef.current.currentTime = 0;
    foregroundVideoRef.current.play();
  };

  // * Stop Foreground Video
  const stopForegroundVideo = () => {
    if (!foregroundVideoRef.current) return;

    foregroundVideoRef.current.pause();
    foregroundVideoRef.current.currentTime = 0;
  };

  // * Timeline start event
  const onTimeLineStart = () => {
    console.log("Timeline", slideID, "started");

    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.currentTime = 0;
      backgroundVideoRef.current.play();
    }
    stopForegroundVideo();
  };

  // * Timeline end event
  const onTimeLineEnd = () => {
    console.log("Timeline ended");

    timeline?.time(0);

    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.pause();
    }

    onCurrentSlideEnd(slideID);
  };

  // * Initialize SplitText and return the SplitTypes
  const initSplitType = async (
    titleId: string,
    heroId: string,
    detailsId: string
  ): Promise<{
    title: SplitType;
    hero: SplitType;
    details: SplitType;
  }> => {
    let splits = await {
      title: SplitType.create(titleId),
      hero: SplitType.create(heroId),
      details: SplitType.create(detailsId),
    };
    console.log("SplitText initialized");
    return splits;
  };

  // * Initialize Slide on mount
  useEffect(() => {
    // * Initialize SplitText and Timeline
    const initSlide = async () => {
      console.log("Initializing Slide ", slideID);
      const splits = await initSplitType(
        `#title-${toKebabCase(data.achievementTitle)}`,
        `#hero-${toKebabCase(data.name)}`,
        `#details-${toKebabCase(data.details.title)}`
      );
      initTimeLine(splits);
    };

    initSlide();
  }, []);

  // * Return the Styles for the Slide based on the current animationState
  const returnAnimationStateStyles = (state: AnimationState) => {
    switch (state) {
      case "inactive":
        return {
          transform: "translateY(-100%)",
          zIndex: 1000,
        };
      case "active":
        return {
          transform: "translateY(0)",
          zIndex: 1000,
        };
      case "nextInLine":
        return {
          transform: "translateY(100%)",
          zIndex: 100,
        };
    }
  };

  return (
    <div
      className="h-dvh w-full fixed overflow-hidden isolate transition-transform duration-500"
      style={returnAnimationStateStyles(animationState)}
    >
      <HeroSlide
        foregroundVideo={{ url: data.video, ref: foregroundVideoRef }}
        backgroundVideo={{
          url: data.achievementVideo,
          ref: backgroundVideoRef,
        }}
        slideId={slideID}
      />
      <SlideUpDescription
        hero={{
          text: data.name,
          id: `hero-${toKebabCase(data.name)}`,
        }}
        title={{
          text: data.achievementTitle,
          id: `title-${toKebabCase(data.achievementTitle)}`,
        }}
        details={{
          text: data.details.title,
          id: `details-${toKebabCase(data.details.title)}`,
        }}
      />
    </div>
  );
}

export default HeroSlideContainer;
