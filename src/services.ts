interface Service {
    title: string;
    description: string;
}

const SERVICES: Service[] = [
    {
        title: "Brand Identity & Strategy",
        description: "I craft visual identities that communicate clearly, stand out confidently, and connect with the people who matter most.",
    },
    {
        title: "UI/UX Design",
        description: "Intuitive interfaces and seamless experiences that turn visitors into loyal users through thoughtful interaction design.",
    },
    {
        title: "Full-Stack Development",
        description: "I build fast, scalable web applications using modern technologies and best practices.",
    },
    {
        title: "Creative Direction",
        description: "Strategic creative oversight that aligns visual storytelling with business goals for cohesive brand experiences.",
    },
];

export function initServices(): void {
    const section = document.getElementById("services");
    if (!section) return;

    const titleEl = section.querySelector(".services-title") as HTMLElement;
    const descEl = section.querySelector(".services-desc") as HTMLElement;
    const dotsContainer = section.querySelector(".services-dots") as HTMLElement;

    if (!titleEl || !descEl || !dotsContainer) return;

    let currentIndex = 0;
    let intervalId: number | null = null;

    SERVICES.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = `services-dot${i === 0 ? " active" : ""}`;
        dot.setAttribute("aria-label", `Go to service ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function updateService(index: number, instant = false): void {
        const service = SERVICES[index];

        if (instant) {
            titleEl.textContent = service.title;
            descEl.textContent = service.description;
            titleEl.classList.add("visible");
            descEl.classList.add("visible");
        } else {
            titleEl.classList.remove("visible");
            descEl.classList.remove("visible");

            setTimeout(() => {
                titleEl.textContent = service.title;
                descEl.textContent = service.description;
                titleEl.classList.add("visible");
                descEl.classList.add("visible");
            }, 300);
        }

        dotsContainer.querySelectorAll(".services-dot").forEach((d, i) => {
            d.classList.toggle("active", i === index);
        });

        currentIndex = index;
    }

    function goTo(index: number): void {
        if (index === currentIndex) return;
        updateService(index);
    }

    function nextService(): void {
        const next = (currentIndex + 1) % SERVICES.length;
        updateService(next);
    }

    function startAutoRotate(): void {
        if (intervalId !== null) return;
        intervalId = window.setInterval(nextService, 2500);
    }

    function stopAutoRotate(): void {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    updateService(0, true);
    startAutoRotate();
}