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
  // timeline,
}: {
  data: HeroDataDTO;
  animationState: AnimationState;
  slideID: number;
  onCurrentSlideEnd: (slideID: number) => void;
  // timeline: gsap.core.Timeline;
}) {
  const foregroundVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  const [splitTitle, setSplitTitle] = useState<SplitType | null>(null);
  const [splitHero, setSplitHero] = useState<SplitType | null>(null);

  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  const stepDurations = {
    step1: 2,
    step2: 2,
    step3: 1,
  };

  const initTimeLine = ({
    title,
    hero,
  }: {
    title: SplitType;
    hero: SplitType;
  }) => {
    // timeline.onStart = onTimeLineStart;
    // timeline.onComplete = onTimeLineEnd;
    var tl = gsap.timeline({
      // repeat: -1,
      // repeatDelay: 1,
      onStart: onTimeLineStart,
      onComplete: onTimeLineEnd,
    });

    tl.set(hero!.words, {
      opacity: 0,
      y: 100,
    });

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
      hero!.words,
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
      hero!.words,
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

  const startTimeLine = () => {
    timeline?.time(0);
    timeline?.resume();
  };

  useEffect(() => {
    if (animationState === "active") {
      console.log("Starting Timeline", slideID);

      setTimeout(startTimeLine, 50);
    }
  }, [animationState, timeline]);

  // * Start Foreground Video
  const startForegroundVideo = () => {
    if (foregroundVideoRef.current) {
      foregroundVideoRef.current.currentTime = 0;
      foregroundVideoRef.current.play();
    }
  };

  // * Stop Foreground Video
  const stopForegroundVideo = () => {
    if (foregroundVideoRef.current) {
      foregroundVideoRef.current.pause();
      foregroundVideoRef.current.currentTime = 0;
    }
  };

  // * Timeline start and end events
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
    heroId: string
  ): Promise<{
    title: SplitType;
    hero: SplitType;
  }> => {
    let splits = await {
      title: SplitType.create(titleId),
      hero: SplitType.create(heroId),
    };

    setSplitTitle(splits.title);
    setSplitHero(splits.hero);

    console.log("SplitText initialized");
    return splits;
  };

  // * Initialize SplitText and Timeline
  const initSlide = async () => {
    console.log("Initializing Slide ", slideID);
    const splits = await initSplitType(
      `#title-${toKebabCase(data.achievementTitle)}`,
      `#hero-${toKebabCase(data.name)}`
    );
    initTimeLine(splits);
  };

  useEffect(() => {
    initSlide();
  }, []);

  return (
    <div
      className="h-dvh w-full fixed overflow-hidden isolate"
      // TODO: Fix zIndex (2- slideId is temporary )
      style={{ zIndex: animationState === "active" ? 1000 : 2 - slideID }}
    >
      <HeroSlide
        foregroundVideoUrl={data.video}
        backgroundVideoUrl={data.achievementVideo}
        foregroundVideoRef={foregroundVideoRef}
        backgroundVideoRef={backgroundVideoRef}
        slideId={slideID}
      />
      <SlideUpDescription
        hero={data.name}
        heroId={`hero-${toKebabCase(data.name)}`}
        heroSplit={splitHero!}
        title={data.achievementTitle}
        titleId={`title-${toKebabCase(data.achievementTitle)}`}
        titleSplit={splitTitle!}
        state={animationState}
      />
    </div>
  );
}

export default HeroSlideContainer;
