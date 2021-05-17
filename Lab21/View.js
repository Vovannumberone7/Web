class View {

    constructor(step) {
        this.step = step
        this.gridColor = '#7a7979'
        this.oxyColor = 'blue'
        this.width = 800
        this.height = 600
        this.view = document.getElementById("view")
        this.canvas = document.createElement("canvas")
        this.canvas.setAttribute("id", "canvas")
        this.canvas.setAttribute("width", this.width.toString())
        this.canvas.setAttribute("height", this.height.toString())
        this.view.append(this.canvas)
        this.context = this.canvas.getContext("2d")
    }

    startFilling() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.setLineWidth(0.5)
        for (let i = this.step; i < this.width; i += this.step) {
            this.drawLine(this.gridColor, [[i, 0], [i, this.height]]);
        }
        for (let i = this.step; i < this.height; i += this.step) {
            this.drawLine(this.gridColor, [[0, i], [this.width, i]]);
        }
        this.drawLine(this.oxyColor, [[0, this.height / 2], [this.width, this.height / 2]]);
        this.drawLine(this.oxyColor, [[this.width / 2, 0], [this.width / 2, this.height]]);
    }

    setLineWidth(width) {
        this.context.lineWidth = width;
    }

    drawLine(color, pts) {
        this.context.strokeStyle = color;
        this.context.beginPath();
        pts.forEach((p, i) => i ? this.context.lineTo(...p) : this.context.moveTo(...p));
        this.context.stroke();
    }

    drawSquareFunc(model) {
        this.setLineWidth(2)
        const pts = model.squareFuncPts(this.width, this.height)
        this.drawLine('red', pts)
    }

    drawLineFunc(model) {
        this.setLineWidth(2)
        const pts = model.lineFuncPts(this.width, this.height)
        this.drawLine('black', pts)
    }
}