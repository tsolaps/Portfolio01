import { initWorkProjects } from "./work";
import { filterProjects } from "./projects";
import { initRevealAnimations } from "./animations";

(window as unknown as Record<string, unknown>).filterProjects = filterProjects;

function init(): void {
    initRevealAnimations();
    initWorkProjects();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
