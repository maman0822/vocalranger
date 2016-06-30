//Draws text on the canvas
function text(context: CanvasRenderingContext2D, xPosition: number,
    yPosition: number, size: string, text: string): void {
    context.font = size;
    context.fillText(text, xPosition, yPosition);
};

//Draws a line on the canvas
function Line(context: CanvasRenderingContext2D, lineThick: number,
    lineColor: string, xPosition: number, yPosition: number,
    width: number, height: number): void {
    context.beginPath();
    context.lineWidth = lineThick;
    context.strokeStyle = lineColor;
    context.moveTo(xPosition, yPosition);
    yPosition -= height;
    xPosition -= width;
    context.lineTo(xPosition, yPosition);
    context.stroke();
    context.closePath();
};

//Draws a circle on the canvas
function Ring(context: CanvasRenderingContext2D, xPosition: number,
    yPosition: number, radius: number, color: string): void {
    context.beginPath();
    context.arc(xPosition, yPosition, radius, 0, (2 * Math.PI));
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
};

//Draws a circle on the canvas
function Circle(context: CanvasRenderingContext2D, xPosition: number,
    yPosition: number, radius: number, color: string): void {
    context.beginPath();
    context.arc(xPosition, yPosition, radius, 0, (2 * Math.PI));
    context.fillStyle = color;
    context.fill();
    context.closePath();
};

//Draws an invisible rectangle on the canvas (used for hitboxes)
function InvisibleRect(context: CanvasRenderingContext2D, xPosition: number,
    yPosition: number, width: number, height: number): void {
    context.beginPath();
    context.rect(xPosition, yPosition, width, height);
    context.closePath();
};
