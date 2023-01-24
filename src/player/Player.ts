import Alliance from "../board/Alliance";
import Board from "../board/Board";
import Move from "../board/Move";
import Piece from "../piece/Piece";
import TransitionMove from "./TransitionMove";

export default abstract class Player {
  protected _board: Board;
  protected _legalMoves: Move[][];
  protected _opponentLegalMoves: Move[][];
  protected _king: Piece;
  private _isInCheck: boolean;
  constructor(
    board: Board,
    legalMoves: Move[][],
    opponentLegalMoves: Move[][]
  ) {
    this._board = board;
    this._legalMoves = legalMoves;
    this._opponentLegalMoves = opponentLegalMoves;
    this._king = this.establishKing();
    this._isInCheck = !(
      Player.attacksOnTile(this._king.position, this._opponentLegalMoves.flat())
        .length == 0
    );
  }

  public static attacksOnTile(
    position: number,
    opponentLegalMoves: Move[]
  ): Move[] {
    const attacksMove: Move[] = [];
    for (let move of opponentLegalMoves) {
      if (position === move.getDestinationCoordinates()) {
        attacksMove.push(move);
      }
    }
    return attacksMove;
  }

  protected establishKing(): Piece {
    for (let piece of this.getActivePieces()) {
      if (piece.name == "k" || piece.name == "K") {
        return piece;
      }
    }
    throw new Error("Invalid Game Board");
  }

  isLegalMove(move: Move): boolean {
    return this._legalMoves.flat().includes(move);
  }

  private hasEscapeMove(): boolean {
    for (let move of this._legalMoves.flat()) {
      let moveTransition = this.makMove(move);
      if (moveTransition.getStatus().isDone) {
        return true;
      }
    }

    return false;
  }

  public isInCheck() {
    return this._isInCheck;
  }

  public isInCheckMate() {
    return this._isInCheck && !this.hasEscapeMove();
  }

  // TODO: implement this methods below
  public isCastled() {
    return false;
  }

  public makMove(move: Move): TransitionMove {
    return new TransitionMove(this._board, move, this);
  }

  protected abstract getActivePieces(): Piece[];
  protected abstract getOpponent(): Player;
  protected abstract getAlliance(): Alliance;
}
