import { PROJECTS } from "./projects";
import type { Project } from "./types";

function renderWorkCard(project: Project): string {
    const thumbContent = project.image
        ? `<img src="${project.image}" alt="${project.name}" class="work-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
           <div class="proj-image-placeholder" style="display:none;align-items:center;justify-content:center;">
             <div class="proj-initial">${project.name.charAt(0)}</div>
           </div>`
        : `<div class="proj-image-placeholder">
             <div class="proj-initial">${project.name.charAt(0)}</div>
           </div>`;

    const isProjectsPage = window.location.pathname.includes("projects.html");
    const action = isProjectsPage
        ? `window.location.href='index.html#case-${project.id}'`
        : `window.__openCase('${project.id}')`;

    return `
        <div class="work-card reveal" data-cat="${project.category}" onclick="${action}">
            <div class="work-card-thumb">
                <div class="work-card-thumb-inner">
                    ${thumbContent}
                </div>
            </div>
            <div class="work-card-body">
                <h3 class="work-card-title">${project.name}</h3>
                <p class="work-card-desc">${project.description}</p>
                <button class="btn-outline work-card-btn" onclick="event.stopPropagation();${action}">
                    View Project
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
            </div>
        </div>
    `;
}

export function initWorkProjects(): void {
    const grid = document.getElementById("workGrid");
    if (!grid) {
        console.log("workGrid not found!");
        return;
    }

    grid.innerHTML = PROJECTS.map(renderWorkCard).join("");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1 }
    );
    grid.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}