import { AttackMove, MajorMove } from "./../board/Move";
import Board from "../board/Board";
import BoardUtils from "../board/BoardUtils";
import Move from "../board/Move";
import Tile from "../board/Tile";
import Piece from "./Piece";
import Alliance from "../board/Alliance";

export default class Queen extends Piece {
  protected _name: string;
  private static candidateCoordinates: Array<number> = [
    -9, 9, -7, 7, 1, -1, 8, -8,
  ]; //extended from bishop and rook

  constructor(piecePosition: number, alliance: Alliance) {
    super(piecePosition, alliance);
    this._name = alliance.isWhite ? "Q" : "q";
  }

  public getLegalMoves(board: Board): Move[] {
    let legalMoves: Move[] = []; // all legal moves for this piece
    for (let candidateCoordinatesOffset of Queen.candidateCoordinates) {
      let distanceCandidateCoordinates = this.piecePosition;
      while (BoardUtils.isValidTileCoordinates(distanceCandidateCoordinates)) {
        distanceCandidateCoordinates += candidateCoordinatesOffset;
        // Exceptions
        if (
          !BoardUtils.isValidTileCoordinates(distanceCandidateCoordinates) ||
          this.firstColumnExclusion(
            this.piecePosition,
            distanceCandidateCoordinates
          ) ||
          this.eightColumnExclusion(
            this.piecePosition,
            distanceCandidateCoordinates
          )
        )
          break;
        let tile: Tile = board.getTile(distanceCandidateCoordinates);
        // tile is not empty
        if (!tile.isOccupied()) {
          legalMoves.push(
            new MajorMove(board, this, distanceCandidateCoordinates)
          );
        } else {
          // not occupied tile
          let piece: Piece = tile.getPiece();
          if (piece.getAlliance() == this.alliance.name) break;
          legalMoves.push(
            new AttackMove(board, this, distanceCandidateCoordinates)
          );
        }
      }
    }
    return legalMoves;
  }

  private firstColumnExclusion(
    currPosition: number,
    candidateOffset: number
  ): boolean {
    return (
      BoardUtils.isFirstColumn[currPosition] &&
      (candidateOffset == -1 || candidateOffset == -9 || candidateOffset == 7)
    );
  }

  private eightColumnExclusion(
    currPosition: number,
    candidateOffset: number
  ): boolean {
    return (
      BoardUtils.isFirstColumn[currPosition] &&
      (candidateOffset == 1 || candidateOffset == 9 || candidateOffset == -7)
    );
  }
}
