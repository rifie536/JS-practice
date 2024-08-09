import { Counter } from './counter.js';
import { AudioManager } from './audio.js';
import { Quiz } from './quiz.js';
import { ThemeManager } from './theme.js';

// console.log('main.js is loaded');

document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById("js-counter");
    const congratsMessage = document.getElementById("congrats-message");
    const quizContainer = document.getElementById("quiz-container");
    const soundToggle = document.getElementById("sound-toggle");
    const volumeSlider = document.getElementById("volume-slider");
    const incrementButton = document.querySelector(".js-button[data-action='increment']");
    const decrementButton = document.querySelector(".js-button[data-action='decrement']");
    const resetButton = document.getElementById("js-reset-button");

    const audioManager = new AudioManager();
    const themeManager = new ThemeManager(document.body);

    const bgmAnswers = {
        "bgm-1": "ドラクエ",
        "bgm-2": "カービィ",
        "bgm-3": "モンハン"
    };

    const quiz = new Quiz(quizContainer, () => {
        counter.increment();
        updateDisplay(counter.getCount());
    });

    const counter = new Counter(counterElement, (count) => {
        updateDisplay(count);
    });

    const updateDisplay = (count) => {
        checkAndToggleTheme(count);
        checkAndPlayFanfare(count);
        checkAndPlayBgm(count);
        checkAndShowQuiz(count);
        checkAndShowCongrats(count);
    }

    const checkAndToggleTheme = (count) => {
        if (count % 5 === 0 && count !== 0) {
            themeManager.toggleTheme();
        }
    }

    const checkAndPlayFanfare = (count) => {
        if (counter.isResetMessage) return;
        if (count % 10 === 0 && count !== 0) {
            console.log(count);
            audioManager.stopBgm();
            audioManager.playFanfare();
        }
    }

    const checkAndPlayBgm = (count) => {
        if (count === 1) {
            audioManager.playRandomBgm(volumeSlider.value);
        }
    }

    const checkAndShowQuiz = (count) => {
        if (count === 9) {
            quiz.show(getBgmAnswer());
        } else {
            quiz.hide();
        }
    }

    const checkAndShowCongrats = (count) => {
        congratsMessage.style.display = count === 10 ? "block" : "none";
    }

    const getBgmAnswer = () => {
        return bgmAnswers[audioManager.getCurrentBgmId()] || "";
    }

    incrementButton.addEventListener("click", () => {
        if (counter.isResetMessage) return;
        if (counter.getCount() < 9) {
            counter.increment();
        } else if (counter.getCount() === 10) {
            counter.showResetMessage();
        }
    });

    decrementButton.addEventListener("click", () => {
        if (counter.isResetMessage) return;
        if (counter.getCount() > 0 && counter.getCount() < 10) {
            counter.decrement();
        } else if (counter.getCount() === 10) {
            counter.showResetMessage();
        }
    });

    resetButton.addEventListener("click", () => {
        counter.reset();
        quiz.hide();
        audioManager.reset();
        themeManager.setLightTheme();
        congratsMessage.style.display = "none";
    });

    soundToggle.addEventListener("click", () => {
        let isSoundOn = audioManager.toggleSound(volumeSlider.value);
        soundToggle.textContent = isSoundOn ? "音声オフ" : "音声オン";
    });

    volumeSlider.addEventListener("input", () => {
        audioManager.setVolume(volumeSlider.value);
    });

    // 初期化
    updateDisplay(counter.getCount());
    // audioManager.setVolume(volumeSlider.value);
});