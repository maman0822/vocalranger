import * as ko from 'knockout';

export class Sound {
    NoteType: Array<string>;
    ChordType: Array<string>;
    ToneType: Array<string>;
    RecordOptions: Array<string>;

    ChosenChord: KnockoutObservable<string>;
    ChosenNote: KnockoutObservable<string>;
    ChosenTone: KnockoutObservable<string>;
    ChosenRecordOption: KnockoutObservable<string>;
    Freqs: Array<number>;
    saveSong: Boolean;
    song: ISong;
    songFinished: Boolean;

    constructor() {
        this.NoteType = ["Fret", "Chord"];
        this.ChordType = ["Major", "Minor"];
        this.ToneType = ["Clean", "Distorted"];
        this.RecordOptions = ["Stop", "Record"];

        if (localStorage.getItem("ChordType") == null)
            localStorage.setItem("ChordType", "Major");
        if (localStorage.getItem("Tone") == null)
            localStorage.setItem("Tone", "Clean");
        if (localStorage.getItem("Note") == null)
            localStorage.setItem("Note", "Chord");
        if (localStorage.getItem("Record") == null)
            localStorage.setItem("Record", "Stop");
        this.ChosenChord = ko.observable(localStorage.getItem("ChordType"));
        this.ChosenNote = ko.observable(localStorage.getItem("Note"));
        this.ChosenTone = ko.observable(localStorage.getItem("Tone"));
        this.ChosenRecordOption = ko.observable(localStorage.getItem("Record"));
        this.Freqs = [1865, 1760, 1661, 1568, 1480, 1397, 1319, 1245, 1175, 1109, 1047,
            987, 932.3, 880, 830.6, 784, 740, 698.5, 659.3, 622.3, 587.3,
            554.4, 523.3, 493.9, 466.2, 440, 415.3, 392, 370, 349.2, 329.6,
            311.1, 293.7, 277.2, 261.6, 246.9, 233.1, 220, 207.7, 196, 185,
            174.6, 164.8, 155.6, 146.8, 138.6, 130.8, 123.5, 116.5, 110,
            103.8, 98, 92.5, 87.31, 82.41, 77.78, 73.42, 69.30, 65.41,
            61.74, 58.27, 55, 51.91, 49, 46.25, 43.65, 41.20, 38.89, 36.71,
            34.65, 32.70, 30.87];
        this.saveSong = false;
        this.song = { song: [] };
    }

    SelectNote = (note) => { this.ChosenNote(note); localStorage.setItem("Note", note); };
    SelectChord = (chord) => { this.ChosenChord(chord); localStorage.setItem("Chord", chord);};
    SelectTone = (tone) => { this.ChosenTone(tone); localStorage.setItem("Tone", tone);};
    SelectRecordOption = (RecordOption) => {
        this.ChosenRecordOption(RecordOption);
        if (this.ChosenRecordOption() == "Stop") {
            this.songFinished = true;
            this.saveSong = false;
            if (this.songFinished == true) {
                let data: Blob = new Blob([JSON.stringify(this.song)], { type: "application/json" });
                let virtualLink: HTMLAnchorElement = document.createElement('a');
                virtualLink.setAttribute('download', 'SavedSong.json');
                virtualLink.href = URL.createObjectURL(data);
                virtualLink.click();
            }
            this.song.song = [];
            localStorage.setItem("Record", RecordOption);
        }
        else {
            this.saveSong = true;
            this.songFinished = false;
        }
    };
}
