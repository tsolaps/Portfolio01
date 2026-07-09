export interface Project {
    id: string;
    name: string;
    description: string;
    category: string;
    type: string;
    tags: string[];
    featured: boolean;
    image?: string;
    url?: string;
    caseStudy: {
        eyebrow: string;
        title: string;
        body: string;
        visitUrl?: string;
    };
}

export interface NavSection {
    id: string;
    label: string;
}

export type Theme = "light" | "dark";