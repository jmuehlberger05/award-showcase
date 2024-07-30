"use client";

import gsap from "gsap";
import React, { useEffect } from "react";
import SplitType from "split-type";
import { AnimationState } from "../AwardPresentation";

interface AwardDescriptionProps {
  title: string;
  person: string;
  state: AnimationState;
}

function AwardDescription({ title, person, state }: AwardDescriptionProps) {
  useEffect(() => {
    const title = SplitType.create("#heading");
    const person = SplitType.create("#award");
  }, []);

  useEffect(() => {
    var tl = gsap.timeline({
      repeat: -1,
    });

    tl.fromTo(
      "#heading .word",
      {
        opacity: 0,
        y: 100,
        duration: 1,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power4.out",
        duration: 1,
        stagger: 0.1,
      }
    );

    tl.fromTo(
      "#award .char",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power4.out",
        duration: 0,
        stagger: 0.1,
      }
    );

    tl.fromTo(
      "#heading .word",
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 0,
        y: -100,
        ease: "power4.out",
        stagger: 0.1,
        delay: 3,
      }
    );

    tl.fromTo(
      "#award .word",
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 0,
        y: -100,
        ease: "power4.out",
        stagger: 0.1,
      }
    );
  }, []);

  return (
    <div>
      <div className="absolute inset-0 text-white z-100">
        <div className="absolute top-[50dvh] bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent z-100 isolate">
          <div className="overflow-hidden absolute left-10 bottom-10 z-100">
            <h1
              className="text-[12vw] font-bold mb-3 leading-[1] z-100"
              id="heading"
            >
              {person}
            </h1>
          </div>
        </div>
        <div className="overflow-hidden absolute left-0 top-0 w-full h-full grid place-content-center z-10">
          <p className="text-4xl w-fit" id="award">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AwardDescription;
