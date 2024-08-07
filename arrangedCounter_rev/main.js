// main.js
import { Counter } from './counter.js';
import { AudioManager } from './audio.js';
import { Quiz } from './quiz.js';
import { ThemeManager } from './theme.js';

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

    function updateDisplay(count) {
        checkAndToggleTheme(count);
        checkAndPlayFanfare(count);
        checkAndPlayBgm(count);
        checkAndShowQuiz(count);
        checkAndShowCongrats(count);
    }

    function checkAndToggleTheme(count) {
        if (count % 5 === 0 && count !== 0) {
            themeManager.toggleTheme();
        }
    }

    function checkAndPlayFanfare(count) {
        if (count % 10 === 0 && count !== 0) {
            audioManager.stopBgm();
            audioManager.playFanfare();
        }
    }

    function checkAndPlayBgm(count) {
        if (count === 1) {
            audioManager.playRandomBgm();
        }
    }

    function checkAndShowQuiz(count) {
        if (count === 9) {
            quiz.show(getBgmAnswer());
        } else {
            quiz.hide();
        }
    }

    function checkAndShowCongrats(count) {
        congratsMessage.style.display = count === 10 ? "block" : "none";
    }

    function getBgmAnswer() {
        return bgmAnswers[audioManager.getCurrentBgmId()] || "";
    }

    // イベントリスナーの設定
    incrementButton.addEventListener("click", () => {
        if (counter.getCount() < 10) {
            counter.increment();
        }
    });

    decrementButton.addEventListener("click", () => {
        if (counter.getCount() > 0) {
            counter.decrement();
        }
    });

    resetButton.addEventListener("click", () => {
        counter.reset();
        quiz.hide();
        audioManager.stopBgm();
        themeManager.setLightTheme();
        congratsMessage.style.display = "none";
    });

    soundToggle.addEventListener("click", () => {
        audioManager.toggleSound();
        soundToggle.textContent = audioManager.isSoundEnabled() ? "音声オフ" : "音声オン";
    });

    volumeSlider.addEventListener("input", () => {
        audioManager.setVolume(volumeSlider.value);
    });

    // 初期化
    updateDisplay(counter.getCount());
    audioManager.setVolume(volumeSlider.value);
});