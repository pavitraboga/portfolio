import useScrollReveal from "../../hooks/useScrollReveal";
import "./Experience.css";

const EXPERIENCE = [
    {
        id: "rv-techlearn",
        role: "Web Developer Intern",
        org: "RV TechLearn",
        location: "Remote",
        period: "Jul 2025 — Jan 2026",
        description:
            "Worked as a Web Development Intern, building and maintaining web applications and collaborating with the team on live projects.",
    },
    {
        id: "iete",
        role: "Web Development Volunteer",
        org: "IETE Students' Chapter, SIES GST",
        location: "Navi Mumbai, India",
        period: "Jul 2025 — Jul 2026",
        description:
            "Volunteering to build and maintain web presence for the student chapter, supporting events and technical initiatives.",
    },
];

export default function Experience() {
    const [ref, isVisible] = useScrollReveal();

    return (
        <section id="experience" className="experience">
            <div
                ref={ref}
                className={`experience__inner ${isVisible ? "experience__inner--visible" : ""
                    }`}
            >
                <p className="experience__eyebrow">// Experience</p>
                <h2 className="experience__heading">Where I've Worked</h2>

                <div className="experience__timeline">
                    <div className="experience__line" />

                    {EXPERIENCE.map((item, i) => (
                        <div
                            className={`experience__item ${i % 2 === 0 ? "experience__item--top" : "experience__item--bottom"
                                }`}
                            key={item.id}
                            style={{ transitionDelay: `${i * 0.2}s` }}
                        >
                            <div className="experience__card">
                                <span className="experience__period">{item.period}</span>
                                <h3 className="experience__role">{item.role}</h3>
                                <p className="experience__org">{item.org}</p>
                                <p className="experience__location">{item.location}</p>
                                <p className="experience__desc">{item.description}</p>
                            </div>

                            <div className="experience__connector" />
                            <div className="experience__node">
                                <span className="experience__node-dot" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}