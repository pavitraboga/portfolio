export default function SocialRail() {
    return (
        <div className="social-rail">
            <div className="social-rail__icons">

                <a href="https://github.com/itspb-ux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-rail__icon"
                    aria-label="GitHub"
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.07.78 2.16v3.2c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                    </svg>
                    <span className="social-rail__tooltip">GitHub</span>
                </a>


                <a href="https://www.linkedin.com/in/pavitra-boga-047781334/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-rail__icon"
                    aria-label="LinkedIn"
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                    </svg>
                    <span className="social-rail__tooltip">LinkedIn</span>
                </a>


                <a href="mailto:pavitrab2707@gmail.com"
                    className="social-rail__icon"
                    aria-label="Email"
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm19.4 2.6-9.4 6.6-9.4-6.6V19h18.8V6.6ZM3.8 5 12 10.8 20.2 5H3.8Z" />
                    </svg>
                    <span className="social-rail__tooltip">Email</span>
                </a>


                <a href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-rail__icon"
                    aria-label="Download Resume"
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1ZM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
                    </svg>
                    <span className="social-rail__tooltip">Resume</span>
                </a>
            </div>
            <div className="social-rail__line" />
        </div>
    );
}