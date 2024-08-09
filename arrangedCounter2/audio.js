export class AudioManager {
    constructor() {
        this.fanfare = document.getElementById("fanfare");
        this.mario = document.getElementById("mario");
        this.bgmList = [
            document.getElementById("bgm-1"),
            document.getElementById("bgm-2"),
            document.getElementById("bgm-3")
        ];
        this.currentBgm = null;
        this.isSoundEnabled = true;
        this.previousVolume = 0.5;
    }

    reset() {
        this.stopBgm();
        this.stopFanfare();
        this.playMario();
    }

    playFanfare() {
        if (this.isSoundEnabled) {
            this.fanfare.currentTime = 0;
            this.fanfare.play();
        }
    }

    playRandomBgm(volume) {
        this.stopBgm();
        const randomIndex = Math.floor(Math.random() * this.bgmList.length);
        this.currentBgm = this.bgmList[randomIndex];
        if (this.isSoundEnabled) {
            this.currentBgm.volume = volume;
            this.currentBgm.play();
        }
    }

    playMario() {
        this.mario.play();
    }

    stopBgm() {
        if (this.currentBgm) {
            this.currentBgm.pause();
            this.currentBgm.currentTime = 0;
            this.currentBgm = null;
        }
    }

    stopFanfare() {
        this.fanfare.pause();
        this.fanfare.currentTime = 0;
    }

    stopMario() {
        this.mario.pause();
        this.mario.currentTime = 0;
    }

    toggleSound(volume) {
        this.isSoundEnabled = !this.isSoundEnabled;
        if (!this.isSoundEnabled) {
            this.previousVolume = volume;
            this.setVolume(0);
        } else {
            this.setVolume(this.previousVolume);
        }
        return this.isSoundEnabled;
    }

    setVolume(volume) {
        this.fanfare.volume = volume;
        this.mario.volume = volume;
        if (this.currentBgm) {
            this.currentBgm.volume = volume;
        }
    }

    getCurrentBgmId() {
        return this.currentBgm ? this.currentBgm.id : null;
    }

    isSoundEnabled() {
        return this.isSoundEnabled;
    }
}