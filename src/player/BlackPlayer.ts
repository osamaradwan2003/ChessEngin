import Alliance from "../board/Alliance";
import Board from "../board/Board";
import Move from "../board/Move";
import Piece from "../piece/Piece";
import Player from "./Player";

export default class BlackPlayer extends Player {
  constructor(
    board: Board,
    legalMoves: Move[][],
    opponentLegalMoves: Move[][]
  ) {
    super(board, legalMoves, opponentLegalMoves);
  }

  protected getActivePieces(): Piece[] {
    return this._board.getBlackPieces();
  }

  protected getOpponent(): Player {
    return this._board.whitePlayer;
  }
  protected getAlliance(): Alliance {
    return Board.Alliances.white;
  }
}
