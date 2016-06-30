import {Frets} from './fret';
import {GuitarStrings} from './string';
import {Tuning} from './tuning';
import {Dot} from './dot';
import {Sound} from './sound';
import {HitBox} from './Hitbox';


var DPos = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
export class Guitar implements IGuitar {
    //Frets properties
    Frets: IFrets;
    //String properties
    Strings: IGuitarStrings;
    //Fret interval
    XInterval: number;
    //String interval
    YInterval: number;
    //starting position on x-axis
    XPosition: number;
    //starting position on y-axis
    YPosition: number;
    //Tuning properties
    Tuning: ITuning;
    //Sound properties
    Sound: ISound;
    //positioning dots
    PositionDots: Array<IDot>;
    //Hit regions of the Chords
    ChordHitRegions: Array<IHitbox>;

    // update values once number of string and frets change
    constructor(xSize: number, ySize: number) {
        this.Frets = new Frets();
        this.Strings = new GuitarStrings();
        this.XInterval = xSize / (this.Frets.NumberFrets() + 3);
        this.YInterval = ySize / (this.Strings.NumberStrings() + 2);
        this.XPosition = xSize - 1.5 * this.XInterval;
        this.YPosition = ySize - 2 * this.YInterval;
        this.Tuning = new Tuning();
        this.Sound = new Sound();
        this.PositionDots = [];
        this.ChordHitRegions = [];
        this.dotAssign(xSize, ySize);
        this.Strings.NumberStrings.subscribe(() => {
            this.YInterval = ySize / (this.Strings.NumberStrings() + 2);
            this.YPosition = ySize - 2 * this.YInterval;
            this.dotAssign(xSize, ySize);
        });
        this.Frets.NumberFrets.subscribe(() => {
            this.XInterval = xSize / (this.Frets.NumberFrets() + 3);
            this.XPosition = xSize - 1.5 * this.XInterval;
            this.dotAssign(xSize, ySize);
        });

    }
    dotAssign = (xSize: number, ySize: number) => {
        this.PositionDots = [];
        for (let i = 0; i < 10; i++) {
            this.PositionDots.push(new Dot(xSize, ySize, DPos[i], this.Strings.NumberStrings(), this.XInterval, this.YInterval));
        }
    }
};
