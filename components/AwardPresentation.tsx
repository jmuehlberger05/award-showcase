"use client";

import React, { useEffect } from "react";
import AwardSlideContainer from "./AwardSlideContainer";

export type AwardDataDTO = {
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

function AwardPresentation({ dataURL }: { dataURL: string }) {
  const [data, setData] = React.useState<AwardDataDTO[]>([]);
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
        <AwardSlideContainer
          key={item.achievementID}
          data={item}
          animationState={animationState}
        />
      ))}
    </div>
  );
}

export default AwardPresentation;
