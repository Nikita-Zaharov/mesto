export default class Card {
    constructor(cellSelector, {data, userId,clickPhoto, clickLike, unlike, clickDelete}){
        this.cells = data
        this._name = data.name;
        this._link = data.link;
        this._like = data.likes
        this._unlike = unlike
        this._cellSelector = cellSelector;
        this._clickPhoto = clickPhoto
        this._ownId = this.cells.owner._id
        this._clickLike = clickLike
        this._clickDelete = clickDelete
        this._userId = userId
    }
    
    _getTemplate(){
        const cellElement = document
        .querySelector(this._cellSelector)
        .content
        .querySelector('.cell')
        .cloneNode(true)
        return cellElement
    }

    handleDeleteCell(){
        this._cell.remove();
    }

    countLike(cells){
        if (cells.likes.length===0){
            this._cellLikeNumber.textContent = null
        } else {
            this._cellLikeNumber.textContent = cells.likes.length
        }
    }

    addLike(){
        this._cellLikeBtn.classList.add('cell__button-like_active')
    }

    removeLike(){
        this._cellLikeBtn.classList.remove('cell__button-like_active')
    }

    _checkId(){
        if(this._ownId !==this._userId){
            this._cellDeleteBtn.remove()
        }
    }

    like(cells){
        this._clickLike(cells)
    }

    unlike(cells){
        this._unlike(cells)
    }

    checkLike() {
        this.cells.likes.forEach((item) => {
            if (item._id === this._userId) {
                this.addLike()
            }
        });
    }

    _setEventListeners(){
        this._cellImage = this._cell.querySelector('.cell__photo');
        this._cellLikeBtn = this._cell.querySelector('.cell__button-like');
        this._cellDeleteBtn = this._cell.querySelector('.cell__button-delete');
        this._cellLikeNumber = this._cell.querySelector('.cell__number-like')

        this._cellImage.addEventListener('click',()=>{
            this._clickPhoto(this._name,this._link);
        })

        this._cellLikeBtn.addEventListener('click',()=>{
            if (this._cellLikeBtn.classList.contains('cell__button-like_active')){
                this.unlike()
            } else{
                this.like()
            }        
        })

        this._cellDeleteBtn.addEventListener('click', ()=>{
            this._clickDelete();
        })

    }

    createCell() {
        this._cell = this._getTemplate();
        this._setEventListeners();
        this._checkId()
        this.checkLike()
        this.countLike(this.cells)
        this._cellTitle = this._cell.querySelector('.cell__info-title');
        this._cellTitle.textContent = this._name;
        this._cellImage.src = this._link;
        this._cellImage.alt = this._name;
        return this._cell;
    }
}