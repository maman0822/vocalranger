interface ICanvasViewModel {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    Renderer: IRenderer;
    guitar: IGuitar;
    container: HTMLElement;
    deferred: JQueryDeferred<any>;
    MouseMove(e): void;
    redraw(): void;
    Click(e): void;
    loadSong(): void;
    playSong(data): void;
    playInitialSong(): void;
}

interface ISong {
    song: Array<number>
}
interface IFrets {
    FretOptions: Array<StringValPair>;
    NumberFrets: KnockoutObservable<number>;
    Hitboxes: Array<IHitbox>;
}

interface IRenderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    Render(guitar: IGuitar, xSize: number, ySize: number): void;
    RederHeadLine(guitar: IGuitar): void;
    DrawStrings(guitar: IGuitar): void;
    DrawFrets(guitar: IGuitar): void;
    DrawDots(guitar: IGuitar): void;
    DrawStringNames(guitar: IGuitar, xSize: number, ySize: number): void;
    DrawFretNumbers(guitar: IGuitar, xSize: number, ySize: number): void;
    DrawHitboxes(guitar: IGuitar, xSize: number, ySize: number): void;
}

interface IGuitarStrings {
    StringOptions: Array<StringValPair>;
    NumberStrings: KnockoutObservable<number>;
    StringNames: Array<string>
}

interface ITuning {
    TuningType: Array<string>;
    RootNote: Array<RootNotePair>;
    ChosenRootNoteText: KnockoutObservable<string>;
    ChosenRootNote: KnockoutObservable<number>;
    ChosenTuning: KnockoutObservable<string>;
    SelectTuning(tuning): void;
    SetDropIndex(): void;
}

interface ISound {
    NoteType: Array<string>;
    ChordType: Array<string>;
    ToneType: Array<string>;
    RecordOptions: Array<string>;
    ChosenChord: KnockoutObservable<string>;
    ChosenNote: KnockoutObservable<string>;
    ChosenTone: KnockoutObservable<string>;
    ChosenRecordOption: KnockoutObservable<string>;
    Freqs: Array<number>;
    SelectNote(note): void;
    SelectChord(chord): void;
    SelectTone(tone): void;
    SelectRecordOption(RecordOption): void;
    saveSong: Boolean;
    song: ISong;
    songFinished: Boolean;
}

interface IHitbox {
    Left: number;
    Right: number;
    Top: number;
    Bottom: number;
    setLeft(left): void;
    setRight(right): void;
    setTop(top): void;
    setBottom(bottom): void;
}

interface IDot {
    CirXInt: number;
    CirYInt: number;
    XPosition: number;
    Radius: number;
    Fret: number;
    YPosition: number;
    Octave: number;
    YPosition2: number;
}

interface IGuitar {
    Frets: IFrets;
    Strings: IGuitarStrings;
    XInterval: number;
    YInterval: number;
    XPosition: number;
    YPosition: number;
    Tuning: ITuning;
    Sound: ISound;
    PositionDots: Array<IDot>;
    dotAssign(xSize: number, ySize: number): void;
}
