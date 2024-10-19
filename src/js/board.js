// TODO: write code here
import { Score } from "./score";

export class Board {
  constructor(size) {
    this.size = size;
    this.board = [];
    this.element = document.createElement('div');
    this.element.classList.add('board');
    document.body.appendChild(this.element);
    this.onBoardClick = this.onBoardClick.bind(this);
    this.element.addEventListener('click', this.onBoardClick);
    this.score = new Score();
  }

  generateBoard() {
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.id = i + 1;
      this.element.appendChild(cell);
      this.board.push(cell);
    }
  }

  addHero(src) {
    const cellsArray = document.querySelectorAll('.cell');
    if (this.hero) {
      this.hero.parentNode.removeChild(this.hero);
    }
    this.hero = document.createElement('img');
    this.hero.src = src;
    this.hero.classList.add('hero-img');
    const newCell = cellsArray[this.placeHeroRandomly()];
    newCell.appendChild(this.hero);
  }

  placeHeroRandomly() {
    let random = Math.floor(Math.random() * document.querySelectorAll('.cell').length);
    return random;
  }

  onBoardClick(e) {
    const target = e.target;

    if (target.classList.contains('hero-img')) {
      this.score.updateScore(1);
    } else {
      this.score.updateMistakes(1);
    }
  }
}

