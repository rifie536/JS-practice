export class AudioManager {
    constructor() {
        this.fanfare = document.getElementById("fanfare");
        this.bgmList = [
            document.getElementById("bgm-1"),
            document.getElementById("bgm-2"),
            document.getElementById("bgm-3")
        ];
        this.currentBgm = null;
        this.isSoundEnabled = true;
    }

    playFanfare() {
        if (this.isSoundEnabled) {
            this.fanfare.currentTime = 0;
            this.fanfare.play();
        }
    }

    playRandomBgm() {
        this.stopBgm();
        const randomIndex = Math.floor(Math.random() * this.bgmList.length);
        this.currentBgm = this.bgmList[randomIndex];
        if (this.isSoundEnabled) {
            this.currentBgm.play();
        }
    }

    stopBgm() {
        if (this.currentBgm) {
            this.currentBgm.pause();
            this.currentBgm.currentTime = 0;
            this.currentBgm = null;
        }
    }

    toggleSound() {
        this.isSoundEnabled = !this.isSoundEnabled;
        if (!this.isSoundEnabled) {
            this.stopBgm();
        }
    }

    setVolume(volume) {
        this.fanfare.volume = volume;
        if (this.currentBgm) {
            this.currentBgm.volume = volume;
        }
    }
}