export default abstract class Alliance {
  abstract getDirection(): number;
  protected abstract _name: string;
  abstract get name(): string;
  abstract get isWhite(): boolean;
  abstract get isBlack(): boolean;
}

export class White extends Alliance {
  protected _name: string = "White";
  getDirection(): number {
    return -1;
  }

  public get name(): string {
    return this._name;
  }

  public get isWhite(): boolean {
    return true;
  }

  public get isBlack(): boolean {
    return false;
  }
}

export class Black extends Alliance {
  protected _name: string = "Black";
  getDirection(): number {
    return 1;
  }

  public get name(): string {
    return this._name;
  }

  public get isWhite(): boolean {
    return false;
  }

  public get isBlack(): boolean {
    return true;
  }
}
