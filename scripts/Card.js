export class Card {
    constructor(name, link , cellSelector,
        {popupPhotoLink, openPopup, imagePopup, popupPhotoTitle}){
        this._name = name;
        this._link = link;
        this._cellSelector = cellSelector;
        this._openPopup = openPopup;
        this._popupPhotoLink = popupPhotoLink;
        this._imagePopup = imagePopup;
        this._popupPhotoTitle = popupPhotoTitle;
    }
    
    _getTemplate(){
        const cellElement = document
        .querySelector(this._cellSelector)
        .content
        .querySelector('.cell')
        .cloneNode(true)
        return cellElement
    }

    _handleDeleteCell(evt){
        evt.target.closest('.cell').remove();
    }

    _handleLikeCell (evt) {
        evt.target.classList.toggle('cell__button-like_active');
      }
    
    _clickPhoto(){
        this._popupPhotoLink.src=this._link;
        this._popupPhotoLink.alt= this._name;
        this._popupPhotoTitle.textContent= this._name;
        this._openPopup(this._imagePopup);
    }

    _setEventListeners(){
        this._cellImage = this._cell.querySelector('.cell__photo');
        this._cellLikeBtn = this._cell.querySelector('.cell__button-like');
        this._cellDeleteBtn = this._cell.querySelector('.cell__button-delete');

        this._cellImage.addEventListener('click',()=>{
            this._clickPhoto();
        })

        this._cellLikeBtn.addEventListener('click',(evt)=>{
            this._handleLikeCell(evt);
        })

        this._cellDeleteBtn.addEventListener('click', (evt)=>{
            this._handleDeleteCell(evt);
        })
    }

    createCell() {
        this._cell = this._getTemplate();
        this._setEventListeners();
        this._cellTitle = this._cell.querySelector('.cell__info-title');
        this._cellTitle.textContent = this._name;
        this._cellImage.src = this._link;
        this._cellImage.alt = this._name;
        return this._cell;
    }


    
}