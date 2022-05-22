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
const templateCell = document.querySelector('#cell');

//КОНСТАНТЫ  ПОПАПА ДОБАВЛЕНИЯ
const cardPopup = document.querySelector('.popup_add');
const popupAddOpenBtn = document.querySelector('.profile__button-add');
const popupAddCloseBtn = cardPopup.querySelector('.popup__button-close');
const cardNameInput = document.querySelector('#placeInput');
const cardLinkInput = document.querySelector('#linkInput');
const formAdd = document.querySelector('#formAdd');

// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА НА КНОПКУ ESC
const closePopupEsc = (evt)=>{
  if(evt.key ==='Escape'){
    const popupOpened= document.querySelector('.popup_opened')
    closePopup(popupOpened)
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

// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ
function handleDeleteCell (evt){
  evt.target.closest('.cell').remove()
}

// ФУНКЦИЯ ПРОСТАВЛЕНИЯ ЛАЙКА
function handleLikeCell (evt) {
  evt.target.classList.toggle('cell__button-like_active')
}

// ФУНКЦИЯ ДЛЯ ОТКРЫТЯ ПОПАПА С КАРТИНКОЙ
function openImagePopup(evt) {
  const linkImagePopup = evt.target.getAttribute('src');
  const titleImagePopup = evt.target.getAttribute('alt');
  popupPhotoLink.src = linkImagePopup;
  popupPhotoTitle.textContent = titleImagePopup;
  openPopup(imagePopup);
}

// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function createCard ({name, link, alt}) {
  const cellGrid = templateCell.content.cloneNode(true) ;
  const cellPhoto = cellGrid.querySelector('.cell__photo');  
  const cellName = cellGrid.querySelector('.cell__info-title');
  cellName.textContent = name;
  cellPhoto.src = link;
  cellPhoto.alt = alt;

  const deleteButton = cellGrid.querySelector('.cell__button-delete');
  deleteButton.addEventListener('click', handleDeleteCell);

  const likeButton = cellGrid.querySelector('.cell__button-like');
  likeButton.addEventListener('click', handleLikeCell);

  cellPhoto.addEventListener('click',openImagePopup);

  return cellGrid
}

// ФУНКИЯ ДОБАВЛЕНИЯ 6 КАРТОЧЕК ИЗ МАССИВА
initialCards.forEach(({name, link, alt}) => {
  photoGrid.append(createCard({name, link, alt}))
})

//ФУНКЦИЯ ОТКРЫТИЯ POPUP ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК
function openAddPopup(){
  openPopup(cardPopup)
}

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
function handleFormSubmitAdd (evt){
  evt.preventDefault();
  photoGrid.prepend(createCard({
      name: cardNameInput.value,
      link: cardLinkInput.value,
      alt: cardNameInput.value
    }))
  closePopup(cardPopup);  
  const buttonSaveCard = cardPopup.querySelector('.popup__button-save');
  buttonSaveCard.classList.add('popup__button-save_disabled');
  formAdd.reset();
} 

popupAddOpenBtn.addEventListener('click', openAddPopup);
popupAddCloseBtn.addEventListener('click',function(){
  closePopup(cardPopup)
})
formAdd.addEventListener('submit',handleFormSubmitAdd);
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
imagePopup.addEventListener('mousedown', closePopupOverlay);
profilePopup.addEventListener('mousedown', closePopupOverlay);
cardPopup.addEventListener('mousedown', closePopupOverlay);







