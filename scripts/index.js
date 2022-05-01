const popupOpenbtn = document.querySelector('.profile__button-edit');
const popupClosebtn = document.querySelector('.popup__button-close');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function openpopup(){
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closepopup(){
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt){
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent= jobInput.value;
    closepopup();
}   

popupOpenbtn.addEventListener('click',openpopup
);

popupClosebtn.addEventListener('click',closepopup
);

 formElement.addEventListener('submit',formSubmitHandler);


