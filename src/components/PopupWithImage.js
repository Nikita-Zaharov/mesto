import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
    constructor(popup){
        super(popup)
    }

    open(name, link){
        super.open();
        this._popupPhotoTitle=this._popup.querySelector('.popup__title-photo');
        this._popupPhotoImage= this._popup.querySelector('.popup__photo');
        this._popupPhotoTitle.textContent= name;
        this._popupPhotoImage.src=link;
        this._popupPhotoImage.alt=link;
    }
}