export default abstract class Alliance {
  abstract getDirection(): number;
  protected abstract _name: string;
  abstract get name(): string;
}

export class White extends Alliance {
  protected _name: string = "White";
  getDirection(): number {
    return -1;
  }

  public get name(): string {
    return this._name;
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
}
