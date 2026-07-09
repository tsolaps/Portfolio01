interface Tool {
    name: string;
    image: string;
}

const TOOLS: Tool[] = [
    {
        name: "Figma",
        image: "icons/figma.png",
    },
    {
        name: "TypeScript",
        image: "icons/typescript.png",
    },
    {
        name: "React",
        image: "icons/react.png",
    },
    {
        name: "Next.js",
        image: "icons/nextjs.png",
    },
    {
        name: "Python",
        image: "icons/python.png",
    },
    {
        name: "PostgreSQL",
        image: "icons/postgres.png",
    },
    {
        name: "MongoDB",
        image: "icons/mongodb.png",
    },
    {
        name: "Supabase",
        image: "icons/supabase.png",
    },
    {
        name: "Git",
        image: "icons/git.png",
    },
    {
        name: "GitHub",
        image: "icons/github.png",
    },
    {
        name: "Photoshop",
        image: "icons/psd.png",
    },
    {
        name: "Illustrator",
        image: "icons/illustrator.png",
    },
    {
        name: "After Effects",
        image: "icons/after effects.png",
    },
    {
        name: "Premiere Pro",
        image: "icons/premier pro.png",
    },
];

function renderToolItem(tool: Tool): string {
    return `
        <div class="tool-item">
            <div class="tool-icon">
                <img src="${tool.image}" alt="${tool.name}" onerror="this.style.display='none'">
            </div>
        </div>
    `;
}

function renderTools(): string {
    return TOOLS.map(renderToolItem).join("");
}

export function initTools(): void {
    const container = document.getElementById("toolsContainer");
    if (!container) {
        console.log("toolsContainer not found!");
        return;
    }

    const scrollContainer = container as HTMLElement;
    const toolsHTML = renderTools();

    scrollContainer.innerHTML = toolsHTML + toolsHTML;

    const speed = 1;

    function autoScroll(): void {
        scrollContainer.scrollLeft += speed;

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
        }

        requestAnimationFrame(autoScroll);
    }

    autoScroll();
}