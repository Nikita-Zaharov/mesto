import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
    constructor(popup,formSubmit){
        super(popup);
        this._formPopup = this._popup.querySelector('.popup__form')
        this._formSubmit= formSubmit;
    }

    _getInputValues(){
        this._formInputs= this._formPopup.querySelectorAll('.popup__input')
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
}
