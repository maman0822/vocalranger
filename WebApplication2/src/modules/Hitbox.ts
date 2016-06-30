import './drawMethods';

export class HitBox implements IHitbox {
    //Coordinates
    Left: number;
    Right: number;
    Top: number;
    Bottom: number;
    constructor(context: CanvasRenderingContext2D, xSize: number, ySize: number, xInterval: number, yInterval: number, height: number, str: number, fret: number) {
        //this.draw = new Draw(context);
        this.Left = xSize - (fret + 0.5) * xInterval;
        this.Right = (this.Left + xInterval) - 3;
        this.Top = ySize - (str + 1) * yInterval - 0.5 * height;
        this.Bottom = this.Top + height;
        InvisibleRect(context, this.Left, this.Top, xInterval, height);
    }
    setLeft = (left) => {
        this.Left = left;
    }
    setRight = (right) => {
        this.Right = right;
    }
    setTop = (top) => {
        this.Top = top;
    }
    setBottom = (bottom) => {
        this.Bottom = bottom;
    }
}
