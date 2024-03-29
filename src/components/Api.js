export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: "GET",
                headers: this._headers
            })
            .then(res => this._checkForError(res));
    }

    /*добавление карточки*/
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(res => this._checkForError(res));
    }

    /*удаление карточки*/
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(res => this._checkForError(res));
    }

    /*получение данных юзера*/
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "GET",
                headers: this._headers,
            })
            .then(res => this._checkForError(res));
    }

    /*обновление данных юзера*/
    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(res => this._checkForError(res));
    }

    /*обновление аватарки */
    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.avatar
                })
            })
            .then(res => this._checkForError(res));
    }

    /*ставим лайк*/
    putLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this._headers,
            })
            .then(res => this._checkForError(res));
    }

    /*убираем лайк*/
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(res => this._checkForError(res));
    }

    /*проверка на ошибку*/
    _checkForError(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}