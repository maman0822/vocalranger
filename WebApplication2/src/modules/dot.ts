export class Dot implements IDot {
    //offsets to draw the dot in the middle of the fret
    CirXInt: number;
    CirYInt: number;
    //Positions of the dot
    XPosition: number;
    YPosition: number;
    Radius: number;
    //Fret number
    Fret: number;
    //multiple of 12th fret
    Octave: number;
    YPosition2: number;
    constructor(xSize: number, ySize: number, fretNumber: number, numStrings: number, xInterval: number, yInterval: number) {
        this.CirXInt = fretNumber + 1;
        this.CirYInt = (numStrings / 2) + 1.5;
        this.XPosition = xSize - (this.CirXInt * xInterval);
        this.Radius = xInterval / 10;
        this.Fret = fretNumber;
        this.YPosition = ySize - this.CirYInt * yInterval;
        this.Octave = this.Fret % 12;
        if (this.Octave == 0) {
            this.YPosition = ySize - (this.CirYInt - 1) * yInterval;
            this.YPosition2 = ySize - (this.CirYInt + 1) * yInterval;
        }
    }
}
