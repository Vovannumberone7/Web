class Model {

    constructor() {
    }

    squareFuncCheckbox() {
        return this.checkboxWithId('func1')
    }

    lineFuncCheckbox() {
        return this.checkboxWithId('func2')
    }

    checkboxWithId(id) {
        return document.getElementById(id);
    }

    params() {
        let k = document.getElementById('k').value
        let b = document.getElementById('b').value
        let step = Number(document.getElementById('step').value);
        return {k, b, step}
    }

    squareFuncPts(width, height) {
        const pts = [];
        const params = this.params();
        for (let x = -width / 2; x < width; x += params.step) {
            pts.push([width / 2 + x, height / 2 - (+params.k * x * x + +params.b * x)]);
        }
        return pts;
    }

    lineFuncPts(width, height) {
        const params = this.params();
        let x1 = -width / 2;
        let x2 = width / 2;
        return [[width / 2 + x1, height / 2 - (+params.k * x1 + +params.b)],
            [width / 2 + x2, height / 2 - (+params.k * x2 + +params.b)]];
    }
}