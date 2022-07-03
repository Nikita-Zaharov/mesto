export default class Popup {
    constructor(popup){
        this._popup=document.querySelector(popup)
    }

    open(){
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown',this._handleEscClose.bind(this))
    }

    close(){
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown',this._handleEscClose.bind(this))
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
        this._buttonPopupClose = this._popup.querySelector('.popup__button-close')
        this._buttonPopupClose.addEventListener('click',()=>{
            this.close()
        })
        this._popup.addEventListener('mousedown',this._closePopupOverlay.bind(this))
    }
}
