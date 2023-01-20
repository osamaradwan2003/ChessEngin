import Alliance from "../board/Alliance";
import Board from "../board/Board";
import Move, { AttackMove, MajorMove } from "../board/Move";
import Tile from "../board/Tile";
import Piece from "./Piece";

export default class Pawn extends Piece {
  protected _name: string;
  private static candidateCoordinates: Array<number> = [8, 16, 7, 9];
  constructor(piecePosition: number, alliance: Alliance) {
    super(piecePosition, alliance);
    this._name = alliance.isWhite ? "P" : "p";
  }

  //override
  public getLegalMoves(board: Board): Move[] {
    let candidateDistance: number,
      legalMoves: Move[] = [];

    for (let currCandidateOffset of Pawn.candidateCoordinates) {
      candidateDistance =
        this.piecePosition + this.alliance.getDirection() * currCandidateOffset;

      let tile: Tile = board.getTile(candidateDistance);
      let piece: Piece = tile.getPiece();
      if (!tile.isOccupied()) {
        // not occupied tile and none attacked move
        if (this.noneAttachedMoves(board, currCandidateOffset))
          legalMoves.push(
            this.noneAttachedMoves(board, currCandidateOffset) as Move
          );
      } else if (
        tile.isOccupied() &&
        candidateDistance == 7 &&
        this.getAlliance() != piece.getAlliance()
      ) {
        legalMoves.push(new AttackMove(board, this, currCandidateOffset));
      } else if (
        tile.isOccupied() &&
        candidateDistance == 9 &&
        this.getAlliance() != piece.getAlliance()
      ) {
        legalMoves.push(new AttackMove(board, this, currCandidateOffset));
      }
    }

    return legalMoves;
  }

  private noneAttachedMoves(
    board: Board,
    currCandidate: number
  ): Move | boolean {
    if (currCandidate == 8) {
      return new MajorMove(board, this, currCandidate);
    } else if (currCandidate == 16 && this.isFirstMove) {
      // first move (2 steeps)
      return new MajorMove(board, this, currCandidate);
    }
    return false;
  }
}
