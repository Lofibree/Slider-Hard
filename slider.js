
function getTemplate(state) {
    return `
        <div>
            <div class='slider_before' style='width: ${state.width}px'>
                <div class='slider_resize' data-type='resize'></div>
            </div>
            <div class='slider_after'></div>
        </div>
    `
}



class Slider {
    constructor(selector, state) {
        this.$slider = document.getElementById(selector);
        this.state = {
            ...state,
            width: state.width || 0
        }
        this.#render(this.state)
        this.#listen()
    }

    #render(state) {
        this.$slider.innerHTML = getTemplate(state)
    }

    #update(props) {
        this.state = {
            ...this.state,
            ...props
        }
        this.#render(this.state) 
    }

    #listen() {
        this.mouseDownHandler = this.mouseDownHandler.bind(this)
        this.mouseUpHandler = this.mouseUpHandler.bind(this)
        this.moveHandler = this.moveHandler.bind(this)
        this.$slider.addEventListener('mousedown', this.mouseDownHandler);
        this.$slider.addEventListener('mouseup', this.mouseUpHandler);
    }

    mouseDownHandler(event) {
        if(event.target.dataset.type === 'resize') {
            this.$slider.addEventListener('mousemove', this.moveHandler)
            this.currentClientX = event.clientX;
        }
    }
    mouseUpHandler(event) {
        this.$slider.removeEventListener('mousemove', this.moveHandler)
    }
    moveHandler(event) {
        let newClientX = this.currentClientX - event.clientX;
        console.log(newClientX)
        this.#update({width: this.state.width - newClientX})
        console.log(this.state.width)
        this.currentClientX = event.clientX;
        console.log(event.clientX)
        if(this.state.width > 1024) {
            this.state.width = 1024;
        } else if(this.state.width < 2) {
            this.state.width = 2;
        } 
    }
}

const slider = new Slider('slider', {})