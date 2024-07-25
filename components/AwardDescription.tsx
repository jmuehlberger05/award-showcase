"use client";

import gsap from "gsap";
import React, { useEffect } from "react";
import SplitType from "split-type";

interface AwardDescriptionProps {
  title: string;
  person: string;
  state: "nextInLine" | "active" | "inactive";
}

function AwardDescription({ title, person, state }: AwardDescriptionProps) {
  useEffect(() => {
    const title = SplitType.create("#title");
    const person = SplitType.create("#person");
  }, []);

  useEffect(() => {
    var tl = gsap.timeline({
      repeat: -1,
    });

    tl.fromTo(
      "#title .word",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power4.out",
        stagger: 0.1,
      }
    );

    tl.fromTo(
      "#person .word",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power4.out",
        stagger: 0.1,
      }
    );

    tl.fromTo(
      "#title .word",
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
      "#person .word",
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

    // const animate = () => {
    //   gsap.fromTo(
    //     "#title .word",
    //     {
    //       opacity: 0,
    //       y: 100,
    //     },
    //     {
    //       opacity: 1,
    //       y: 0,
    //       ease: "power4.out",
    //       stagger: 0.1,
    //     }
    //   );

    //   gsap.fromTo(
    //     "#person .word",
    //     {
    //       opacity: 0,
    //       y: 100,
    //     },
    //     {
    //       delay: 0.4,
    //       opacity: 1,
    //       y: 0,
    //       ease: "power4.out",
    //       stagger: 0.1,
    //     }
    //   );
    // };

    // tl.start;

    // animate();

    // setInterval(() => {
    //   animate();
    // }, 5000);
  }, []);

  return (
    <div>
      <div className="fixed top-[50dvh] bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
        <div className="absolute left-10 bottom-10 z-100 text-white">
          <h1 className="text-4xl font-bold mb-3 " id="title">
            {title}
          </h1>
          <p className="text-4xl" id="person">
            {person}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AwardDescription;
