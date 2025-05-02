import HeroPresentation from "@/components/HeroPresentation";

export default function Home() {
  return (
    <main>
      <HeroPresentation dataURL={process.env.HERO_DATA_URL!} />
    </main>
  );
}
