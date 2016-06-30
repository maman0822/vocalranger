import * as ko from 'knockout';

export class Frets implements IFrets {
    //Options displayed on UI for number of frets
    FretOptions: Array<StringValPair>;
    NumberFrets: KnockoutObservable<number>;
    //Hitboxes on the frets
    Hitboxes: Array<IHitbox>;
    constructor() {
        this.FretOptions = [{ text: "12 Frets", val: 12 },
            { text: "22 Frets", val: 22 },
            { text: "24 Frets", val: 24 }];
        if (localStorage.getItem("NumFrets") == null)
            localStorage.setItem("NumFrets", "12");
        this.NumberFrets = ko.observable(localStorage.getItem("NumFrets"));
        this.Hitboxes = [];
        this.NumberFrets.subscribe(() => {
            localStorage.setItem("NumFrets", this.NumberFrets().toString());
        });

        
    }
}
