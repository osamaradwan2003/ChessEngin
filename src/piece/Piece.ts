import Alliance from "../board/Alliance";
import Board from "../board/Board";
import Move from "../board/Move";

export default abstract class Piece {
  protected _isFirstMove: boolean = true;
  getAlliance(): string {
    return this.alliance.name;
  }
  protected piecePosition: number;
  protected alliance: Alliance;

  public abstract getLegalMoves(board: Board): Move[];
  constructor(piecePosition: number, alliance: Alliance) {
    this.piecePosition = piecePosition;
    this.alliance = alliance;
  }

  get isFirstMove(): boolean {
    return this._isFirstMove;
  }

  set isFirstMove(value: boolean) {
    this._isFirstMove = value;
  }
}
