import { useEffect, useRef, useState } from "react";

export default function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el); // animate in once, don't repeat on scroll up/down
                }
            },
            {
                threshold: 0.2, // fires once ~20% of the section is visible
                ...options,
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [options]);

    return [ref, isVisible];
}