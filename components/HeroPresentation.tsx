"use client";

import React, { useEffect } from "react";
import HeroSlideContainer from "./HeroSlideContainer";

export type HeroDataDTO = {
  id: number;
  name: string;
  video: string;
  achievementID: number;
  achievementTitle: string;
  achievementVideo: string;
  details: {
    title: string;
  };
};

export type AnimationState = "nextInLine" | "active" | "inactive";

function HeroPresentation({ dataURL }: { dataURL: string }) {
  const [data, setData] = React.useState<HeroDataDTO[]>([]);
  const animationState: AnimationState = "active";

  useEffect(() => {
    fetch(dataURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [dataURL]);

  return (
    <div>
      {data.map((item) => (
        <HeroSlideContainer
          key={item.achievementID}
          data={item}
          animationState={animationState}
        />
      ))}
    </div>
  );
}

export default HeroPresentation;
