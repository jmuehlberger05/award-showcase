"use client";

import React from "react";

interface SlideUpDescriptionProps {
  title: DescriptionElement;
  hero: DescriptionElement;
  details: DescriptionElement;
}

type DescriptionElement = {
  text: string;
  id: string;
};

function SlideUpDescription({ title, hero, details }: SlideUpDescriptionProps) {
  return (
    <div>
      <div className="absolute inset-0 text-white z-100">
        <div className="absolute top-[50dvh] bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent z-100 isolate">
          <div className="overflow-hidden absolute left-10 bottom-10 z-100">
            <h1
              className="text-[12vw] font-bold mb-3 leading-[1] z-100"
              id={hero.id}
            >
              {hero.text}
            </h1>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-full h-full grid place-content-center z-10">
          <div className="overflow-hidden">
            <p className="text-[5vw] w-fit" id={title.id}>
              {title.text}
            </p>
          </div>
        </div>
        <div className="absolute right-10 bottom-14 z-10">
          <div className="overflow-hidden">
            <p className="text-[2vw] w-fit" id={details.id}>
              {details.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideUpDescription;
