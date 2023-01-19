import Piece from "../piece/Piece";
import BoardUtils from "./BoardUtils";

export abstract class Tile {
  protected tileCoordinate: number;
  private static emptyTilesCash: { [i: number]: EmptyTile } =
    this.createAllPossibleEmptyTiles();
  constructor(tileCoordinate: number) {
    this.tileCoordinate = tileCoordinate;
  }

  public abstract isOccupied(): boolean;
  public abstract getPiece(): Piece | null;

  private static createAllPossibleEmptyTiles(): { [i: number]: EmptyTile } {
    let emptyTiles: { [i: number]: EmptyTile } = {};
    for (let i = 0; i < BoardUtils.TILES_CELLS; i++) {
      emptyTiles[i] = new EmptyTile(i);
    }
    return emptyTiles;
  }

  public static CreateTile(tileCoordinate: number, piece: Piece | null): Tile {
    return piece != null
      ? new OccupiedTile(tileCoordinate, piece)
      : this.emptyTilesCash[tileCoordinate];
  }
}

export class EmptyTile extends Tile {
  constructor(tileCoordinate: number) {
    super(tileCoordinate);
  }

  public isOccupied(): boolean {
    return false;
  }

  public getPiece(): null {
    return null;
  }
}

export default class OccupiedTile extends Tile {
  private piece: Piece;

  constructor(tileCoordinate: number, piece: Piece) {
    super(tileCoordinate);
    this.piece = piece;
  }

  getPiece(): Piece {
    return this.piece;
  }

  public isOccupied(): boolean {
    return true;
  }
}
