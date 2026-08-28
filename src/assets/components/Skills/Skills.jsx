import useScrollReveal from "../../hooks/useScrollReveal";
import "./Skills.css";

const SKILLS = [
    {
        label: "Frontend",
        value: 90,
        children: ["React", "JavaScript", "CSS3"],
    },
    {
        label: "Backend",
        value: 80,
        children: ["Node.js", "Express"],
    },
    {
        label: "DevOps",
        value: 60,
        children: ["Docker", "AWS"],
    },
    {
        label: "Database",
        value: 70,
        children: ["MongoDB", "PostgreSQL", "Supabase"],
    },
    {
        label: "UI / UX",
        value: 75,
        children: ["Figma", "Tailwind"],
    },
    {
        label: "Tools",
        value: 85,
        children: ["Git", "VS Code"],
    },
];

const SIZE = 620;
const CENTER = SIZE / 2;
const MAX_RADIUS = 130; // radar polygon radius
const NODE_RADIUS = 165; // category node ring
const CHILD_RADIUS = 250; // child tech node ring
const RINGS = [0.33, 0.66, 1];

function toXY(angle, radius) {
    return {
        x: CENTER + radius * Math.cos(angle),
        y: CENTER + radius * Math.sin(angle),
    };
}

function axisAngle(index, total) {
    return (Math.PI * 2 * index) / total - Math.PI / 2;
}

// spread children around their category's angle
function childAngle(catIndex, total, childIndex, childCount) {
    const base = axisAngle(catIndex, total);
    const spread = 0.34; // radians between siblings
    const start = -((childCount - 1) / 2) * spread;
    return base + start + childIndex * spread;
}

export default function Skills() {
    const [ref, isVisible] = useScrollReveal();
    const total = SKILLS.length;

    const dataPoints = SKILLS.map((s, i) =>
        toXY(axisAngle(i, total), (s.value / 100) * MAX_RADIUS)
    );
    const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

    return (
        <section id="skills" className="skills">
            <div
                ref={ref}
                className={`skills__inner ${isVisible ? "skills__inner--visible" : ""}`}
            >
                <p className="skills__eyebrow">// Skills</p>
                <h2 className="skills__heading">System Readout</h2>

                <div className="skills__chart-wrap">
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="skills__chart">
                        <defs>
                            <filter id="skillGlow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* concentric grid rings */}
                        {RINGS.map((ring) => {
                            const ringPoints = SKILLS.map((_, i) =>
                                toXY(axisAngle(i, total), ring * MAX_RADIUS)
                            )
                                .map((p) => `${p.x},${p.y}`)
                                .join(" ");
                            return (
                                <polygon key={ring} points={ringPoints} className="skills__grid-ring" />
                            );
                        })}

                        {/* axis lines from center to category nodes */}
                        {SKILLS.map((_, i) => {
                            const outer = toXY(axisAngle(i, total), NODE_RADIUS);
                            return (
                                <line
                                    key={i}
                                    x1={CENTER}
                                    y1={CENTER}
                                    x2={outer.x}
                                    y2={outer.y}
                                    className="skills__axis-line"
                                />
                            );
                        })}

                        {/* skill-level data polygon */}
                        <polygon
                            points={polygonPoints}
                            className={`skills__data-polygon ${isVisible ? "skills__data-polygon--visible" : ""
                                }`}
                            filter="url(#skillGlow)"
                        />

                        {/* branch lines: category node -> each child tech node */}
                        {SKILLS.map((skill, i) => {
                            const catPoint = toXY(axisAngle(i, total), NODE_RADIUS);
                            return skill.children.map((child, ci) => {
                                const angle = childAngle(i, total, ci, skill.children.length);
                                const childPoint = toXY(angle, CHILD_RADIUS);
                                return (
                                    <line
                                        key={`${skill.label}-${child}`}
                                        x1={catPoint.x}
                                        y1={catPoint.y}
                                        x2={childPoint.x}
                                        y2={childPoint.y}
                                        className={`skills__branch-line ${isVisible ? "skills__branch-line--visible" : ""
                                            }`}
                                        style={{ transitionDelay: `${0.7 + i * 0.1 + ci * 0.06}s` }}
                                    />
                                );
                            });
                        })}

                        {/* category nodes + labels */}
                        {SKILLS.map((skill, i) => {
                            const p = toXY(axisAngle(i, total), NODE_RADIUS);
                            return (
                                <g
                                    key={skill.label}
                                    className={`skills__cat-node ${isVisible ? "skills__cat-node--visible" : ""
                                        }`}
                                    style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
                                >
                                    <circle cx={p.x} cy={p.y} r="6" className="skills__cat-dot" />
                                    <text
                                        x={p.x}
                                        y={p.y - 14}
                                        textAnchor="middle"
                                        className="skills__cat-label"
                                    >
                                        {skill.label}
                                    </text>
                                </g>
                            );
                        })}

                        {/* child tech nodes */}
                        {SKILLS.map((skill, i) =>
                            skill.children.map((child, ci) => {
                                const angle = childAngle(i, total, ci, skill.children.length);
                                const p = toXY(angle, CHILD_RADIUS);
                                return (
                                    <g
                                        key={`${skill.label}-node-${child}`}
                                        className={`skills__child-node ${isVisible ? "skills__child-node--visible" : ""
                                            }`}
                                        style={{
                                            transitionDelay: `${0.8 + i * 0.1 + ci * 0.06}s`,
                                        }}
                                    >
                                        <circle cx={p.x} cy={p.y} r="3.5" className="skills__child-dot" />
                                        <text
                                            x={p.x}
                                            y={p.y + (p.y > CENTER ? 18 : -12)}
                                            textAnchor="middle"
                                            className="skills__child-label"
                                        >
                                            {child}
                                        </text>
                                    </g>
                                );
                            })
                        )}
                    </svg>
                    <div className="skills__chart-wrap">
                        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="skills__chart">
                            {/* ...all your existing SVG content stays exactly as-is... */}
                        </svg>

                        {/* mobile fallback — same SKILLS data, vertical list layout */}
                        <div className="skills__mobile-list">
                            {SKILLS.map((skill, i) => (
                                <div
                                    className={`skills__mobile-item ${isVisible ? "skills__mobile-item--visible" : ""
                                        }`}
                                    key={skill.label}
                                    style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
                                >
                                    <div className="skills__mobile-header">
                                        <span className="skills__mobile-dot" />
                                        <span className="skills__mobile-cat">{skill.label}</span>
                                    </div>
                                    <div className="skills__mobile-tech">
                                        {skill.children.map((child) => (
                                            <span className="skills__mobile-pill" key={child}>
                                                {child}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}