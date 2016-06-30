// import './requireConfig.ts';
import './modules/drawMethods';
import * as ko from 'knockout';
import {Guitar} from './modules/guitar';
import {Renderer} from './modules/render';
import * as $ from 'jquery';


export class canvasViweModel implements ICanvasViewModel {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvas2: HTMLCanvasElement;
    ctx2: CanvasRenderingContext2D;
    Renderer: IRenderer;
    Renderer2: IRenderer;
    guitar: IGuitar;
    container: HTMLElement;
    deferred: JQueryDeferred<void>;
    
    constructor() {
        //experimenting with deferreds
        this.deferred = $.Deferred<void>();

        //canvas element
        this.canvas = document.getElementById("Fretboard") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        //canvas element
        this.canvas2 = document.getElementById("Animations") as HTMLCanvasElement;
        this.ctx2 = this.canvas2.getContext("2d");

        this.Renderer = new Renderer(this.canvas, this.ctx);
        this.Renderer2 = new Renderer(this.canvas2, this.ctx2);

        //get the size of the canvas and container
        this.container = this.canvas.parentElement;
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        this.canvas2.width = this.canvas.width;
        this.canvas2.height = this.canvas.height;
        this.guitar = new Guitar(this.canvas.width, this.canvas.height);
        

        //render the guitar
        this.Renderer.Render(this.guitar, this.canvas.width, this.canvas.height);
        this.Renderer2.DrawHitboxes(this.guitar, this.canvas.width, this.canvas.height);
        // draw the canvas when the the string and fret numbers change
        this.guitar.Strings.NumberStrings.subscribe(() => {
            this.redraw();
            this.Renderer2.DrawHitboxes(this.guitar, this.canvas.width, this.canvas.height);
        });
        this.guitar.Frets.NumberFrets.subscribe(() => {
            this.redraw();
            this.Renderer2.DrawHitboxes(this.guitar, this.canvas.width, this.canvas.height);
        });

        //experiment
        this.deferred.promise().then((a) => {
            console.log("Canvas was redrawn");
        });

        // Redraw the canvas when the window resizes
        window.onresize = () => {
            this.Renderer.Render(this.guitar, this.canvas.width, this.canvas.height);
            this.Renderer2.DrawHitboxes(this.guitar, this.canvas.width, this.canvas.height);
        };
        //click response
        this.canvas2.addEventListener('click', this.Click);
        //change mouse cursor on clickable areas
        this.canvas2.addEventListener('mousemove', this.MouseMove);
        this.canvas2.addEventListener('mouseleave', () => { this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height); })
        this.playInitialSong();
    } // End constructor

    playInitialSong = ():void => {
        var req = new XMLHttpRequest();
        req.open('GET', "/api/Song/GetSong", true);
        req.onload = function () {
            if (req.status >= 200 && req.status < 400) {
                var data: ISong = JSON.parse(req.responseText);
                console.log(data);
                //this.playSong(data);
            }
        }
        req.send();
    }

    Click = (e): void => {
        //Mouse Coordinates
        var xPos = e.offsetX;
        var yPos = e.offsetY;

        //variable used to entify the frequency of the clicked fret
        var freqIndex = this.guitar.Tuning.ChosenRootNote() - (this.guitar.Frets.NumberFrets() - 12);

        //this variable is used to set the correct notes on different strings
        var freqOffset = 0;

        //Identify the clicked fret and set the corrosponding frequency
        for (var i = 0; i < (this.guitar.Frets.NumberFrets() + 1) * this.guitar.Strings.NumberStrings(); i++) {
            //Next string
            if (i % (this.guitar.Frets.NumberFrets() + 1) == 0 && i != 0) {
                //offset between strings
                freqIndex -= 8 + (this.guitar.Frets.NumberFrets() - 12);

                //B string offset
                if (freqOffset == 1) {
                    freqIndex -= 1;
                }

                //Drop tuning offset
                if (this.guitar.Tuning.ChosenTuning() == "Drop") {
                    if (freqOffset == (this.guitar.Strings.NumberStrings() - 2)) {
                        freqIndex += 2;
                    }
                }
                freqOffset++;
            }
            
            
            //Play the note
            if (xPos < this.guitar.Frets.Hitboxes[i].Right && xPos > this.guitar.Frets.Hitboxes[i].Left && yPos > this.guitar.Frets.Hitboxes[i].Top &&
                yPos < this.guitar.Frets.Hitboxes[i].Bottom) {
                var ac: any = new AudioContext();
                var o = ac.createOscillator();
                o.frequency.value = this.guitar.Sound.Freqs[freqIndex];
                var gainNode = ac.createGain();
                gainNode.gain.value = 1;
                var distortion = ac.createWaveShaper();
                if (this.guitar.Sound.ChosenTone() == "Clean") {
                    distortion.curve = makeDistortionCurve(0);
                }
                else {
                    distortion.oversample = '4x';
                    distortion.curve = makeDistortionCurve(20000);
                }
                o.start(0);
                o.stop(0.5);
                var centerX = this.guitar.Frets.Hitboxes[i].Right - this.guitar.Frets.Hitboxes[i].Left;
                var centerY = this.guitar.Frets.Hitboxes[i].Bottom - this.guitar.Frets.Hitboxes[i].Top;
                Circle(this.ctx, (this.guitar.Frets.Hitboxes[i].Left + 0.5 * centerX), (this.guitar.Frets.Hitboxes[i].Top + 0.5 * centerY), 0.205 * centerY, "black");
                o.connect(gainNode);
                gainNode.connect(distortion);
                distortion.connect(ac.destination);
                setTimeout(() => {
                    this.redraw();
                }, 500);
                setTimeout(() => {
                    ac.close();
                }, 500);
                //save the song
                if (this.guitar.Sound.saveSong == true) {
                    this.guitar.Sound.song.song.push(freqIndex);
                }
            }
            freqIndex++;
        }
        
    };

    MouseMove = (e): void => {
        //mouse coordinates
        var xPos: number = e.offsetX;
        var yPos: number = e.offsetY;

        //variable to discover a clickable area
        var found: number = -1;

        //Looks for a clickable area
        for (let i = 0; i < this.guitar.Frets.Hitboxes.length; i++) {
            if (xPos < this.guitar.Frets.Hitboxes[i].Right && xPos > this.guitar.Frets.Hitboxes[i].Left && yPos > this.guitar.Frets.Hitboxes[i].Top &&
                yPos < this.guitar.Frets.Hitboxes[i].Bottom) {
                found = i;
            }
        }
        this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);

        

        //change the mouse cursor if the mouse is hovering on a clickable area
        if (found >= 0) {
            this.canvas2.style.cursor = "pointer";
            //Draw a ring when hovering
            var centerX = this.guitar.Frets.Hitboxes[found].Right - this.guitar.Frets.Hitboxes[found].Left;
            var centerY = this.guitar.Frets.Hitboxes[found].Bottom - this.guitar.Frets.Hitboxes[found].Top;
            Ring(this.ctx2, (this.guitar.Frets.Hitboxes[found].Left + 0.5 * centerX), (this.guitar.Frets.Hitboxes[found].Top + 0.5 * centerY), 0.25 * centerY, "#FF0000");
        }
        //reset the mouse cursor to default
        else {
            this.canvas2.style.cursor = "default";
        }
    };

    redraw = (): void => {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        window.requestAnimationFrame(() => {
            this.Renderer.Render(this.guitar, this.canvas.width, this.canvas.height);
            this.deferred.resolve();
        });
    };

    loadSong = (): void => {
        let uploader: HTMLInputElement = document.getElementById('songLoad') as HTMLInputElement;

        if (uploader) {
            // Make sure at least one file was selected
            if (uploader.files.length > 0) {
                // Read the file!
                let reader: FileReader = new FileReader();

                // Function for when the file is done being read
                reader.onload = () => {
                    let data: ISong = JSON.parse(reader.result);
                    console.log(data);
                    this.playSong(data);

                };

                // Read the first file
                reader.readAsText(uploader.files[0]);
            }
        }
    }

    playSong = (data: ISong): void => {
        var ac: any = new AudioContext();
        var osc: Array<OscillatorNode> = [];
        for (var i = 0; i < data.song.length; i++) {
            var o: OscillatorNode = ac.createOscillator();
            var y: number = data.song[i];

            var freq = this.guitar.Sound.Freqs[y];
            console.log(freq);
            console.log("Frequency: " + this.guitar.Sound.Freqs[y]);

            o.frequency.value = freq;
            var gainNode = ac.createGain();
            gainNode.gain.value = 1;
            var distortion = ac.createWaveShaper();
            if (this.guitar.Sound.ChosenTone() == "Clean") {
                distortion.curve = makeDistortionCurve(0);
            }
            else {
                distortion.oversample = '4x';
                distortion.curve = makeDistortionCurve(20000);
            }
            o.connect(gainNode);
            gainNode.connect(distortion);
            distortion.connect(ac.destination);
            o.start(0);
            o.stop(0.5);
        }
    };
}


function makeDistortionCurve(amount: number) { //Taken from the example out of the mozilla developer website
    var k = amount,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
        var x = i * 2 / n_samples - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
};


