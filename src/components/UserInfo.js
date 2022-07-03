export default class UserInfo {
    constructor(infoSelectors){
        this._name=document.querySelector(infoSelectors.name)
        this._job=document.querySelector(infoSelectors.job)
    }

    getUserInfo(){
        return{
            name: this._name.textContent,
            job: this._job.textContent
        }
    }

    setUserInfo(name,job){
       this._name.textContent = name
       this._job.textContent = job
    }
}