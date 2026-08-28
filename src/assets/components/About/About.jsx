import { useRef, useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import profile_photo from "../../profile_photo.jpeg";
import "./About.css";

const ACHIEVEMENTS = [
    {
        id: "vibe-criminals",
        place: "8th",
        label: "VibeCriminals Hackathon",
        highlight: true,
    },
    {
        id: "hack4humanity",
        place: "4th",
        label: "HACK4HUMANITY 2026",
        highlight: true,
    },
    {
        id: "samved",
        place: "Finalist",
        label: "SAMVED — Smart Governance Hackathon, MIT Solapur",
        highlight: true,
    },
];

export default function About() {
    const [ref, isVisible] = useScrollReveal();
    const frameRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        const frame = frameRef.current;
        if (!frame) return;
        const rect = frame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setTilt({
            x: ((y - centerY) / centerY) * -10,
            y: ((x - centerX) / centerX) * 10,
        });
        setCursorPos({ x, y });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setIsHovering(false);
    };

    return (
        <section id="about" className="about">
            <div
                ref={ref}
                className={`about__inner ${isVisible ? "about__inner--visible" : ""}`}
            >
                <div className="about__top">
                    <div className="about__bio">
                        <p className="about__eyebrow">// About Me</p>
                        <h2 className="about__heading">Who I Am</h2>
                        <p className="about__text">
                            I'm a full-stack developer and AI/ML enthusiast, currently learning to
                            build and train models alongside crafting web applications end to end.
                            I like understanding how things work under the hood — whether that's a
                            neural network or a REST API — and enjoy turning that understanding
                            into something functional. Problem-solving is a big part of what draws
                            me to this field, and my internships have given me real exposure to how
                            software actually gets built in the real world.
                        </p>
                        <p className="about__text">
                            I genuinely enjoy working in a team — whether it's brainstorming at a
                            hackathon, pairing on a tricky bug, or just being part of a tech
                            community. Some of my best ideas come from bouncing thoughts off other
                            people, which is why you'll usually find me at meetups, clubs, or
                            student tech events, not just behind a screen.
                        </p>

                        <div className="about__status">
                            <span className="about__status-dot" />
                            Currently open to work
                        </div>
                    </div>

                    <div
                        ref={frameRef}
                        className="about__photo-frame"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        }}
                    >
                        <img
                            src={profile_photo}
                            alt="Pavitra Boga"
                            className="about__photo"
                        />
                        <span className="about__corner about__corner--tl" />
                        <span className="about__corner about__corner--tr" />
                        <span className="about__corner about__corner--bl" />
                        <span className="about__corner about__corner--br" />

                        {isHovering && (
                            <div
                                className="about__cursor-label"
                                style={{ left: cursorPos.x, top: cursorPos.y }}
                            >
                                Pavitra Boga
                            </div>
                        )}
                    </div>
                </div>

                <div className="about__achievements">
                    <p className="about__achievements-label">// Hackathon Track Record</p>
                    <div className="about__achievements-grid">
                        {ACHIEVEMENTS.map((a, i) => (
                            <div
                                className={`about__achievement-card ${a.highlight ? "about__achievement-card--placed" : ""
                                    }`}
                                key={a.id}
                                style={{ transitionDelay: `${0.2 + i * 0.12}s` }}
                            >
                                <span className="about__achievement-place">{a.place}</span>
                                <span className="about__achievement-label">{a.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}