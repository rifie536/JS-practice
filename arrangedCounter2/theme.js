export class ThemeManager {
    constructor(body) {
        this.body = body;
    }

    toggleTheme() {
        this.body.classList.toggle('dark-theme');
    }

    setLightTheme() {
        this.body.classList.remove('dark-theme');
    }

    setDarkTheme() {
        this.body.classList.add('dark-theme');
    }

    isDarkTheme() {
        return this.body.classList.contains('dark-theme');
    }
}