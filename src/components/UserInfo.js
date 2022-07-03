export default class UserInfo {
    constructor(infoSelectors){
        this._name=document.querySelector(infoSelectors.name)
        this._job=document.querySelector(infoSelectors.job)
        console.log(this._name,this._job);
    }

    getUserInfo(){
        return{
            name: this._name.textContent,
            job: this._job.textContent
        }
    }

    setUserInfo(nameInput,jobInput){
       this._name.textContent = nameInput.value
       this._job.textContent  = jobInput.value
        console.log(nameInput.value);
        console.log(jobInput.value);
    }
}