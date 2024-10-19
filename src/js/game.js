import { Board } from "./board";
import src from '../img/goblin.png';

export class Game {
    constructor() {

        this.boardlist = new Board(4);
        this.boardlist.generateBoard();
    }

    init() {
        this.boardlist.addHero(src);
        setInterval(() => {
            this.boardlist.addHero(src);
        }, 1000);
    }
}