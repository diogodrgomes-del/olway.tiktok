import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WelcomeSection } from "./components/WelcomeSection";
import { BrandPositioning } from "./components/BrandPositioning";
import { StrategyPillars } from "./components/StrategyPillars";
import { ContentIdeas } from "./components/ContentIdeas";
import { VideoLibrary } from "./components/VideoLibrary";
import { InteractiveChecklist } from "./components/InteractiveChecklist";
import { FinalCTA, Footer } from "./components/FinalCTA";
import { Marquee } from "./components/Marquee";
import { Splash } from "./components/Splash";
import { splash } from "./data/content";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!showSplash) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setShowSplash(false), splash.durationMs);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  return (
    <>
      <AnimatePresence>
        {showSplash && <Splash duration={splash.durationMs} onSkip={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* o site monta quando a abertura termina, para as animações do topo começarem visíveis */}
      {!showSplash && (
        <>
          <Header />
          <main>
            <Hero />
            <Marquee />
            <WelcomeSection />
            <BrandPositioning />
            <StrategyPillars />
            <ContentIdeas />
            <VideoLibrary />
            <InteractiveChecklist />
            <Marquee inverted />
            <FinalCTA />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
