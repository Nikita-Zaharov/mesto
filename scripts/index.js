import { FormValidator } from './FormValidator.js'
import {Card} from './Card.js'

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

// КОНСТАНТЫ ИЗМЕНЕНИЯ ПРОФИЛЯ
const popupEditOpenBtn = document.querySelector('.profile__button-edit');
const profilePopup = document.querySelector('.popup_edit');
const popupEditCloseBtn = profilePopup.querySelector('.popup__button-close');
const formEditElement = document.querySelector('#formEdit');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//КОНАТСАНТЫ ДДЯ ПОПАПА С КАРТИНКОЙ 
const imagePopup = document.querySelector('.popup_image');
const imageCloseBtn = imagePopup.querySelector('.popup__button-close');
const popupPhotoTitle = document.querySelector('.popup__title-photo');
const popupPhotoLink  = document.querySelector('.popup__photo');

// TEMPLATE 
const photoGrid = document.querySelector('.photo-grid');

//КОНСТАНТЫ  ПОПАПА ДОБАВЛЕНИЯ
const cardPopup = document.querySelector('.popup_add');
const popupAddOpenBtn = document.querySelector('.profile__button-add');
const popupAddCloseBtn = cardPopup.querySelector('.popup__button-close');
const cardNameInput = document.querySelector('#placeInput');
const cardLinkInput = document.querySelector('#linkInput');
const formAdd = document.querySelector('#formAdd');



// ФУНКЦИЯ ВСТАВКИ ЯЧЕЙКИ
 const renderCards=(cell)=>{
  photoGrid.prepend(cell)
}

//ФУНКЦИЯ  СОЗДАНИЯ И ВСТАВКИ ЯЧЕЕК С КАРТИНКАМИ НА СТРАНИЦУ
initialCards.reverse().forEach((element)=>{
  const cell = new Card(element.name, element.link, '#cell',
  {popupPhotoLink, openPopup, imagePopup, popupPhotoTitle})
  const cellEl = cell.createCell();
  renderCards(cellEl);
})

// фУНКЦИЯ ВКЛЮЧЕНИЯ ВАЛИДАЦИИ ДЛЯ ВСЕХ ФОРМ
const validators = {}
Array.from(document.forms).forEach((formElement)=>{
  validators[formElement.name] = new FormValidator(validatorElements, formElement);
  validators[formElement.name].enableValidation();
})

// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА НА КНОПКУ ESC
const closePopupEsc = (evt)=>{
  if(evt.key ==='Escape'){
    const popupOpened= document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// ФУНКЦИЯ ОТКРЫТИЯ POPUP
function openPopup(anyPopup){
  anyPopup.classList.add('popup_opened');
  document.addEventListener('keydown',closePopupEsc)
}

// ФУНКЦИЯ ЗАКРЫТИЯ POPUP
function closePopup(anyPopup){
  anyPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown',closePopupEsc)
}

//ФУНКЦИЯ ДЛЯ  ОТКРЫТИЯ ПОПАПА  РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function openPropfilePopup(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  validators[formEditElement.name].resetErrors()
  openPopup(profilePopup);
}

//ФУНКЦИЯ ЗАКРЫТИЯ POPUP С ИЗМЕНЕННОЙ ИНФОРМАЦИЕЙ  ПРОФИЛЯ
function handleFormSubmitEdit (evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent= jobInput.value;
  closePopup(profilePopup);
} 

// ОБРАБОТЧИКИ ДЛЯ ПРОФИЛЯ
popupEditOpenBtn.addEventListener('click', openPropfilePopup);
popupEditCloseBtn.addEventListener('click', function(){
  closePopup(profilePopup);
})
formEditElement.addEventListener('submit', handleFormSubmitEdit);

//ФУНКЦИЯ ОТКРЫТИЯ POPUP ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК
function openAddPopup(){
  openPopup(cardPopup)
  validators[formAdd.name].resetErrors()
}

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
function handleFormSubmitAdd (evt){
  evt.preventDefault();
  const cell = new Card(cardNameInput.value, cardLinkInput.value, '#cell',
  {popupPhotoLink, openPopup, imagePopup, popupPhotoTitle})
  const cellEl = cell.createCell()
  renderCards(cellEl)
  closePopup(cardPopup); 
  formAdd.reset();
} 

// ОБРАБОТЧИКИ ДЛЯ ПОПАПА ДОБАВЛЕНИЯ
popupAddOpenBtn.addEventListener('click', openAddPopup);
popupAddCloseBtn.addEventListener('click',function(){
  formAdd.reset()
  closePopup(cardPopup)
})
formAdd.addEventListener('submit',handleFormSubmitAdd);

// ОБРАБОТЧИК ДЛЯ ЗАКРЫТИЯ ПОПАПА С КАРТИНКОЙ
imageCloseBtn.addEventListener('click',function(){
  closePopup(imagePopup)
})

// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА НАЖАТИЕМ НА ОВЕРЛЕЙ
const closePopupOverlay=(evt)=>{
  if (evt.target.classList.contains('popup_opened')){
    console.log(evt)
    closePopup(evt.target)
  }
}
// ОБРАБОТЧИКИ ДЛЯ ЗАКРЫТИЯ ПОПАПОВ ЧЕРЕЗ ОВЕРЛЕЙ
imagePopup.addEventListener('mousedown', closePopupOverlay);
profilePopup.addEventListener('mousedown', closePopupOverlay);
cardPopup.addEventListener('mousedown', closePopupOverlay);











