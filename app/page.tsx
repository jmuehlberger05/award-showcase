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
      <div className="fixed top-[50dvh] bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
        <div className="absolute left-10 bottom-10 z-100 text-white">
          <h1 className="text-2xl font-bold ">Früher Vogel des Monats</h1>
          <p className="text-2xl ">Roman Schacherl</p>
        </div>
      </div>
    </main>
  );
}
