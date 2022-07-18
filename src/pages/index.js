import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
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
    templateCell,
    photoGrid,
    formAdd,
    avatar,
    popupConfirmSelector,
    popupAvatarSelector,
    avatarBtn,
    formAvatar
} from '../utils/constants.js'
import Api from '../components/Api.js';

const options ={
  url: 'https://mesto.nomoreparties.co/v1/cohort-45/',
  headers: {
    authorization: '605bf577-7118-46c0-9109-b867a7033a44',
    'Content-Type': 'application/json'
  }
}

// СОЗДАНИЕ ЭКЗЕМПЛЯРА API
const api =  new Api(options)
let userId = 'null'

// СОЗДАНИЕ СЕКЦИИ ДЛЯ ВСТАВКИ
const cellList = new Section({
  renderer:(data)=>{
    const cell = createCard(data);
    cellList.addItem(cell)
  }
},
photoGrid
)

// ПОЛУЧЕНИЕ ДАННЫХ С СЕРВЕРА
api.getData()
.then(([data, cells])=>{
  userId = data._id
  userInformation.setUserInfo(data);
  userInformation.setAvatar(data);
  cellList.renderItems(cells)
})
.catch((err)=>{
  console.log((err));
})

// ФУНКЦИЯ СОЗДАНИЯ ПОПАПА ПОДТВЕРЖДЕНИЯ
const popupConfirm = new PopupWithConfirm(popupConfirmSelector)
popupConfirm.setEventListeners()

// фУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
const createCard = (data)=>{
  const cell = new Card(templateCell,{
    data: data,
    userId: userId,
    clickPhoto:()=>{
      newImagePopup.open(data.name, data.link)
    },
    clickLike:()=>{
      api.putLike(data)
      .then((data)=>{
        cell.addLike()
        cell.countLike(data)
      })
    },
    unlike:()=>{
      api.deleteLike(data)
      .then((data)=>{
         cell.removeLike()
         cell.countLike(data)
       })
    },
    clickDelete:()=>{
      popupConfirm.open()
        popupConfirm.submitConfirm(()=>{
          popupConfirm.load(true)
          api.deleteCard(data._id)
          .then(()=>{
            cell.handleDeleteCell();
            popupConfirm.close()
          })
          .catch((err)=>{
            console.log(err);
          })
      })
    }
  });
  return cell.createCell()
}

// фУНКЦИЯ ВКЛЮЧЕНИЯ ВАЛИДАЦИИ ДЛЯ ВСЕХ ФОРМ
const validators = {}
Array.from(document.forms).forEach((formElement)=>{
  validators[formElement.name] = new FormValidator(validatorElements, formElement);
  validators[formElement.name].enableValidation();
})

// СОЗДАНИЕ ПОПАПА С ИЗОБРАЖЕНИЕМ
const newImagePopup = new PopupWithImage(imagePopup)
newImagePopup.setEventListeners()

// СОЗДАНИЕ ЭКЗЕМПЛЯРА ПРОФИЛЯ
const userInformation =  new UserInfo({
  name:profileName, job:profileJob, avatar: avatar})

// СОЗДАНИЕ ЭКЗЕМПЛЯРА  ПОПАПА С АВАТАРОМ
const popupAvatar = new PopupWithForm(popupAvatarSelector,{
  formSubmit:(data)=>{
    popupAvatar.load(true)
    api.editAvatar(data)
    .then((res)=>{
      userInformation.setAvatar(res)
      popupAvatar.close()
    })
    .catch((err)=>{
      console.log(err);
    })
  }
})
popupAvatar.setEventListeners()

avatarBtn.addEventListener('click', ()=>{
  validators[formAvatar.name].resetErrors()
  popupAvatar.open()
})


// СОЗДАНИЕ ЭКЗЕМПЛЯРА ПОПАПА С ДОБАВЛЕНИЕ КАРТИНКИ 
const popupAdd = new PopupWithForm(cardPopup,{
  formSubmit: (data)=>{
    popupAdd.load(true);
    api.addCard(data)
    .then((data)=>{
      const cell = createCard(data) 
      cellList.addItem(cell)
      popupAdd.close()
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}
 
)
popupAdd.setEventListeners()

popupAddOpenBtn.addEventListener('click', ()=>{
  validators[formAdd.name].resetErrors()
  popupAdd.open()
});

// СОЗДАНИЕ ПОПАПА С РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const popupEdit  = new PopupWithForm(profilePopup, {
  formSubmit:(data)=>{
    popupEdit.load(true)
    api.editProfile(data)
    .then((res)=>{
      console.log(res);
      userInformation.setUserInfo(res)
      popupEdit.close()
    })
    .catch((err)=>{
      console.log(err)
    })
  }}
)
popupEdit.setEventListeners()

popupEditOpenBtn.addEventListener('click', ()=>{
  const userArray = userInformation.getUserInfo()
  nameInput.value = userArray.name
  jobInput.value = userArray.job
  validators[formEditElement.name].resetErrors()
  popupEdit.open()
});



