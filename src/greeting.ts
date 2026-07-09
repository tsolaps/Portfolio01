const GREETINGS = ["Hi,", "Báwo ni,", "Ndewo,", "Hello,", "Sannu,", "Do!,"];

export function initGreeting(): void {
    const greetingEl = document.getElementById("greeting-text");
    if (!greetingEl) return;

    let index = 0;

    const updateGreeting = () => {

        greetingEl.classList.remove("fade-in");
        greetingEl.classList.add("fade-out");

        setTimeout(() => {
            index = (index + 1) % GREETINGS.length;
            greetingEl.textContent = GREETINGS[index];
            greetingEl.classList.remove("fade-out");
            greetingEl.classList.add("fade-in");
        }, 400);
    };

    greetingEl.textContent = GREETINGS[0];
    greetingEl.classList.add("fade-in");

    setInterval(updateGreeting, 2500);
}