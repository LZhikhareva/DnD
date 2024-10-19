import { Board } from "./board";


test('board is generared properly', () => {
  const boardlist = new Board(4);
  expect(boardlist.size).toBe(4);
})