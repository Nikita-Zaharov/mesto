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
  return new Card(name, link , cellSelector, {clickPhoto}).createCell()
}

//ФУНКЦИЯ  ВСТАВКИ ЯЧЕЕК С КАРТИНКАМИ ИЗ МАССИВА НА СТРАНИЦУ
const cellList = new Section({
  items: initialCards,
  renderer: (item)=>{
    const cell = createCard(item.name, item.link, templateCell, {clickPhoto: ()=>{
      newImagePopup.open(item.name, item.link)
    }})
    cellList.addItem(cell)
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
const popupEdit  = new PopupWithForm(profilePopup, (item)=>{
  userInformation.setUserInfo(item.name, item.job)
})
popupEdit.setEventListeners()

// СОЗДАНИЕ ЭКЗЕМПЛЯРА ПОПАПА С ДОБАВЛЕНИЕ КАРТИНКИ 
const popupAdd = new PopupWithForm(cardPopup,(item)=>{
  const newCell = createCard(item.mesto, item.link , '#cell', {clickPhoto:()=>{
    newImagePopup.open(item.mesto, item.link)
  }});
  cellList.addItem(newCell)
})
popupAdd.setEventListeners()

popupEditOpenBtn.addEventListener('click', ()=>{
  const userArray = userInformation.getUserInfo()
  nameInput.value = userArray.name
  jobInput.value = userArray.job
  validators[formEditElement.name].resetErrors()
  popupEdit.open()
});

popupAddOpenBtn.addEventListener('click', ()=>{
  validators[formAdd.name].resetErrors()
  popupAdd.open()
});






