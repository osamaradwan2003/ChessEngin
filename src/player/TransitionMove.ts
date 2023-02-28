import Board from "../board/Board";
import Move from "../move/Move";

export default class TransitionMove {
  public _board: Board;
  public _move: Move;
  public _moveStatus;
  constructor(board: Board, move: Move, status: number) {
    this._board = board;
    this._move = move;
    this._moveStatus = status;
  }

  public getStatus() {
    return MoveStatus;
  }
}
