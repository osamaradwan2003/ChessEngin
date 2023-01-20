import Piece from "../piece/Piece";
import Alliance from "./Alliance";
import Board from "./Board";
import BoardUtils from "./BoardUtils";

export default class Builder {
  public boardConfig: Piece[] = new Array<Piece>(BoardUtils.TILES_CELLS);
  // @ts-ignore
  private nextMove: Alliance;

  public setMoveMaker(moveMaker: Alliance): Builder {
    this.nextMove = moveMaker;
    return this;
  }

  public setPiece(piece: Piece): Builder {
    this.boardConfig[piece.position] = piece;
    return this;
  }

  public build(): Board {
    return new Board(this);
  }
}
