export default abstract class BoardUtils {
  static isFirstColumn: boolean[] = this.initColumns(0);
  static isSecondeColumn: boolean[] = this.initColumns(1);
  static isSeventhColumn: boolean[] = this.initColumns(0);
  static isEighthColumn: boolean[] = this.initColumns(7);
  static TILES_CELLS: number = 64;
  static NUM_COLS: number = 8;
  private constructor() {
    throw new Error("BoardUtils cannot be instantiated", {});
  }

  // get Column boolean index
  private static initColumns(columnNumber: number): boolean[] {
    let columns: boolean[] = Array<boolean>(BoardUtils.NUM_COLS);
    do {
      columns[columnNumber] = true;
      columnNumber += BoardUtils.NUM_COLS;
    } while (columnNumber < BoardUtils.TILES_CELLS);
    return columns;
  }

  public static isValidTileCoordinates(coordinates: number) {
    return 0 <= coordinates && coordinates < BoardUtils.TILES_CELLS;
  }
}
