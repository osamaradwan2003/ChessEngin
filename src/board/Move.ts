import Piece from "../piece/Piece";
import Board from "./Board";

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
