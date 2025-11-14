const themes = {
    light: {
        "--primary": "#4F46E5",
        "--primary-hover": "#4338CA",
        "--secondary": "#10B981",
        "--bg": "#F9FAFB",
        "--surface": "#FFFFFF",
        "--text-main": "#111827",
        "--text-muted": "#4B5563",
        "--text-reverse": "#FFFFFF",
        "--border": "#E5E7EB",
        "--error": "#EF4444",
        "--warning": "#FBBF24",
        "--info": "#60A5FA",
    },
    dark: {
        "--primary": "#818CF8",
        "--primary-hover": "#A5B4FC",
        "--secondary": "#34D399",
        "--bg": "#0F172A",
        "--surface": "#1E293B",
        "--text-main": "#F3F4F6",
        "--text-muted": "#9CA3AF",
        "--text-reverse": "#111827",
        "--border": "#374151",
        "--error": "#F87171",
        "--warning": "#FCD34D",
        "--info": "#93C5FD",
    }
};

function setTheme(mode) {
    if (!themes[mode]) return;
    const root = document.documentElement;
    Object.entries(themes[mode]).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });

    // Lưu lại theme vào localStorage (nếu muốn)
    localStorage.setItem("theme", mode);
}

document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
});

function toggleTheme() {
    const current = localStorage.getItem("theme") || "light";
    const next = current === "light" ? "dark" : "light";
    setTheme(next);
}