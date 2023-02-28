import Piece from "../piece/Piece";
import Board from "../board/Board";
import Builder from "../board/Builder";

export default abstract class Move {
  protected board: Board;
  protected piece: Piece;
  protected distanceCoordinates: number;
  constructor(board: Board, piece: Piece, distanceCoordinates: number) {
    this.board = board;
    this.piece = piece;
    this.distanceCoordinates = distanceCoordinates;
  }

  getDestinationCoordinates(): number {
    return this.piece.position + this.distanceCoordinates;
  }
  get destinationCoordinate(): number {
    return this.piece.position + this.distanceCoordinates;
  }

  executeV1(builder: Builder): Board {
    builder.setPiece(
      this.piece.movePiece(
        this.getDestinationCoordinates(),
        this.piece.alliance
      )
    );
    builder.setMoveMaker(this.board.currPlayer.getOpponent().getAlliance());
    return builder.build();
  }

  public get currCoordinate(): number {
    return this.piece.position;
  }

  execute(): Board {
    const builder = new Builder();
    for (let piece of this.board.currPlayer.getActivePieces()) {
      //Todo: objects compare and equals pieces
      if (!this.piece.equals(piece)) {
        builder.setPiece(piece);
      }
    }

    for (let piece of this.board.currPlayer.getOpponent().getActivePieces()) {
      builder.setPiece(piece);
    }
    //TODO: implement actually moving the piece
    builder.setPiece(
      this.piece.movePiece(
        this.getDestinationCoordinates(),
        this.piece.alliance
      )
    );
    builder.setMoveMaker(this.board.currPlayer.getOpponent().getAlliance());
    return builder.build();
  }
}

export class MajorMove extends Move {
  constructor(board: Board, piece: Piece, distanceCoordinates: number) {
    super(board, piece, distanceCoordinates);
  }
}

export class AttackMove extends Move {
  constructor(board: Board, piece: Piece, distanceCoordinates: number) {
    super(board, piece, distanceCoordinates);
  }
}

export class PawnMove extends Move {}

export class PawnAttack extends AttackMove {}

export class PawnEnPassantMove extends PawnAttack {}

export class PawnJump extends PawnMove {}

export class CastleMove extends Move {}

export class KingSideCastleMove extends CastleMove {}

export class QueenSideCastleMove extends CastleMove {}

export class FactoryMove {
  constructor() {
    throw new Error("not instantiable");
  }

  static createMove(
    board: Board,
    currCoordinate: number,
    distanceCoordinate: number
  ): Move {
    for (let move of board.getAllLegalMove) {
      if (
        move.currCoordinate === currCoordinate &&
        move.destinationCoordinate === distanceCoordinate
      ) {
        return move;
      }
    }
    throw new Error("Invalid Move Coordinates");
  }

  public factory() {
    throw new Error("FactoryMove");
  }
}

// export class NullMove extends Move {}
