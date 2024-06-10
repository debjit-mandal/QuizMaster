document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkbox');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        body.classList.toggle('dark-mode', currentTheme === 'dark');
        body.classList.toggle('light-mode', currentTheme === 'light');
        checkbox.checked = currentTheme === 'light';
    } else {
        localStorage.setItem('theme', 'dark');
    }

    checkbox.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });
});
