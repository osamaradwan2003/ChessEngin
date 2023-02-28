import Piece from "../piece/Piece";
import Alliance from "./Alliance";
import Board from "./Board";
import BoardUtils from "./BoardUtils";

export default class Builder {
  public boardConfig: Piece[] = new Array<Piece>(BoardUtils.TILES_CELLS);
  // @ts-ignore
  private _nextMove: Alliance;

  public setMoveMaker(moveMaker: Alliance): Builder {
    this._nextMove = moveMaker;
    return this;
  }

  public get nextMove(): Alliance {
    return this._nextMove;
  }

  public setPiece(piece: Piece): Builder {
    this.boardConfig[piece.position] = piece;
    return this;
  }

  public build(): Board {
    return new Board(this);
  }
}
