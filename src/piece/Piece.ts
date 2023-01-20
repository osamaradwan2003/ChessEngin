import Alliance from "../board/Alliance";
import Board from "../board/Board";
import Move from "../board/Move";

export default abstract class Piece {
  protected _isFirstMove: boolean = true;
  protected abstract _name: string;
  getAlliance(): string {
    return this.alliance.name;
  }
  protected piecePosition: number;
  protected alliance: Alliance;

  public get position(): number {
    return this.piecePosition;
  }

  public abstract getLegalMoves(board: Board): Move[];
  constructor(piecePosition: number, alliance: Alliance) {
    this.piecePosition = piecePosition;
    this.alliance = alliance;
  }

  toString(): string {
    return this._name;
  }

  public get name(): string {
    return this._name;
  }

  get isFirstMove(): boolean {
    return this._isFirstMove;
  }

  set isFirstMove(value: boolean) {
    this._isFirstMove = value;
  }
}
