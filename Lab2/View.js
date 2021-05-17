// how to show
fillCanvas();

function fillCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    setLineWidth(0.5);

    for (let i = step; i < canvas.width; i += step) { // vertical lines
        drawLine('#7a7979', [[i, 0], [i, canvas.height]]);
    }
    for (let i = step; i < canvas.height; i += step) { // horizontal lines
        drawLine('#7a7979', [[0, i], [canvas.width, i]]);
    }

    // Ox and Oy
    drawLine('blue', [[0, canvas.height / 2], [canvas.width, canvas.height / 2]]);
    drawLine('blue', [[canvas.width / 2, 0], [canvas.width / 2, canvas.height]]);
}

function setLineWidth(width) {
    context.lineWidth = width;
}

function drawLine(color, pts) {
    context.strokeStyle = color;
    context.beginPath();
    pts.forEach((p, i) => i ? context.lineTo(...p) : context.moveTo(...p));
    context.stroke();
}