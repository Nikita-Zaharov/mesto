export default class UserInfo {
    constructor(infoSelectors){
        this._name=document.querySelector(infoSelectors.name)
        this._job=document.querySelector(infoSelectors.job)
        this._avatar = document.querySelector(infoSelectors.avatar)
    }

    getUserInfo(){
        return{
            name: this._name.textContent,
            job: this._job.textContent
        }
    }

    setUserInfo({name, about, avatar}){
       this._name.textContent = name
       this._job.textContent = about
       this._avatar.src = avatar
    }
    
    setAvatar({avatar}){
        this._avatar.src = avatar
    }
}