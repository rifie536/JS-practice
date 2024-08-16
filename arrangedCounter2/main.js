// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase storage から bgmデータを取得
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

// Create a child reference
const bgmRef = ref(storage, 'bgm');
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
const fanfareRef = ref(storage, 'bgm/fanfare.mp3');
const marioRef = ref(storage, 'bgm/mario.mp3');
const bgm1Ref = ref(storage, 'bgm/doraque.mp3');
const bgm2Ref = ref(storage, 'bgm/kirby.mp3');
const bgm3Ref = ref(storage, 'bgm/monhun.mp3');
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"
alert("音声が流れますので、ご注意ください。");
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
    getDownloadURL(fanfareRef)
        .then((url) => {
            audioManager.setFanfareSource(url);
        })
        .catch((error) => {
            console.error("ファンファーレの取得に失敗しました:", error);
        });

    getDownloadURL(marioRef)
        .then((url) => {
            audioManager.setMarioSource(url);
        })
        .catch((error) => {
            console.error("マリオの取得に失敗しました:", error);
        });

    const bgmRefs = [bgm1Ref, bgm2Ref, bgm3Ref];

    bgmRefs.forEach((ref, index) => {
        getDownloadURL(ref)
            .then((url) => {
                audioManager.setBgmSource(index, url);
            })
            .catch((error) => {
                console.error(`bgm${index + 1}の取得に失敗しました:`, error);
            });
    });

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