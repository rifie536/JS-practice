(() => {
    const $counter = document.getElementById('js-counter');
    let currentCount = parseInt($counter.textContent);
    const body = document.body;

    const updateDisplay = () => {
        $counter.textContent = currentCount;
        checkAndToggleTheme();
    }

    const checkAndToggleTheme = () => {
        if (currentCount % 5 === 0 && currentCount !== 0) {
            toggleTheme();
        }
    }

    const toggleTheme = () => {
        body.classList.toggle('dark-theme');
    }

    updateDisplay();
})();