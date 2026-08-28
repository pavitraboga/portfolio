// src/App.jsx
import { useState } from "react";
import Navbar from "./assets/components/Navbar/Navbar";
import Loader from "./assets/components/Loader/Loader";
import SocialRail from "./assets/components/SocialRail";
import EmailRail from "./assets/components/EmailRail";
import "./assets/components/Rails.css";
import Hero from "./assets/components/Hero/Hero";
import About from "./assets/components/About/About";
import Projects from "./assets/components/Projects/Projects";
import Skills from "./assets/components/Skills/Skills";
import Experience from "./assets/components/Experience/Experience";
import Contact from "./assets/components/Contact/Contact";
import "./App.css";
import FaultyTerminal from "./assets/components/FaultyTerminal";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* {loading && <Loader onComplete={() => setLoading(false)} />} */}

      <div className="terminal-bg">
        <FaultyTerminal
          scale={2}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.4}
          scanlineIntensity={0.5}
          glitchAmount={0.6}
          flickerAmount={0.6}
          noiseAmp={1.8}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#00fff2"
          mouseReact={true}
          mouseStrength={0.3}
          pageLoadAnimation={true}
          brightness={0.3}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <Navbar />
      <SocialRail />
      <EmailRail />

      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}

export default App;