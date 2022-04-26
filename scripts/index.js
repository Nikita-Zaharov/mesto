const popupOpenbtn = document.querySelector('.profile__button-edit');
const popupClosebtn = document.querySelector('.popup__button-close');
const popup = document.querySelector('.popup');
const popupSavebtn = document.querySelector('.popup__button-save') ;
const formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__subname');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');


popupOpenbtn.addEventListener('click',function(event){
    popup.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    event.preventDefault();
});

popupClosebtn.addEventListener('click',function(event){
    popup.classList.toggle('popup_opened');
    event.preventDefault();
})



function formSubmitHandler (evt){
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent= jobInput.value;
    popup.classList.toggle('popup_opened');
}
 formElement.addEventListener('submit',formSubmitHandler);


