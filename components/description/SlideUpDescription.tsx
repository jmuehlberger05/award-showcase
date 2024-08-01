"use client";

import gsap from "gsap";
import React, { useEffect } from "react";
import SplitType from "split-type";
import { AnimationState } from "../HeroPresentation";
import { toKebabCase } from "@/app/lib/util/stringFunctions";

interface SlideUpDescriptionProps {
  title: string;
  titleId: string;
  titleSplit: SplitType;
  hero: string;
  heroId: string;
  heroSplit: SplitType;
  state: AnimationState;
}

function SlideUpDescription({
  title,
  titleId,
  titleSplit,
  hero,
  heroId,
  heroSplit,
  state,
}: SlideUpDescriptionProps) {
  useEffect(() => {
    if (!titleSplit || !heroSplit) return;

    // var tl = gsap.timeline({
    //   repeat: -1,
    // });
  }, [titleSplit, heroSplit]);

  return (
    <div>
      <div className="absolute inset-0 text-white z-100">
        <div className="absolute top-[50dvh] bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent z-100 isolate">
          <div className="overflow-hidden absolute left-10 bottom-10 z-100">
            <h1
              className="text-[12vw] font-bold mb-3 leading-[1] z-100"
              id={heroId}
            >
              {hero}
            </h1>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-full h-full grid place-content-center z-10">
          <div className="overflow-hidden">
            <p className="text-[5vw] w-fit" id={titleId}>
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideUpDescription;
