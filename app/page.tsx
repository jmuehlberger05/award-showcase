import HeroPresentation from "@/components/HeroPresentation";
import { DATA_URL } from "./lib/constants";

export default function Home() {
  return (
    <main>
      <HeroPresentation dataURL={DATA_URL} />
    </main>
  );
}
