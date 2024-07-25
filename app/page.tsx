"use client";

import AwardDescription from "@/components/AwardDescription";

export default function Home() {
  return (
    <main className="h-dvh w-full">
      <video
        className="fixed h-dvh w-full object-cover"
        autoPlay
        controls={false}
        loop
        muted
      >
        <source src="videos/background.mp4" type="video/mp4" />
      </video>
      <video
        className="fixed h-dvh w-1/2 object-cover left-0"
        autoPlay
        controls={false}
        loop
        muted
      >
        <source src="videos/foreground.webm" type="video/webm" />
      </video>
      <AwardDescription
        person="Roman Schacherl"
        title="Früher Vogel des Monats"
        state="active"
      />
    </main>
  );
}
