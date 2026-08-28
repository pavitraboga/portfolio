import { useEffect, useRef, useState } from "react";
import "./Navbar.css";

const NAV_ITEMS = [
    "Home",
    "About",
    "Projects",
    "Skills",
    "Experience",
    "Contact",
];

export default function Navbar() {
    const [active, setActive] = useState("Home");
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);
    const linkRefs = useRef({});
    const listRef = useRef(null);

    useEffect(() => {
        const activeEl = linkRefs.current[active];
        const listEl = listRef.current;
        if (activeEl && listEl && window.innerWidth > 768) {
            const listRect = listEl.getBoundingClientRect();
            const linkRect = activeEl.getBoundingClientRect();
            setIndicatorStyle({
                width: linkRect.width,
                transform: `translateX(${linkRect.left - listRect.left}px)`,
            });
        }
    }, [active, menuOpen]);

    useEffect(() => {
        const sections = NAV_ITEMS.map((item) =>
            document.getElementById(item.toLowerCase())
        ).filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const match = NAV_ITEMS.find(
                            (item) => item.toLowerCase() === entry.target.id
                        );
                        if (match) setActive(match);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const handleClick = (e, item) => {
        e.preventDefault();
        setActive(item);
        setMenuOpen(false);
        const el = document.getElementById(item.toLowerCase());
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav className={`navbar ${menuOpen ? "navbar--open" : ""}`}>
            <div className="navbar__bar">
                <span className="navbar__brand"></span>

                <button
                    className="navbar__toggle"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span className="navbar__toggle-line" />
                    <span className="navbar__toggle-line" />
                    <span className="navbar__toggle-line" />
                </button>
            </div>

            <ul
                className={`navbar__list ${menuOpen ? "navbar__list--open" : ""}`}
                ref={listRef}
            >
                <li className="navbar__indicator" style={indicatorStyle} />
                {NAV_ITEMS.map((item) => (
                    <li key={item}>
                        <a ref={(el) => (linkRefs.current[item] = el)}
                            href={`#${item.toLowerCase()}`}
                            className={`navbar__link ${active === item ? "navbar__link--active" : ""
                                }`}
                            onClick={(e) => handleClick(e, item)}
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </nav >
    );
}