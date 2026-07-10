import type { Project } from "./types";

export const PROJECTS: Project[] = [
    {
        id: "grahamwali",
        name: "Graham Wali Dental",
        description:
            "Full web presence for a Port Harcourt dental practice. Scroll animations, responsive design.",
        category: "dev",
        type: "Landing Page",
        tags: ["HTML/CSS", "JS"],
        featured: true,
        image: "grahamwali.png",
        caseStudy: {
            eyebrow: "Landing Page",
            title: "Graham Wali Dental",
            body: "Full website build for a dental clinic in PH.",
            visitUrl: "https://grahamwali.pxxl.click",
        },
    },
    {
        id: "finora",
        name: "Finora",
        description:
            "Conversational AI financial tool for Nigeria. Speaks naira, informal income patterns.",
        category: "product dev",
        type: "Fintech",
        tags: ["FastAPI", "Mono API"],
        featured: false,
        image: "finora.png",
        caseStudy: {
            eyebrow: "Fintech AI",
            title: "Finora",
            body: "Conversational finance assistant for Nigeria.",
            visitUrl: "https://finora.pxxl.pro",
        },
    },
    {
        id: "voltstore",
        name: "Blipit",
        description:
            "Find, book, and pay for advertising spaces online. Billboards, screens, venues, and more.",
        category: "product dev",
        type: "Web App",
        tags: ["Next.js", "React.js", "PostgreSQL", "TypeScript"],
        featured: false,
        image: "blipit.png",
        caseStudy: {
            eyebrow: "Web App",
            title: "Blipit",
            body: "Platform for booking and paying for advertising spaces online.",
        },
    },
    {
        id: "brand",
        name: "Brand Identity Work",
        description:
            "Visual identity systems, logos, colour systems for startups.",
        category: "brand",
        type: "Brand Identity",
        tags: ["Figma", "Illustrator"],
        featured: true,
        image: "suimart.png",
        caseStudy: {
            eyebrow: "Brand Identity",
            title: "Visual Identity Work",
            body: "Logos, systems, guidelines.",
        },
    },
];

function renderProjectCard(project: Project): string {
    const featuredClass = project.featured ? " featured" : "";

    const thumbContent = project.image
        ? `<img src="${project.image}" alt="${project.name}" style="width:100%;height:100%;object-fit:contain;background:var(--bg);" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
           <div class="proj-image-placeholder" style="background: var(--bg);display:none;align-items:center;justify-content:center;">
             <div class="proj-initial">${project.name.charAt(0)}</div>
           </div>`
        : `<div class="proj-image-placeholder" style="background: var(--bg);">
             <div class="proj-initial">${project.name.charAt(0)}</div>
           </div>`;

    return `
        <div class="proj-card${featuredClass}" data-cat="${project.category}" onclick="window.__openCase('${project.id}')">
            <div class="proj-thumb">
                ${thumbContent}
                <div class="proj-type-badge">${project.type}</div>
            </div>
        </div>
    `;
}

function renderProjectCards(): string {
    return PROJECTS.map(renderProjectCard).join("");
}

export function initProjects(): void {
    const grid = document.getElementById("projectsGrid");
    if (!grid) {
        console.log("projectsGrid not found!");
        return;
    }

    const scrollContainer = grid as HTMLElement;

    const cardsHTML = renderProjectCards();
    scrollContainer.innerHTML = cardsHTML + cardsHTML;

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
    scrollContainer.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const speed = 0.5; // pixels per frame
    let direction = 1; // 1 = scrolling right, -1 = scrolling left
    let isAutoScrolling = true;
    let scrollTimeout: number | undefined;

    function autoScroll(): void {
        if (!isAutoScrolling) {
            requestAnimationFrame(autoScroll);
            return;
        }

        if (scrollContainer.scrollLeft <= 0) {
            direction = 1;
        } else if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2 - speed) {
            direction = -1;
        }

        scrollContainer.scrollLeft += speed * direction;

        requestAnimationFrame(autoScroll);
    }

    // Pause auto-scroll when user interacts with the page
    window.addEventListener('scroll', () => {
        isAutoScrolling = false;
        if (scrollTimeout) {
            window.clearTimeout(scrollTimeout);
        }
        scrollTimeout = window.setTimeout(() => {
            isAutoScrolling = true;
        }, 1000);
    }, { passive: true });

    // Pause on touch devices when touching the scroll container
    scrollContainer.addEventListener('touchstart', () => {
        isAutoScrolling = false;
    }, { passive: true });

    scrollContainer.addEventListener('touchend', () => {
        if (scrollTimeout) {
            window.clearTimeout(scrollTimeout);
        }
        scrollTimeout = window.setTimeout(() => {
            isAutoScrolling = true;
        }, 2000);
    }, { passive: true });

    autoScroll();
}

(window as unknown as Record<string, (id: string) => void>).__openCase = (id: string) => {
    const overlay = document.getElementById(`case-${id}`);
    if (overlay) {
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
        overlay.scrollTop = 0;
    }
};

(window as unknown as Record<string, () => void>).__closeCase = () => {
    document.querySelectorAll(".case-overlay").forEach((o) => o.classList.remove("open"));
    document.body.style.overflow = "";
};

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        (window as unknown as Record<string, () => void>).__closeCase();
    }
});

export function filterProjects(category: string, btn: HTMLElement): void {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll<HTMLElement>("#workGrid .work-card").forEach((card) => {
        const cats = card.dataset.cat || "";
        card.classList.toggle(
            "hidden",
            category !== "all" && !cats.includes(category)
        );
        card.style.display = category === "all" || cats.includes(category) ? "" : "none";
    });
}