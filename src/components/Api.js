import { Promise } from "core-js";

export default class Api {
    constructor(options){
        this._url = options.url;
        this._headers = options.headers
    }

    _checkAnswer(res){
        if (res.ok){
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInfoUser(){
         return fetch(this._url+'users/me', {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkAnswer)
    }

    getInitialsCard(){
         return fetch(this._url+'cards', {
            method: 'GET',
            headers: this._headers
            
        })
        .then(this._checkAnswer)
    }

    editProfile(data){
        return fetch(this._url+'users/me',{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
        .then(this._checkAnswer)
    }
    
    addCard(data){
        return fetch(this._url+'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.mesto,
                link: data.link
            })
        })
        .then(this._checkAnswer)
    }

    putLike(data){
        return fetch(this._url+`cards/${data._id}/likes`,{
            method: 'PUT',
            headers: this._headers,
            
        })
        .then(this._checkAnswer)
    }

    deleteLike(data){
        return fetch(this._url+`cards/${data._id}/likes`,{
            method: 'DELETE',
            headers: this._headers,
            
        })
        .then(this._checkAnswer)
    }

    deleteCard(id){
        return fetch(this._url+`cards/${id}`,{
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkAnswer)
    }

    editAvatar(data){
        return fetch(this._url+'users/me/avatar',{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.linkAvatar
            })
        })
        .then(this._checkAnswer)
    }

    getData(){
        return Promise.all([this.getInfoUser(),this.getInitialsCard()])
    }


}