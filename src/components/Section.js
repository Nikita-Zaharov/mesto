export default class Section {
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)
    }

    addItem(cell){
        this._container.prepend(cell)
    }

    renderItems(items){
        items.reverse().forEach((item)=>{
           this._renderer(item)
    })
    }   

}