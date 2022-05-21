// ФУНКЦИЯ ПОЯВЛЕНИЯ ОШИБКИ
const showInputError = (formElement, inputElement, errorMessage, object) => {
    const errorElement = formElement.querySelector(`.popup__input-error-${inputElement.id}`)
    inputElement.classList.add(object.inputErrorClass);
    errorElement.classList.add(object.errorClass);
    errorElement.textContent = errorMessage;
}

// ФУНКЦИЯ СКРЫТИЯ ОШИБКИ
const hideInputError = (formElement, inputElement, object) => {
    const errorElement = formElement.querySelector(`.popup__input-error-${inputElement.id}`);
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
    errorElement.textContent = '';
    
}

// ФУНКЦИЯ ПРОВЕРКИ ИНПАТА НА ВИЛОДНОСТЬ
const checkInputValidity = (formElement, inputElement, object) =>{
    if(!inputElement.validity.valid){
        showInputError(formElement, inputElement, inputElement.validationMessage, object)
    } else{
        hideInputError(formElement, inputElement, object)
    }
};

// фУНКЦИЯ ДОБАВЛЕНИЯ СЛУШАТЕЛЯМ ПОЛЯМ
const setEventListeners = (formElement, object) =>{
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector))
    const buttonElement = formElement.querySelector(object.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, object)
    inputList.forEach((inputElement) =>{
        inputElement.addEventListener('input', function(){
            checkInputValidity(formElement, inputElement, object)
            toggleButtonState(inputList, buttonElement, object)
        })
    })
}

// ФУНКЦИЯ ПРОВЕРКИ ВСЕХ ПОЛЕЙ НА ВАЛИДНОСТЬ
const hasInvalidInput= (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// ФУНКЦИЯ ИЗМЕНЕНИЯ ПОВЕДЕНИЯ КНОПКИ
const toggleButtonState = (inputList, buttonElement, object) => {
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add(object.inactiveButtonClass)
        buttonElement.disabled = true
    } else {
        buttonElement.classList.remove(object.inactiveButtonClass)
        buttonElement.disabled = false
    }
}

// ФУНКЦИЯ ВКЛЮЧЕНИЯ ВАЛИДАЦИИ
const enableValidation = (object) =>{
  const formList = Array.from(document.querySelectorAll(object.formSelector))  
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt){
          evt.preventDefaul();
      })
      setEventListeners(formElement, object)
  })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_visible'
  }); 