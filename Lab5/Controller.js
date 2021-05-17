class Controller {

    constructor(view, model) {
        this.model = model
        this.view = view
        this.view.startFilling()
    }

    showGraphics() {
        this.view.startFilling()

        const checkbox1 = this.model.squareFuncCheckbox()
        const checkbox2 = this.model.lineFuncCheckbox()

        if (!checkbox1.checked && !checkbox2.checked) {
            alert("Должен быть выбран хотя бы один график");
        } else {
            if (checkbox1.checked) {
                this.view.drawSquareFunc(this.model)
            }
            if (checkbox2.checked) {
                this.view.drawLineFunc(this.model)
            }
        }
    }

}

const controller = new Controller(new View(), new Model())