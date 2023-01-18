import { AttackMove, MajorMove } from "./../board/Move";
import Board from "../board/Board";
import BoardUtils from "../board/BoardUtils";
import Move from "../board/Move";
import Tile from "../board/Tile";
import Piece from "./Piece";

export default class Bishop extends Piece {
  private static candidateCoordinates: Array<number> = [-9, 9, -7, 7];

  constructor(piecePosition: number, alliance: Alliance) {
    super(piecePosition, alliance);
  }

  public getLegalMoves(board: Board): Move[] {
    let legalMoves: Move[] = []; // all legal moves for this piece
    for (let candidateCoordinatesOffset of Bishop.candidateCoordinates) {
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
          let piece: Piece = tile.getPice();
          if (piece.getAlliance() == this.alliance) break;
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
      (candidateOffset == -9 || candidateOffset == 7)
    );
  }

  private eightColumnExclusion(
    currPosition: number,
    candidateOffset: number
  ): boolean {
    return (
      BoardUtils.isFirstColumn[currPosition] &&
      (candidateOffset == 9 || candidateOffset == -7)
    );
  }
}
