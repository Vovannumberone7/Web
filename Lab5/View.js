class View {

    constructor() {
        this.step = 20
        this.gridColor = '#7a7979'
        this.oxyColor = 'blue'
        this.lineWidth = 1
        this.width = 800
        this.height = 600
        this.view = document.getElementById("view")
        this.view.innerHTML = "<svg id=\"svg\" width=\"" + this.width + "\" height=\"" + this.height + "\"></svg>"
        this.svg = document.getElementById("svg")
    }

    startFilling() {
        this.svg.innerHTML = ''
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
        this.lineWidth = width
    }

    drawLine(color, pts) {
        const lineHtml = "<line x1=" + pts[0][0] +
            " x2=\"" + +pts[1][0] +
            "\" y1=\"" + +pts[0][1] +
            "\" y2=\"" + +pts[1][1] +
            "\" stroke=\"" + color +
            "\" stroke-width=\"" + +this.lineWidth + "\" />"
        this.svg.innerHTML += lineHtml
    }

    drawSquareFunc(model) {
        this.setLineWidth(2)
        const pts = model.squareFuncPts(this.width, this.height)
        for (let i = 0; i < pts.length - 1; i++) {
            this.drawLine('red', [pts[i], pts[i + 1]])
        }
    }

    drawLineFunc(model) {
        this.setLineWidth(2)
        const pts = model.lineFuncPts(this.width, this.height)
        this.drawLine('black', pts)
    }
}