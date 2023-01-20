import { Knight, Pawn, Bishop, King, Queen, Rook } from "../piece";
import Alliance, { Black, White } from "./Alliance";
import BoardUtils from "./BoardUtils";
import Builder from "./Builder";
import Tile from "./Tile";

export default class Board {
  private builder: Builder;
  private gameBoard: Tile[];
  private Alliances: { white: Alliance; black: Alliance };
  static Alliances: { white: Alliance; black: Alliance } = {
    white: new White(),
    black: new Black(),
  };
  private whitePieces: Tile[];
  private blackPieces: Tile[];

  constructor(builder: Builder) {
    this.builder = builder;
    this.gameBoard = this.createGameBoard();
    this.Alliances = { white: new White(), black: new Black() };
    this.whitePieces = this.getActivePieces(this.Alliances.white);
    this.blackPieces = this.getActivePieces(this.Alliances.black);
  }

  public toString(): string {
    let gameBoard: string = ``;
    for (let i = 0; i < BoardUtils.TILES_CELLS; i++) {
      gameBoard += this.gameBoard[i].getPiece()?.toString() || "_";
      if ((i + 1) % BoardUtils.NUM_COLS == 0) gameBoard += "\n";
    }
    return gameBoard;
  }

  private getActivePieces(alliance: Alliance): Tile[] {
    const activePieces: Tile[] = [];
    for (let tile of this.gameBoard) {
      const piece = tile.getPiece();
      if (tile.isOccupied() && piece.getAlliance() == alliance.name) {
        activePieces.push(tile);
      }
    }
    return activePieces;
  }
  private createGameBoard(): Tile[] {
    const tiles: Tile[] = [];

    for (let i = 0; i < BoardUtils.TILES_CELLS; i++) {
      /* @ts-ignore skip this error */
      tiles.push(Tile.CreateTile(i, this.builder.boardConfig[i]));
    }

    return tiles;
  }

  static createStandardGame() {
    const builder: Builder = new Builder();
    // Black Team
    builder.setPiece(new Rook(0, Board.Alliances.black));
    builder.setPiece(new Knight(1, Board.Alliances.black));
    builder.setPiece(new Bishop(2, Board.Alliances.black));
    builder.setPiece(new Queen(3, Board.Alliances.black));
    builder.setPiece(new King(4, Board.Alliances.black));
    builder.setPiece(new Bishop(5, Board.Alliances.black));
    builder.setPiece(new Knight(6, Board.Alliances.black));
    builder.setPiece(new Rook(7, Board.Alliances.black));
    builder.setPiece(new Pawn(8, Board.Alliances.black));
    builder.setPiece(new Pawn(9, Board.Alliances.black));
    builder.setPiece(new Pawn(10, Board.Alliances.black));
    builder.setPiece(new Pawn(11, Board.Alliances.black));
    builder.setPiece(new Pawn(12, Board.Alliances.black));
    builder.setPiece(new Pawn(13, Board.Alliances.black));
    builder.setPiece(new Pawn(14, Board.Alliances.black));
    builder.setPiece(new Pawn(15, Board.Alliances.black));

    // White Team
    builder.setPiece(new Pawn(48, Board.Alliances.black));
    builder.setPiece(new Pawn(49, Board.Alliances.black));
    builder.setPiece(new Pawn(50, Board.Alliances.black));
    builder.setPiece(new Pawn(51, Board.Alliances.black));
    builder.setPiece(new Pawn(52, Board.Alliances.black));
    builder.setPiece(new Pawn(53, Board.Alliances.black));
    builder.setPiece(new Pawn(54, Board.Alliances.black));
    builder.setPiece(new Pawn(55, Board.Alliances.black));
    builder.setPiece(new Rook(56, Board.Alliances.black));
    builder.setPiece(new Knight(57, Board.Alliances.black));
    builder.setPiece(new Bishop(58, Board.Alliances.black));
    builder.setPiece(new Queen(59, Board.Alliances.black));
    builder.setPiece(new King(60, Board.Alliances.black));
    builder.setPiece(new Bishop(61, Board.Alliances.black));
    builder.setPiece(new Knight(62, Board.Alliances.black));
    builder.setPiece(new Rook(63, Board.Alliances.black));
    builder.setMoveMaker(Board.Alliances.white);
    return builder.build();
  }

  getTile(_candidateDistance: number): Tile {
    return this.gameBoard[_candidateDistance];
  }
}
