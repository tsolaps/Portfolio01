export function initContactForm(): void {
    const form = document.querySelector(".contact-form-section");
    if (!form) return;

    const submitBtn = form.querySelector<HTMLButtonElement>(".form-submit");
    if (!submitBtn) return;

    submitBtn.addEventListener("click", () => {
        const nameInput = form.querySelector<HTMLInputElement>('input[placeholder="Full Name"]');
        const emailInput = form.querySelector<HTMLInputElement>('input[placeholder="Email"]');
        const messageInput = form.querySelector<HTMLTextAreaElement>('textarea');

        const name = nameInput?.value.trim() || "";
        const email = emailInput?.value.trim() || "";
        const message = messageInput?.value.trim() || "";

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        if (!email.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }

        window.location.href = `mailto:tsolapatrick@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}`;
    });
}