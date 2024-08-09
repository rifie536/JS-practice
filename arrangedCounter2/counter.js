export class Counter {
    constructor(element, onCountChange) {
        this.element = element;
        this.count = 0;
        this.isResetMessage = false;
        this.onCountChange = onCountChange;
    }

    increment() {
        if (this.count < 10) {
            this.count++;
            this.update();
        }
    }

    decrement() {
        if (this.count > 0) {
            this.count--;
            this.update();
        }
    }

    showResetMessage() {
        this.isResetMessage = true;
        this.update();
    }

    reset() {
        this.count = 0;
        this.isResetMessage = false;
        this.update();
    }

    update() {
        if (this.isResetMessage) {
            this.element.textContent = "リセットしてね🎶";
        } else {
            this.element.textContent = this.count;
        }
        if (this.onCountChange) {
            this.onCountChange(this.count);
        }
    }

    getCount() {
        return this.count;
    }
}