import useScrollReveal from "../../hooks/useScrollReveal";
import "./Contact.css";

const EMAIL = "pavitrab2707@gmail.com";

export default function Contact() {
    const [ref, isVisible] = useScrollReveal();

    return (
        <section id="contact" className="contact">
            <div
                ref={ref}
                className={`contact__inner ${isVisible ? "contact__inner--visible" : ""
                    }`}
            >
                <p className="contact__eyebrow">// Contact</p>
                <h2 className="contact__heading">Get In Touch</h2>
                <p className="contact__desc">
                    Whether it’s an opportunity, collaboration, or simply a hello — <br /> I’d love to hear from you.
                </p>

                <a href={`mailto:${EMAIL}`} className="contact__cta">
                    Say Hello
                </a>
            </div>
        </section>
    );
}