// quiz.js
export class Quiz {
    constructor(container, onCorrectAnswer) {
        this.container = container;
        this.answerInput = container.querySelector("#quiz-answer");
        this.submitButton = container.querySelector("#submit-answer");
        this.onCorrectAnswer = onCorrectAnswer;
        this.currentAnswer = "";
        this.isActive = false;

        this.submitButton.addEventListener("click", () => this.checkAnswer());
        this.answerInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.checkAnswer();
            }
        });
    }

    show(answer) {
        this.isActive = true;
        this.currentAnswer = answer;
        this.container.style.display = "block";
        this.answerInput.value = "";
        this.answerInput.focus();
    }

    hide() {
        this.isActive = false;
        this.container.style.display = "none";
    }

    checkAnswer() {
        const userAnswer = this.answerInput.value;
        if (userAnswer === this.currentAnswer) {
            this.hide();
            if (this.onCorrectAnswer) {
                this.onCorrectAnswer();
            }
        } else {
            alert("不正解です。もう一度試してください。");
            this.answerInput.value = "";
            this.answerInput.focus();
        }
    }
}