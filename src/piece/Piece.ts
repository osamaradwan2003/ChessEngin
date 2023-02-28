import Alliance from "../board/Alliance";
import Board from "../board/Board";
import Move from "../move/Move";

export default abstract class Piece {
  protected _isFirstMove: boolean = true;
  protected abstract _name: string;

  protected piecePosition: number;
  protected _alliance: Alliance;

  constructor(piecePosition: number, alliance: Alliance) {
    this.piecePosition = piecePosition;
    this._alliance = alliance;
  }

  public get position(): number {
    return this.piecePosition;
  }
  getAlliance(): string {
    return this._alliance.name;
  }

  public get alliance(): Alliance {
    return this._alliance;
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

  public equals(obj: object): boolean {
    if (obj instanceof Piece) {
      return (
        this.alliance.name == obj.alliance.name &&
        this.position == obj.position &&
        this.name == this.name
      );
    }
    return false;
  }

  public abstract movePiece(position: number, alliance: Alliance): Piece;

  public abstract getLegalMoves(board: Board): Move[];
}
