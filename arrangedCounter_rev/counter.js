export class Counter {
    constructor(element, onCountChange) {
        this.element = element;
        this.count = 0;
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

    reset() {
        this.count = 0;
        this.update();
    }

    update() {
        this.element.textContent = this.count;
        if (this.onCountChange) {
            this.onCountChange(this.count);
        }
    }
}