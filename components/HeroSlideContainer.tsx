"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimationState, HeroDataDTO } from "./HeroPresentation";
import SlideUpDescription from "./description/SlideUpDescription";
import HeroSlide from "./HeroSlide";
import gsap, { SteppedEase } from "gsap";
import SplitType from "split-type";
import { toKebabCase } from "@/app/lib/util/stringFunctions";
import { start } from "repl";

function HeroSlideContainer({
  data,
  animationState,
}: {
  data: HeroDataDTO;
  animationState: AnimationState;
}) {
  const foregroundVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  const [splitTitle, setSplitTitle] = useState<SplitType | null>(null);
  const [splitHero, setSplitHero] = useState<SplitType | null>(null);

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
    var tl = gsap.timeline({
      repeat: -1,
      onRepeat: onTimeLineStart,
      onStart: onTimeLineStart,
    });

    tl.set(hero!.words, {
      opacity: 0,
      y: 100,
    });

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

    // * Start Step 2 -> Animate Foreground Video in
    tl.fromTo(
      "#foregroundVideo",
      {
        y: "100%",
        delay: 0,
      },
      {
        y: 0,
        ease: "power3.inOut",
        delay: 0,
        duration: 2,
      }
    );

    // * End Step 1 -> Animate Title put
    tl.fromTo(
      title!.words,

      {
        opacity: 1,
        y: 0,
        delay: -2,
      },
      {
        opacity: 0,
        delay: -2,
        duration: 1,
        y: -100,
        ease: "power3.inOut",
        stagger: 0.1,
      }
    );

    // * Start Step 2 -> Animate Hero Name in
    tl.fromTo(
      hero!.words,
      {
        opacity: 0,
        delay: -2.1,
        duration: 1.5,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        delay: -2.1,
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
  };

  const onTimeLineStart = () => {
    console.log("Timeline started");

    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.currentTime = 0;
      backgroundVideoRef.current.play();
    }

    if (foregroundVideoRef.current) {
      foregroundVideoRef.current.pause();
      foregroundVideoRef.current.currentTime = 0;

      setTimeout(() => {
        if (foregroundVideoRef.current) foregroundVideoRef.current.play();
      }, 2000);
    }
  };

  const onTimeLineEnd = () => {
    console.log("Timeline ended");

    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.pause();
    }
  };

  const initSplitText = async ({
    title,
    hero,
  }: {
    title: string;
    hero: string;
  }) => {
    let splits = await {
      title: SplitType.create(title),
      hero: SplitType.create(hero),
    };

    setSplitTitle(splits.title);
    setSplitHero(splits.hero);

    console.log("SplitText initialized");
    return splits;
  };

  useEffect(() => {
    const init = async () => {
      const splits = await initSplitText({
        title: `#title-${toKebabCase(data.achievementTitle)}`,
        hero: `#hero-${toKebabCase(data.name)}`,
      });
      initTimeLine(splits);
    };

    init();
  }, []);

  return (
    <div className="h-dvh w-full relative overflow-hidden isolate">
      <HeroSlide
        foregroundVideoUrl={data.video}
        backgroundVideoUrl={data.achievementVideo}
        foregroundVideoRef={foregroundVideoRef}
        backgroundVideoRef={backgroundVideoRef}
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
