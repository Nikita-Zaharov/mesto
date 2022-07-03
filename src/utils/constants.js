const popupEditOpenBtn = document.querySelector('.profile__button-edit');
const profilePopup = '.popup_edit';
const formEditElement = document.querySelector('#formEdit');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const imagePopup = '.popup_image';
const cardPopup = '.popup_add';
const popupAddOpenBtn = document.querySelector('.profile__button-add');
const cardNameInput = document.querySelector('#placeInput');
const cardLinkInput = document.querySelector('#linkInput');
const profileName = ".profile__title"
const profileJob = ".profile__subtitle"
const templateCell = '#cell'
const photoGrid = '.photo-grid'
const formAdd = document.querySelector('#formAdd')

const validatorElements = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_visible'
  }; 

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
 export {
    popupEditOpenBtn,
    profilePopup,
    formEditElement,
    nameInput,
    jobInput,
    imagePopup,
    templateCell,
    cardPopup,
    popupAddOpenBtn,
    cardNameInput,
    photoGrid,
    cardLinkInput,
    profileName,
    profileJob,
    validatorElements,
    initialCards,
    formAdd
 }
