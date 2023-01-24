import Alliance from "../board/Alliance";
import Board from "../board/Board";
import Move from "../board/Move";
import Piece from "../piece/Piece";
import Player from "./Player";

export default class WhitePlayer extends Player {
  protected getOpponent(): Player {
    return this._board.blackPlayer;
  }
  protected getAlliance(): Alliance {
    return Board.Alliances.black;
  }
  constructor(
    board: Board,
    legalMoves: Move[][],
    opponentLegalMoves: Move[][]
  ) {
    super(board, legalMoves, opponentLegalMoves);
  }

  protected getActivePieces(): Piece[] {
    return this._board.getWhitePieces();
  }
}
