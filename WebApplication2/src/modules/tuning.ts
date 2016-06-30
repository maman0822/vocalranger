import * as ko from 'knockout';

export class Tuning implements ITuning {
    TuningType: Array<string>;
    RootNote: Array<RootNotePair>;
    ChosenRootNoteText: KnockoutObservable<string>;
    ChosenRootNote: KnockoutObservable<number>;
    ChosenTuning: KnockoutObservable<string>;

    // Change the root note to be displayed when the root note and/or type of tuning are changed
    constructor() {
        this.TuningType = ["Standard", "Drop"];
        this.RootNote = [{ Note: "A", index: 13 }, { Note: "A#", index: 12 },
            { Note: "B", index: 23 }, { Note: "C", index: 22 },
            { Note: "C#", index: 21 }, { Note: "D", index: 20 },
            { Note: "D#", index: 19 }, { Note: "E", index: 18 },
            { Note: "F", index: 17 }, { Note: "F#", index: 16 },
            { Note: "G", index: 15 }, { Note: "G#", index: 14 }];
        if (localStorage.getItem("Tuning") == null)
            localStorage.setItem("Tuning", "Standard");
        if (localStorage.getItem("RootNote") == null)
            localStorage.setItem("RootNote", "E");
        if (localStorage.getItem("RootNoteIndex") == null)
            localStorage.setItem("RootNoteIndex", "18");
        this.ChosenRootNoteText = ko.observable(localStorage.getItem("RootNote"));
        this.ChosenRootNote = ko.observable(localStorage.getItem("RootNoteIndex"));
        this.ChosenTuning = ko.observable(localStorage.getItem("Tuning"));
        //If the tuning changes, set the frequency index
        this.ChosenRootNote.subscribe(() => {
            this.SetDropIndex();
            localStorage.setItem("RootNoteIndex", this.ChosenRootNote().toString());
        });

        this.ChosenTuning.subscribe(() => {
            this.SetDropIndex();
            localStorage.setItem("Tuning", this.ChosenTuning());
        });
    } // End constructor

    //Function to select the correct tuning from the UI
    SelectTuning = (tuning) => { this.ChosenTuning(tuning); localStorage.setItem("Tuning", this.ChosenTuning());};
    //Sets the frequency index offset for different tunings
    SetDropIndex = () => {
        for (let i = 0; i < 12; i++) {
            if (this.ChosenRootNote() == this.RootNote[i].index) {
                if (this.ChosenTuning() == "Drop") {
                    var dropIndex: number;
                    if (i == 0)
                        dropIndex = 10;
                    else if (i == 1)
                        dropIndex = 11;
                    else
                        dropIndex = i - 2;
                    this.ChosenRootNoteText(this.RootNote[dropIndex].Note);
                    //this.guitar.NumberStrings(this.RootNote[dropIndex].Note);
                }
                else {
                    this.ChosenRootNoteText(this.RootNote[i].Note);
                    //this.guitar.rootNote = this.RootNote[i].Note;
                }
            }
        }
    }
};
