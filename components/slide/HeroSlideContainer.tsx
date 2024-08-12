"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimationState, HeroDataDTO } from "../HeroPresentation";
import SlideUpDescription from "../description/SlideUpDescription";
import HeroSlide from "./HeroSlide";
import gsap from "gsap";
import SplitType from "split-type";
import { toIdString } from "@/app/lib/util/stringFunctions";

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

  type SlideSplits = {
    title: SplitType;
    hero: SplitType;
    details: SplitType;
  };

  // * Initialize Timeline with the SplitTexts
  // The timeline is then paused and started when the animationState is active.
  const initTimeLine = ({ title, hero, details }: SlideSplits) => {
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

    // End Step 1 -> Animate Title out
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
        onComplete: () => startVideo(foregroundVideoRef),
      }
    );

    // Start Step 2 -> Animate Foreground Video in
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

    // Start Step 2 -> Animate Hero Name in
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

    // End Step 2 -> Animate Hero Name out
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

    // Start Step 3 -> Animate Foreground Video out
    tl.to(foregroundVideoRef.current, {
      y: "100%",
      ease: "power3.inOut",
      delay: -0.5,
      duration: 1,
      onComplete: () => stopVideo(foregroundVideoRef),
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

  // * Start a video from the beginning
  const startVideo = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  // * Stop a video and reset the time to 0
  const stopVideo = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  // * Timeline start event
  const onTimeLineStart = () => {
    console.log("Timeline", slideID, "started");

    startVideo(backgroundVideoRef);
    // stop the foreground video if it is playing by default
    stopVideo(foregroundVideoRef);
  };

  // * Timeline end event
  const onTimeLineEnd = () => {
    console.log("Timeline", slideID, "ended");

    timeline?.time(0);
    stopVideo(backgroundVideoRef);

    onCurrentSlideEnd(slideID);
  };

  // * Initialize SplitText and return the SplitTypes as SlideSplits
  const initSplitType = async (
    titleId: string,
    heroId: string,
    detailsId: string
  ): Promise<SlideSplits> => {
    let splits = await {
      title: SplitType.create(titleId),
      hero: SplitType.create(heroId),
      details: SplitType.create(detailsId),
    };
    console.log("SplitText initialized");
    return splits;
  };

  // * Initialize SplitTypes and Timeline on mount
  useEffect(() => {
    // * Initialize SplitText and Timeline
    const initSlide = async () => {
      console.log("Initializing Slide ", slideID);
      const splits = await initSplitType(
        toIdString("#title", data.achievement.title),
        toIdString("#hero", data.hero.name),
        toIdString("#details", data.achievement.details.title)
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
        foregroundVideo={{ url: data.hero.video, ref: foregroundVideoRef }}
        backgroundVideo={{
          url: data.achievement.video,
          ref: backgroundVideoRef,
        }}
        slideId={slideID}
      />
      <SlideUpDescription
        hero={{
          text: data.hero.name,
          id: toIdString("hero", data.hero.name),
        }}
        title={{
          text: data.achievement.title,
          id: toIdString("title", data.achievement.title),
        }}
        details={{
          text: data.achievement.details.title,
          id: toIdString("details", data.achievement.details.title),
        }}
      />
    </div>
  );
}

export default HeroSlideContainer;
