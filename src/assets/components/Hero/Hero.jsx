import { useEffect, useRef, useState } from "react";
import "./Hero.css";

const NAME = "PAVITRA BOGA";
const ROLE = "Full-Stack Developer & AI/ML Enthusiast";
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________";

const LINES = [
    { prompt: "status --check", output: "Available for new opportunities ✓" },
    { prompt: "open resume.pdf", output: "Opening... done." },
    { prompt: "cat mission.txt", output: "Crafting fast, functional, and future-facing web experiences." },
];

const MAX_VISIBLE_LINES = 2;

export default function Hero() {
    const [displayName, setDisplayName] = useState("");
    const [decodeDone, setDecodeDone] = useState(false);
    const frameRef = useRef(0);

    // scramble-decode the name on mount
    useEffect(() => {
        let iteration = 0;
        const totalIterations = NAME.length * 3;

        const interval = setInterval(() => {
            setDisplayName(
                NAME.split("")
                    .map((char, i) => {
                        if (char === " ") return " ";
                        const revealPoint = i * 3;
                        if (iteration >= revealPoint + 6) return char;
                        if (iteration >= revealPoint) {
                            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                        }
                        return "";
                    })
                    .join("")
            );

            iteration++;
            if (iteration > totalIterations) {
                clearInterval(interval);
                setDisplayName(NAME);
                setDecodeDone(true);
            }
        }, 40);

        return () => clearInterval(interval);
    }, []);

    // periodic glitch burst after decode finishes
    const [glitching, setGlitching] = useState(false);
    useEffect(() => {
        if (!decodeDone) return;
        const trigger = () => {
            setGlitching(true);
            setTimeout(() => setGlitching(false), 220);
        };
        const timeout = setTimeout(trigger, 1800);
        const loop = setInterval(trigger, 4500);
        return () => {
            clearTimeout(timeout);
            clearInterval(loop);
        };
    }, [decodeDone]);

    // --- small supporting terminal, looping ---
    const [visibleLines, setVisibleLines] = useState([]);
    const [typedPrompt, setTypedPrompt] = useState("");
    const [typedOutput, setTypedOutput] = useState("");
    const [phase, setPhase] = useState("prompt");
    const [lineIndex, setLineIndex] = useState(0);

    useEffect(() => {
        const current = LINES[lineIndex % LINES.length];
        const target = phase === "prompt" ? current.prompt : current.output;
        const typed = phase === "prompt" ? typedPrompt : typedOutput;

        if (typed.length < target.length) {
            const t = setTimeout(() => {
                const next = target.slice(0, typed.length + 1);
                phase === "prompt" ? setTypedPrompt(next) : setTypedOutput(next);
            }, phase === "prompt" ? 45 : 16);
            return () => clearTimeout(t);
        }

        const pause = setTimeout(() => {
            if (phase === "prompt") {
                setPhase("output");
            } else {
                setVisibleLines((prev) => {
                    const next = [...prev, current];
                    return next.length > MAX_VISIBLE_LINES
                        ? next.slice(next.length - MAX_VISIBLE_LINES)
                        : next;
                });
                setTypedPrompt("");
                setTypedOutput("");
                setPhase("prompt");
                setLineIndex((i) => i + 1);
            }
        }, phase === "prompt" ? 250 : 800);
        return () => clearTimeout(pause);
    }, [typedPrompt, typedOutput, phase, lineIndex]);

    const scrollToNext = () => {
        const about = document.getElementById("about");
        if (about) about.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section id="home" className="hero">
            <div className="hero__center">
                <p className="hero__eyebrow">// Welcome to my portfolio</p>

                <h1 className={`hero__name ${glitching ? "hero__name--glitch" : ""}`}>
                    <span className="hero__name-main" data-text={displayName}>
                        {displayName || "\u00A0"}
                    </span>
                </h1>

                <p className={`hero__role ${decodeDone ? "hero__role--visible" : ""}`}>
                    {ROLE}
                </p>

                <div className="hero__mini-terminal">
                    <div className="hero__mini-bar">
                        <span className="hero__dot hero__dot--red" />
                        <span className="hero__dot hero__dot--yellow" />
                        <span className="hero__dot hero__dot--green" />
                        <span className="hero__mini-title">pavitra@portfolio: ~</span>
                    </div>
                    <div className="hero__mini-body">
                        {visibleLines.map((line, i) => (
                            <div className="hero__mini-line" key={`${line.prompt}-${i}`}>
                                <p className="hero__mini-prompt">
                                    <span className="hero__prompt-symbol">$</span> {line.prompt}
                                </p>
                                <p className="hero__mini-output">{line.output}</p>
                            </div>
                        ))}
                        <div className="hero__mini-line">
                            <p className="hero__mini-prompt">
                                <span className="hero__prompt-symbol">$</span> {typedPrompt}
                                {phase === "prompt" && <span className="hero__cursor" />}
                            </p>
                            {phase === "output" && (
                                <p className="hero__mini-output">
                                    {typedOutput}
                                    <span className="hero__cursor" />
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="hero__scroll-btn"
                onClick={scrollToNext}
                aria-label="Scroll to next section"
            >
                <svg viewBox="0 0 24 24" className="hero__chevron hero__chevron--1">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg viewBox="0 0 24 24" className="hero__chevron hero__chevron--2">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </section>
    );
}