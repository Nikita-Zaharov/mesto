import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'
import {
    popupEditOpenBtn,
    profilePopup,
    formEditElement,
    nameInput,
    jobInput,
    imagePopup,
    cardPopup,
    popupAddOpenBtn,
    cardNameInput,
    cardLinkInput,
    profileName,
    profileJob,
    validatorElements,
    initialCards,
    templateCell,
    photoGrid,
    formAdd
} from '../utils/constants.js'

// ФУНКЦИЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА КАРТОЧКИ
const createCard = (name, link , cellSelector, {clickPhoto})=>{
  return new Card(name, link , cellSelector, {clickPhoto})
}

//ФУНКЦИЯ  ВСТАВКИ ЯЧЕЕК С КАРТИНКАМИ ИЗ МАССИВА НА СТРАНИЦУ
const cellList = new Section({
  items: initialCards,
  renderer: (item)=>{
    const cell = createCard(item.name, item.link, templateCell, {clickPhoto: ()=>{
      newImagePopup.open(item.name, item.link)
    }})
    const cellEl = cell.createCell()
    cellList.addItem(cellEl)
  }
},photoGrid
)
cellList.renderItems()

// фУНКЦИЯ ВКЛЮЧЕНИЯ ВАЛИДАЦИИ ДЛЯ ВСЕХ ФОРМ
const validators = {}
Array.from(document.forms).forEach((formElement)=>{
  validators[formElement.name] = new FormValidator(validatorElements, formElement);
  validators[formElement.name].enableValidation();
})

// СОЗДАНИЕ ПОПАПА С ИЗОБРАЖЕНИЕМ
const newImagePopup = new PopupWithImage(imagePopup)
newImagePopup.setEventListeners()

// СОБИРАЕМ ИНФО О ПРОФИЛЕ
const userInformation =  new UserInfo({name:profileName,job:profileJob})

// СОЗДАНИЕ ЭКЗЕМПЛЯРА  ПОПАПА С РЕДАКТИРОВАНИЕ 
const popupEdit  = new PopupWithForm(profilePopup, ()=>{
  userInformation.setUserInfo(nameInput,jobInput)
})
popupEdit.setEventListeners()

// СОЗДАНИЕ ЭКЗЕМПЛЯРА ПОПАПА С ДОБАВЛЕНИЕ КАРТИНКИ 
const popupAdd = new PopupWithForm(cardPopup,()=>{
  const newCell = createCard(cardNameInput.value, cardLinkInput.value , '#cell', {clickPhoto:()=>{
    newImagePopup.open(cardNameInput.value, cardLinkInput.value)
  }});
  const cellA  = newCell.createCell()
  cellList.addItem(cellA)
})
popupAdd.setEventListeners()

popupEditOpenBtn.addEventListener('click', ()=>{
  const UserArray = userInformation.getUserInfo()
  nameInput.value = UserArray.name
  jobInput.value = UserArray.job
  validators[formEditElement.name].resetErrors()
  popupEdit.open()
});

popupAddOpenBtn.addEventListener('click', ()=>{
  validators[formAdd.name].resetErrors()
  popupAdd.open()
});






