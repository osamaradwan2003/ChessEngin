import Board from "../board/Board";
import Move from "../board/Move";
import Player from "./Player";

export default class TransitionMove {
  private _board: Board;
  private _move: Move;
  private _player: Player;

  constructor(board: Board, move: Move, player: Player) {
    this._board = board;
    this._move = move;
    this._player = player;
  }
}
