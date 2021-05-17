// logic
function showGraphics() {
    fillCanvas();
    let checkbox1 = document.getElementById("func1");
    let checkbox2 = document.getElementById("func2");

    if (!checkbox1.checked && !checkbox2.checked) {
        alert("Должен быть выбран хотя бы один график");
    } else {
        setLineWidth(2);
        if (checkbox1.checked) {
            let pts = calcSquareFunc();
            drawLine('red', pts);
        }
        if (checkbox2.checked) {
            let pts = calcLineFunc();
            drawLine('black', pts);
        }
    }
}