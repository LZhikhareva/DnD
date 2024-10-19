export class Score {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('scores');
        document.body.appendChild(this.element);
        this.score = 0;
        this.scoreHeader = document.createElement('h1');
        this.scoreHeader.textContent = `Количество очков: ${this.score}`;
        this.element.appendChild(this.scoreHeader);

        this.mistakes = 0;
        this.mistakesHeader = document.createElement('h1');
        this.mistakesHeader.textContent = `Упс! Мимо: ${this.mistakes}`;
        this.element.appendChild(this.mistakesHeader);
    }

    updateScore(amount) {
        this.score += amount;
        this.scoreHeader.textContent = `Количество очков: ${this.score}`;
        this.checkWin();
    }

    updateMistakes(amount) {
        this.checkLoss();
        this.mistakes += amount;
        this.mistakesHeader.textContent = `Упс! Мимо: ${this.mistakes}`;
    }

    checkLoss() {
        if (this.mistakes >= 4) {
            alert('Вы проиграли!')
            this.mistakes = -1;
            this.score = 0;
            this.mistakesHeader.textContent = `Упс! Мимо: ${this.mistakes}`;
            this.scoreHeader.textContent = `Количество очков: ${this.score}`;
        }
    }

    checkWin() {
        if (this.score > 4) {
            alert('Ура, победа!')
            this.mistakes = 0;
            this.score = 0;
            this.mistakesHeader.textContent = `Упс! Мимо: ${this.mistakes}`;
            this.scoreHeader.textContent = `Количество очков: ${this.score}`;
        }
    }
}