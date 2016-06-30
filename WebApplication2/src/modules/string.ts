import * as ko from 'knockout';

export class GuitarStrings implements IGuitarStrings {
    StringOptions: Array<StringValPair>;
    NumberStrings: KnockoutObservable<number>;
    StringNames: Array<string>;
    constructor() {
        this.StringOptions = [{ text: "6 Strings", val: 6 },
            { text: "7 Strings", val: 7 },
            { text: "8 Strings", val: 8 }];
        if (localStorage.getItem("NumStrings") == null)
            localStorage.setItem("NumStrings", "6");
        this.NumberStrings = ko.observable((localStorage.getItem("NumStrings")));
        this.StringNames = ["e", "B", "G", "D", "A", "E", "B", "F#"];
        this.NumberStrings.subscribe(() => {
            localStorage.setItem("NumStrings", this.NumberStrings().toString());
        });
    }
}
