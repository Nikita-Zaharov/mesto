export default class Section {
    constructor({items, renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)
        this._renderedItems = items
    }

    addItem(cell){
        this._container.prepend(cell)
    }

    clear(){
        this._container.innerHTML = ''
    }

    renderItems(){
        this.clear();
        this._renderedItems.reverse().forEach((item)=>{
           this._renderer(item)
    })
    }   

}