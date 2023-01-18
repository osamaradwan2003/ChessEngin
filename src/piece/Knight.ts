import Alliance from "../board/Alliance";
import Board from "../board/Board";
import BoardUtils from "../board/BoardUtils";
import Move, { AttackMove, MajorMove } from "../board/Move";
import Tile from "../board/Tile";
import Piece from "./Piece";

export default class Knight extends Piece {
  private static candidateCoordinates: Array<number> = [-17, -15, -10, -6];
  constructor(piecePosition: number, alliance: Alliance) {
    super(piecePosition, alliance);
  }

  //override
  public getLegalMoves(board: Board): Move[] {
    let candidateDistance: number,
      legalMoves: Move[] = [];

    for (let currCandidate of Knight.candidateCoordinates) {
      candidateDistance = this.piecePosition + currCandidate;
      if (
        !BoardUtils.isValidTileCoordinates(candidateDistance) ||
        this.Exclusions(this.piecePosition, currCandidate)
      ) {
        continue;
      }
      let tile: Tile = board.getTile(candidateDistance);

      if (!tile.isOccupied())
        legalMoves.push(new MajorMove(board, this, candidateDistance));
      else {
        const piece: Piece = tile.getPice(),
          alliance: string = piece.getAlliance();
        if (this.alliance.name != alliance)
          legalMoves.push(new AttackMove(board, this, candidateDistance));
      }
    }
    return legalMoves;
  }

  firstColumnExclusion(currPosition: number, currCandidate: number): boolean {
    return (
      BoardUtils.isFirstColumn[currPosition] &&
      (currCandidate == -17 ||
        currCandidate == -10 ||
        currCandidate == 6 ||
        currCandidate == 15)
    );
  }

  secondeColumnExclusion(currPosition: number, currCandidate: number): boolean {
    return (
      BoardUtils.isSecondeColumn[currPosition] &&
      (currCandidate == -10 || currCandidate == 6)
    );
  }

  seventhColumnExclusion(currPosition: number, currCandidate: number): boolean {
    return (
      BoardUtils.isSeventhColumn[currPosition] &&
      (currCandidate == 10 || currCandidate == -6)
    );
  }

  eighthColumnExclusion(currPosition: number, currCandidate: number): boolean {
    return (
      BoardUtils.isEighthColumn[currPosition] &&
      (currCandidate == 17 ||
        currCandidate == 10 ||
        currCandidate == -6 ||
        currCandidate == -15)
    );
  }

  Exclusions(currPosition: number, candidatePosition: number): boolean {
    return (
      this.firstColumnExclusion(currPosition, candidatePosition) ||
      this.secondeColumnExclusion(currPosition, candidatePosition) ||
      this.seventhColumnExclusion(candidatePosition, candidatePosition) ||
      this.eighthColumnExclusion(candidatePosition, candidatePosition)
    );
  }
}
