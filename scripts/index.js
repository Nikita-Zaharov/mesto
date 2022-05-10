const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt:  'Aрхыз'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt:  'Челябинская область'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt:  'Иваново'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt:  'Камчатка'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt:  'Холмогорский район'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt:  'Байкал'
    }
  ]; 
// ОБЪЯВЛЕНИЕ КОНСТАНТ И ПЕРЕМЕННЫХ
const popupOpenbtn = document.querySelector('.profile__button-edit');
const popupClosebtn = document.querySelector('#editclose');
const editPopup = document.querySelector('#editpopup');
const formElement = document.querySelector('#formEdit');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
const popupPhoto = document.querySelector('#imagepopup')
const photoCloseBtn = popupPhoto.querySelector('.popup-image__close');
const popupPhotoTitle = document.querySelector('.popup-image__title')
const popupPhotoLink  = document.querySelector('.popup-image__photo');
const photoGrid = document.querySelector('.photo-grid');
const templateCell = document.querySelector('#cell')
const addPopup = document.querySelector('#addpopup')
const popupAddOpenbtn = document.querySelector('.profile__button-add');
const popupAddClosebtn = document.querySelector('#addclose')
const mestoInput = document.querySelector('#mestoInput');
const linkInput = document.querySelector('#linkInput');
const formAdd = document.querySelector('#formAdd')

// ОКРЫТИЕ POPUP ДЛЯ ИЗМЕНЕНИЯ ИНФОРМАЦИИ ПРОФИЛЯ
function openpopup(){
    editPopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// ЗАКРЫТИЕ POPUP ДЛЯ ИЗМЕНЕНИЯ ИНФОРМАЦИИ ПРОФИЛЯ
function closepopup(){
    editPopup.classList.remove('popup_opened');
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

// ЗАГРУЗКА 6 КАРТОЧЕК ИЗ МАССИВА НА СТРАНИЦУ
initialCards.forEach(function(item){
  let cellGrid = templateCell.content.cloneNode(true) 
  let cellLink = cellGrid.querySelector('.cell__photo');  
  let cellName = cellGrid.querySelector('.cell__info-title');
  let cellPhoto = cellGrid.querySelector('.cell__photo')
  photoGrid.append(cellGrid)
  cellName.textContent = item.name;
  cellLink.src = item.link;
  cellLink.alt = item.alt;
  cellPhoto.addEventListener('click',photoPopupOpen)
})

// ОТКРЫТИЕ POPUP ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК
function openAddPopup(){
    addPopup.classList.add('popup_opened');
}

// ЗАКРЫТИЕ POPUP ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК
function closeAddPopup(){
    addPopup.classList.remove('popup_opened');
}

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
function formSubmitAdd (evt){
  evt.preventDefault();
  cellGrid = templateCell.content.cloneNode(true)
  cellLink = cellGrid.querySelector('.cell__photo');  
  cellName = cellGrid.querySelector('.cell__info-title');
  let cellButtonLike = cellGrid.querySelector('.cell__button-like');
  let cellButtonDelete = cellGrid.querySelector('.cell__button-delete') 
  cellPhoto = cellGrid.querySelector('.cell__photo')
  photoGrid.prepend(cellGrid)
  cellName.textContent = mestoInput.value;
  cellLink.src = linkInput.value
  cellLink.alt = mestoInput.value
  cellButtonLike.addEventListener('click',function(){
  cellButtonLike.classList.toggle('cell__button-like_active')
  })
  cellButtonDelete.addEventListener('click', function(evt){
    evt.target.closest('.cell').remove()
  })
  cellPhoto.addEventListener('click',photoPopupOpen)
  closeAddPopup();  
} 

popupAddOpenbtn.addEventListener('click', openAddPopup);
popupAddClosebtn.addEventListener('click', closeAddPopup)
formAdd.addEventListener('submit', formSubmitAdd);

// ЗАКРЫТИЕ POPUP С КАРТИНКОЙ
photoCloseBtn.addEventListener('click',function(){
  popupPhoto.classList.remove('popup_opened')
})

// ФУНКЦИЯ ОТКРЫТИЯ POPUP С КАРТИНКОЙ
function photoPopupOpen(evt) {
  popupPhoto.classList.toggle('popup_opened');
  const linkImagePopup = evt.target.getAttribute('src')
  const titleImagePopup = evt.target.getAttribute('alt')
  console.log(linkImagePopup)
  popupPhotoLink.src = linkImagePopup;
  popupPhotoTitle.textContent = titleImagePopup
}

// КНОПКА LIKE
const buttonLike = document.querySelectorAll('.cell__button-like');
const buttonLikeArray = Array.from(buttonLike)
buttonLikeArray.forEach(function(el){
  el.addEventListener('click', function(evt){
    evt.target.classList.toggle('cell__button-like_active');
  })
})

// УДАЛЕНИЕ КАРТОЧЕК
const buttonDelete = document.querySelectorAll('.cell__button-delete');
const buttonDeleteArray = Array.from(buttonDelete);
buttonDeleteArray.forEach(function(item){
    item.addEventListener('click',function(evt){
      evt.target = item.closest('.cell').remove();
    })
})




