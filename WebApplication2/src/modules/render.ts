import './drawMethods';
import {HitBox} from './Hitbox';
import {Guitar} from './guitar';

export class Renderer implements IRenderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    ChordHitboxes: Array<IHitbox>;
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
    }//END CONSTRUCTOR

    Render = (guitar: IGuitar, xSize: number, ySize: number): void => {
        //draw the thick headstock line
        this.RederHeadLine(guitar);
        //draw vertical line
        this.DrawFrets(guitar);
        //draw the horizontal line
        this.DrawStrings(guitar);
        //draw the fret positioning dots
        this.DrawDots(guitar);
        //draw the string name to the right of the string
        this.DrawStringNames(guitar, xSize, ySize);
        //draw the fret number above the fret
        this.DrawFretNumbers(guitar, xSize, ySize);
        Line(this.context, 4, "#8A0707", xSize, ySize - guitar.YInterval, this.canvas.width, 0);
        //this.DrawThickLine(guitar, xSize, ySize);
        this.DrawChordList(guitar, xSize, ySize);
    };

    RederHeadLine = (guitar: IGuitar): void => {
        Line(this.context, 4, "black", guitar.XPosition, guitar.YPosition, 0,
            guitar.YInterval * (guitar.Strings.NumberStrings() - 1));
    };

    DrawStrings = (guitar: IGuitar) => {
        var yPosition = guitar.YPosition;
        for (var i = 0; i < guitar.Strings.NumberStrings(); i++) {
            Line(this.context, 0.5 + (i * 0.33), "#a3a3a3", guitar.XPosition,
                yPosition, guitar.XInterval * guitar.Frets.NumberFrets(), 0);
            yPosition -= guitar.YInterval;
        }
    };

    DrawFrets = (guitar: IGuitar): void => {
        var xPosition = guitar.XPosition - guitar.XInterval;
        for (var i = 0; i < guitar.Frets.NumberFrets() - 1; i++) {
            Line(this.context, 2, "black", xPosition, guitar.YPosition, 0,
                guitar.YInterval * (guitar.Strings.NumberStrings() - 1));
            xPosition -= guitar.XInterval;
        }
    };

    DrawDots = (guitar: IGuitar): void => {
        //draw the position circles
        for (var i = 0; i < 10; i++) {
            if (guitar.PositionDots[i].Fret <= guitar.Frets.NumberFrets()) {
                Circle(this.context, guitar.PositionDots[i].XPosition,
                    guitar.PositionDots[i].YPosition, guitar.PositionDots[i].Radius, "black");
                if (guitar.PositionDots[i].Octave == 0) {
                    Circle(this.context, guitar.PositionDots[i].XPosition,
                        guitar.PositionDots[i].YPosition2, guitar.PositionDots[i].Radius, "black");
                }
            }
        }
    };

    DrawStringNames = (guitar: IGuitar, xSize: number, ySize: number): void => {
        for (var i = 0; i < guitar.Strings.NumberStrings(); i++) {
            text(this.context, (xSize - 1.15 * guitar.XInterval),
                (ySize - (i + 1) * guitar.YInterval - 0.85 * guitar.YInterval), "1.5em Arial",
                guitar.Strings.StringNames[i]);
        }
    };

    DrawFretNumbers = (guitar: IGuitar, xSize: number, ySize: number): void => {
        for (var i = 0; i < guitar.Frets.NumberFrets(); i++) {
            text(this.context, (xSize - (2.12 + i) * guitar.XInterval),
                (ySize - ((guitar.Strings.NumberStrings() + 1.5) * guitar.YInterval) + 0.2 * guitar.YInterval), "1.5em Arial",
                (i + 1).toString());
        }
    };

    DrawHitboxes = (guitar: IGuitar, xSize: number, ySize: number): void => {
        guitar.Frets.Hitboxes = [];
        for (var i = 1; i <= guitar.Strings.NumberStrings(); i++) {
            for (var j = guitar.Frets.NumberFrets() + 1; j > 0; j--) {
                guitar.Frets.Hitboxes.push(new HitBox(this.context, xSize, ySize, guitar.XInterval, guitar.YInterval,
                    (0.6 * guitar.YInterval), i, j));
            }
        }
    };

    DrawChordList = (guitar: IGuitar, xSize: number, ySize: number) => {
        var Chords: Array<string> = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
        for (let i = 0; i < 12; i++) {
            text(this.context, (i + 1) * 1.1 * guitar.XInterval, ySize - 0.3 * guitar.YInterval, "1em", Chords[i]);
            InvisibleRect(this.context, (i + 0.9) * 1.1 * guitar.XInterval, ySize - guitar.YInterval, 0.7 * guitar.YInterval, 0.75 * guitar.YInterval);
            /*guitar.Frets.Hitboxes.push(new HitBox(this.context, xSize, ySize, guitar.XInterval, guitar.YInterval,
                                          (0.6 * guitar.YInterval), 20, 20));
            guitar.Frets.Hitboxes[guitar.Frets.Hitboxes.length-1].setLeft((i + 0.9) * 1.1 * guitar.XInterval);
            guitar.Frets.Hitboxes[guitar.Frets.Hitboxes.length-1].setTop(ySize - guitar.YInterval);
            guitar.Frets.Hitboxes[guitar.Frets.Hitboxes.length-1].setRight(((i + 0.9) * 1.1 * guitar.XInterval) + 0.9 * guitar.YInterval);
            guitar.Frets.Hitboxes[guitar.Frets.Hitboxes.length-1].setBottom((ySize - guitar.YInterval) + 0.75*guitar.YInterval);*/
            //this.context.strokeRect((i + 0.9) * 1.1 * guitar.XInterval, ySize -  guitar.YInterval, 0.9*guitar.YInterval, 0.75*guitar.YInterval);
        }
    };
}
