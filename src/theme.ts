export function initTheme(): void {
    const html = document.documentElement;
    const toggle = document.querySelector('.theme-toggle');
    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
    }

    toggle?.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        if (isDark) {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}