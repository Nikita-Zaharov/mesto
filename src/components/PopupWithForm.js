import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
    constructor(popup,{formSubmit}){
        super(popup);
        this._formPopup = this._popup.querySelector('.popup__form')
        this._buttonSave = this._formPopup.querySelector('.popup__button-save')
        this._formSubmit= formSubmit;
        this._text = this._buttonSave.textContent
        this._formInputs= this._formPopup.querySelectorAll('.popup__input')
    }

    _getInputValues(){
        
        this._inputs = {}
        this._formInputs.forEach((inputEl)=>{
            this._inputs[inputEl.name]= inputEl.value
        })
        return this._inputs
    }

    close(){
        super.close();
        this._formPopup.reset()
    }

    setEventListeners(){
        super.setEventListeners();
        this._formPopup.addEventListener('submit',(evt)=>{
            evt.preventDefault();
            this._formSubmit(this._getInputValues())
            this.close()
        })
    }

    load(isLoad){
        if (isLoad){
            this._text = 'Сохранение...'
        } else (
            this._buttonSave.textContent = this._text
        )
        
    }
}
