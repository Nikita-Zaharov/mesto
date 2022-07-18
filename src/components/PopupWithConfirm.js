import Popup from './Popup.js'
export default class PopupWithConfirm extends Popup {
    constructor(popup){
        super(popup)
        this._formPopup = this._popup.querySelector('.popup__form')
        this._buttonConfirm = this._formPopup.querySelector('.popup__button-save')
        this._text = this._buttonConfirm.textContent

    }

    load(isLoad){
        if(isLoad){
            this._text = 'Удаление...'
        } else {
            this._buttonConfirm.textContent = this._text
        }
    }

    submitConfirm(click){
        this.submitConfirmClick = click
    }

    setEventListeners(){
        super.setEventListeners();
        this._formPopup.addEventListener('submit',(evt)=>{
            evt.preventDefault();
            this.submitConfirmClick()
        })
    }


}
