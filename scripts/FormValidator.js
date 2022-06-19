export class FormValidator {
    constructor(validatorConfig, formElement){
        this._formElement = formElement;
        this._inputSelector = validatorConfig.inputSelector;
        this._submitButtonSelector = validatorConfig.submitButtonSelector;
        this._inactiveButtonClass = validatorConfig.inactiveButtonClass;
        this._inputErrorClass = validatorConfig.inputErrorClass;
        this._errorClass = validatorConfig.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError ( inputElement, errorMessage)  {
        const errorElement = this._formElement.querySelector(`.popup__input-error-${inputElement.id}`)
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.popup__input-error-${inputElement.id}`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement)  {
        if(!inputElement.validity.valid){
            this._showInputError( inputElement, inputElement.validationMessage)
        } else{
            this._hideInputError(inputElement)
        }
    };

    _setEventListeners = () =>{
        this._toggleButtonState()
        this._inputList.forEach((inputElement) =>{
            inputElement.addEventListener('input', ()=>{
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _disableButtonSave() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableButtonSave() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    _toggleButtonState() {
        if(this._hasInvalidInput(this._inputList)){
            this._disableButtonSave()
        } else {
            this._enableButtonSave()
        }
    }

    resetErrors(){
        this._toggleButtonState()
        this._inputList.forEach((inputElement)=>{
            this._hideInputError(inputElement)
        })
    }

    enableValidation() {
        this._setEventListeners();
    }

}