import type { NavSection } from "./types";

const SECTIONS: NavSection[] = [
    { id: "home", label: "Home" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
];

export function initNavigation(): void {

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            const href = (a as HTMLAnchorElement).getAttribute("href");
            if (!href) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    const navItems = document.querySelectorAll<HTMLElement>(".bottom-nav .nav-item");

    function updateActiveSection(): void {
        let current = "home";
        for (const section of SECTIONS) {
            const el = document.getElementById(section.id);
            if (el && window.scrollY >= el.offsetTop - 120) {
                current = section.id;
            }
        }
        navItems.forEach((item) => {

            const href = (item as HTMLAnchorElement).getAttribute("href");
            if (href && href.startsWith("#")) {
                item.classList.toggle("active", item.id === `nav-${current}`);
            } else {

                item.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();
}