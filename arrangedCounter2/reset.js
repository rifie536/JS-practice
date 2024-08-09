(() => {
    const $counter = document.getElementById("js-counter");
    const body = document.body;
    const mario = document.getElementById("mario");
    const volumeSlider = document.getElementById("volume-slider");
    const fanfare = document.getElementById("fanfare");
    const bgm = document.getElementsByClassName("bgm");
    // const bgm2 = document.getElementById("bgm-2");
    // const bgm3 = document.getElementById("bgm-3");
    const congratsMessage = document.getElementById("congrats-message");
    const quizContainer = document.getElementById("quiz-container");
    const soundToggle = document.getElementById("sound-toggle");

    let previousVolume = volumeSlider.value;

    const clickHandler = () => {
        $counter.textContent = 0;
        body.classList.remove('dark-theme');
        congratsMessage.style.display = "none";
        quizContainer.style.display = "none";
        stopBgm();
        stopFanfare();
        playMario();
    }

    const playMario = () => {
        mario.pause();
        mario.currentTime = 0;
        mario.volume = volumeSlider.value;
        mario.play();
    }

    const stopFanfare = () => {
        fanfare.pause();
        fanfare.currentTime = 0;
    }

    const stopBgm = () => {
        for (let i = 0; i < bgm.length; i++) {
            bgm[i].pause();
            bgm[i].currentTime = 0;
        }
    }


    document.getElementById("js-reset-button").addEventListener("click", clickHandler);
})();