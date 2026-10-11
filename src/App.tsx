import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WelcomeSection } from "./components/WelcomeSection";
import { BrandPositioning } from "./components/BrandPositioning";
import { StrategyPillars } from "./components/StrategyPillars";
import { ContentIdeas } from "./components/ContentIdeas";
import { VideoLibrary } from "./components/VideoLibrary";
import { InteractiveChecklist } from "./components/InteractiveChecklist";
import { FinalCTA, Footer } from "./components/FinalCTA";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WelcomeSection />
        <BrandPositioning />
        <StrategyPillars />
        <ContentIdeas />
        <VideoLibrary />
        <InteractiveChecklist />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
