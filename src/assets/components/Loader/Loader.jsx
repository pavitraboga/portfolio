import { useEffect, useState } from "react";
import "./Loader.css";

const BOOT_LINES = [
  "Initializing system...",
  "Loading assets...",
  "Establishing connection...",
  "Ready.",
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const step = Math.floor((progress / 100) * (BOOT_LINES.length - 1));
    setLineIndex(step);

    if (progress >= 100) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 300);
      const doneTimer = setTimeout(() => onComplete(), 900);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(doneTimer);
      };
    }
  }, [progress, onComplete]);

  return (
    <div className={`loader ${fadeOut ? "loader--fade" : ""}`}>
      <div className="loader__content">
        <div className="loader__logo">PB</div>

        <div className="loader__bar-track">
          <div
            className="loader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loader__status">
          <span className="loader__status-text">{BOOT_LINES[lineIndex]}</span>
          <span className="loader__percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
}