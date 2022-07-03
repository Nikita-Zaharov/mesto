export default class Popup {
    constructor(popup){
        this._popup=document.querySelector(popup)
        this._handleEscClose = this._handleEscClose.bind(this)
        this._closePopupOverlay = this._closePopupOverlay.bind(this)
        this._buttonPopupClose = this._popup.querySelector('.popup__button-close')
    }

    open(){
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown',this._handleEscClose)
    }

    close(){
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown',this._handleEscClose)
    }

    _handleEscClose(evt){
        if(evt.key ==='Escape'){
            this.close();
        }
    }
    _closePopupOverlay(evt){
        if (evt.target.classList.contains('popup_opened')){
          this.close(evt.target)
        }
      }
   
    setEventListeners(){
        this._buttonPopupClose.addEventListener('click',()=>{
            this.close()
        })
        this._popup.addEventListener('mousedown',this._closePopupOverlay)
    }
}
