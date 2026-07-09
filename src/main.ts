import "./style.css";
import { initTheme } from "./theme";
import { initNavigation } from "./navigation";
import { initRevealAnimations } from "./animations";
import { initProjects, filterProjects } from "./projects";
import { initContactForm } from "./contact";
import { initGreeting } from "./greeting";
import { initWorkProjects } from "./work";
import { initServices } from "./services";
import { initTools } from "./tools";

(window as unknown as Record<string, unknown>).filterProjects = filterProjects;

function init(): void {
    initTheme();
    initNavigation();
    initRevealAnimations();
    initProjects();
    initWorkProjects();
    initContactForm();
    initGreeting();
    initServices();
    initTools();

    const hero = document.querySelector('.hero');
    const navPillCta = document.querySelector('.nav-pill-cta');

    if (hero && navPillCta) {
        const handleScroll = () => {
            const heroBottom = hero.getBoundingClientRect().bottom;
            if (heroBottom < 0) {
                navPillCta.classList.add('visible');
            } else {
                navPillCta.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}