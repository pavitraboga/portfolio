import { useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Projects.css";

const PROJECTS = [
    {
        id: "accesshire",
        name: "AccessHire",
        summary: "Accessibility-first hiring platform for Persons with Disabilities.",
        description:
            "An accessibility-first hiring platform for Persons with Disabilities, featuring High Contrast Mode, Voice Search, Read Aloud, role-based dashboards, and skill training modules — built with Firebase for secure, scalable authentication and data handling.",
        tech: ["Firebase", "JavaScript", "HTML/CSS", "ChromeVox", "ARIA"],
        live: "https://access-hire-wine.vercel.app/",
        github: "https://github.com/pavitraboga/AccessHire",
    },
    {
        id: "vyuha-ai",
        name: "VYUHA.AI",
        summary: "AI-powered vulnerability prioritization and hardening assistant.",
        description:
            "A vulnerability and yield-driven unified hardening assistant that fuses NVD, CISA KEV, EPSS, and OSV threat intelligence with Nmap/OpenVAS scan data into a Hybrid Risk Score, maps attack paths, and uses a RAG-powered AI Security Copilot to explain findings and recommend evidence-backed fixes.",
        tech: ["Python", "Streamlit", "LangChain", "FAISS", "Groq (Llama 3)"],
        live: "https://vyuha-ai-virid.vercel.app/",
        github: "https://github.com/Akshu121796/VYUHA-AI",
    },
    {
        id: "fire-gas-detector",
        name: "IoT Fire & Gas Detector",
        summary: "Real-time IoT gas leak and fire detection with SMS + cloud alerts.",
        description:
            "A real-time IoT safety system that detects gas leaks and fire using MQ-5 and flame sensors, triggers a local alarm and LCD warning, sends instant SMS alerts via GSM, and streams live sensor data to a ThingSpeak cloud dashboard for remote monitoring.",
        tech: ["Arduino UNO", "ESP32", "GSM", "ThingSpeak", "Arduino C++"],
        live: null,
        github: "https://github.com/pavitraboga/IOT-Based-Fire-and-Gas-Detector",
    },
];

export default function Projects() {
    const [ref, isVisible] = useScrollReveal();
    const [modalProject, setModalProject] = useState(null);

    return (
        <section id="projects" className="projects">
            <div
                ref={ref}
                className={`projects__inner ${isVisible ? "projects__inner--visible" : ""
                    }`}
            >
                <p className="projects__eyebrow">// Projects</p>
                <h2 className="projects__heading">What I've Built</h2>

                <div className="projects__grid">
                    {PROJECTS.map((project, i) => (
                        <div
                            className="projects__card"
                            key={project.id}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <span className="projects__corner projects__corner--tl" />
                            <span className="projects__corner projects__corner--tr" />
                            <span className="projects__corner projects__corner--bl" />
                            <span className="projects__corner projects__corner--br" />

                            <div className="projects__card-header">
                                <span className="projects__card-index">
                                    0{i + 1}
                                </span>
                                <h3 className="projects__card-title">{project.name}</h3>
                            </div>

                            <p className="projects__card-desc">{project.summary}</p>

                            <div className="projects__tech-list">
                                {project.tech.map((t) => (
                                    <span className="projects__tech-pill" key={t}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="projects__card-actions">
                                {project.live && (

                                    <a href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="projects__action-btn"
                                    >
                                        Live Demo
                                    </a>
                                )}

                                <a href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="projects__action-btn projects__action-btn--ghost"
                                >
                                    GitHub
                                </a>
                                <button
                                    className="projects__action-btn projects__action-btn--ghost"
                                    onClick={() => setModalProject(project)}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {
                modalProject && (
                    <div
                        className="projects__modal-overlay"
                        onClick={() => setModalProject(null)}
                    >
                        <div
                            className="projects__modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="projects__modal-close"
                                onClick={() => setModalProject(null)}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <p className="projects__eyebrow">// Project Details</p>
                            <h3 className="projects__modal-title">{modalProject.name}</h3>
                            <p className="projects__modal-desc">{modalProject.description}</p>

                            <div className="projects__tech-list">
                                {modalProject.tech.map((t) => (
                                    <span className="projects__tech-pill" key={t}>
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="projects__card-actions">
                                {modalProject.live && (

                                    <a href={modalProject.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="projects__action-btn"
                                    >
                                        Live Demo
                                    </a>
                                )}

                                <a href={modalProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="projects__action-btn projects__action-btn--ghost"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                )
            }
        </section >
    );
}