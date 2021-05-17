// what is shown
const step = 20;
let canvas = document.querySelector('canvas'); // move to view
let context = canvas.getContext('2d'); // move to view
let params = {};

function getParams() {
    let k = document.getElementById('k').value
    let b = document.getElementById('b').value
    let step = Number(document.getElementById('step').value);
    return {k, b, step}
}

function calcSquareFunc() {
    let pts = [];
    params = getParams();
    for (let x = -canvas.width / 2; x < canvas.width; x += params.step) {
        pts.push([canvas.width / 2 + x, canvas.height / 2 - (+params.k * x * x + +params.b * x)]);
    }
    return pts;
}

function calcLineFunc() {
    params = getParams();
    let x1 = -canvas.width / 2;
    let x2 = canvas.width / 2;
    return [[canvas.width / 2 + x1, canvas.height / 2 - (+params.k * x1 + +params.b)],
        [canvas.width / 2 + x2, canvas.height / 2 - (+params.k * x2 + +params.b)]];
}