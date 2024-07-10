(() => {
    alert("音声が流れますので、ご注意ください。");
    const $counter = document.getElementById("js-counter");
    const body = document.body;
    const fanfare = document.getElementById("fanfare");
    const soundToggle = document.getElementById("sound-toggle");
    const volumeSlider = document.getElementById("volume-slider");
    const bgmList = [
        document.getElementById("bgm-1"),
        document.getElementById("bgm-2"),
        document.getElementById("bgm-3")
    ];

    const quizContainer = document.getElementById("quiz-container");
    const quizAnswer = document.getElementById("quiz-answer");
    const submitAnswer = document.getElementById("submit-answer");
    const congratsMessage = document.getElementById("congrats-message");

    let isSoundEnabled = true;
    let currentBgm = null;
    let isQuizActive = false;
    let previousVolume = volumeSlider.value;

    const bgmAnswers = {
        "bgm-1": "ドラクエ",
        "bgm-2": "カービィ",
        "bgm-3": "モンハン"
    };


    const clickHandler = (e) => {
        const $targetButton = e.currentTarget;
        let currentCount = parseInt($counter.textContent);
        if (isNaN(currentCount)) {
            return;
        }
        if (currentCount === 10) {
            $counter.textContent = "リセットしてね🎶";
            return;
            }
        if ($targetButton.textContent === "+") {
            if (currentCount === 9 && !isQuizActive) {
                showQuiz();
                return;
            }
            if (currentCount === 9 && isQuizActive) {
                return;
            }
            currentCount++;
        } else if ($targetButton.textContent === "-") {
            currentCount = Math.max(0, currentCount - 1);
        }
        updateDisplay(currentCount);
        checkAndToggleTheme(currentCount);
        checkAndPlayFanfare(currentCount);
        checkAndPlayBgm(currentCount);

        if (currentCount !== 9) {
            hideQuiz();
        }

    }

    const updateDisplay = (count) => {
        $counter.textContent = count;
    }

    const checkAndShowCongrats = (count) => {
        if (count === 10) {
            showCongrats();
        } else {
            hideCongrats();
        }
    }

    const showCongrats = () => {
        congratsMessage.style.display = "block";
    }

    const hideCongrats = () => {
        congratsMessage.style.display = "none";
    }

    const checkAndToggleTheme = (count) => {
        if (count % 5 === 0 && count !== 0) {
            toggleTheme();
        }
    }

    const toggleTheme = () => {
        body.classList.toggle('dark-theme');
    }

    const checkAndPlayFanfare = (count) => {
        if (count % 10 === 0 && count !== 0) {
            stopBgm();
            playFanfare();
        }
    }

    const playFanfare = () => {
        if (isSoundEnabled) {
            fanfare.currentTime = 0;
            fanfare.play();
        }
    }

    const checkAndPlayBgm = (count) => {
        if (Math.abs(count) === 1) {
            playRandomBgm();
        }
    }


    const showQuiz = () => {
        isQuizActive = true;
        quizContainer.style.display = "block";
        quizAnswer.value = "";
        quizAnswer.focus();
    }

    const hideQuiz = () => {
        isQuizActive = false;
        quizContainer.style.display = "none";
    }

    const checkQuizAnswer = () => {
        const userAnswer = quizAnswer.value;
        const correctAnswer = bgmAnswers[currentBgm.id];

        if (userAnswer === correctAnswer) {
            hideQuiz();
            let currentCount = parseInt($counter.textContent);
            currentCount++;
            updateDisplay(currentCount);
            checkAndToggleTheme(currentCount);
            checkAndPlayFanfare(currentCount);
            checkAndPlayBgm(currentCount);
            checkAndShowCongrats(currentCount);
        } else {
            alert("不正解です。もう一度試してください。");
            quizAnswer.value = "";
            quizAnswer.focus();
        }
    }

    const playRandomBgm = () => {
        stopBgm();
        const randomIndex = Math.floor(Math.random() * bgmList.length);
        currentBgm = bgmList[randomIndex];
        currentBgm.volume = volumeSlider.value;
        if (isSoundEnabled) {
            currentBgm.play();
        }
    }

    const stopBgm = () => {
        if (currentBgm) {
            currentBgm.pause();
            currentBgm.currentTime = 0;
            currentBgm = null;
        }
    }

    const toggleSound = () => {
        isSoundEnabled = !isSoundEnabled;
        updateSoundToggleButton();
        if (!isSoundEnabled) {
            previousVolume = volumeSlider.value;
            volumeSlider.value = 0;
            if (currentBgm) {
                currentBgm.pause();
            }
        } else {
            volumeSlider.value = previousVolume;
            if (currentBgm) {
                currentBgm.play();
            }
        }
        updateVolume();
    }

    const updateSoundToggleButton = () => {
        soundToggle.textContent = isSoundEnabled ? "音声オフ" : "音声オン";
    }

    const updateVolume = () => {
        const volume = volumeSlider.value;
        fanfare.volume = volume;
        if (currentBgm) {
            currentBgm.volume = volume;
            if (volume > 0 && isSoundEnabled) {
                currentBgm.play();
            } else {
                currentBgm.pause();
            }
        }
        if (volume > 0 && !isSoundEnabled) {
            isSoundEnabled = true;
            updateSoundToggleButton();
        } else if (volume == 0 && isSoundEnabled) {
            isSoundEnabled = false;
            updateSoundToggleButton();
        }
    }

    const buttons = document.getElementsByClassName("js-button");
    for (let button of buttons) {
        button.addEventListener("click", clickHandler);
    }

    submitAnswer.addEventListener("click", checkQuizAnswer);

    quizAnswer.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            checkQuizAnswer();
        }
    });

    soundToggle.addEventListener("click", toggleSound);

    volumeSlider.addEventListener("input", updateVolume);

    updateVolume();
})();