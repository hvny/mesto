export default class UserInfo {
    constructor({ userNameSelector, userStatusSelector }) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._userStatusSelector = document.querySelector(userStatusSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameSelector.textContent,
            status: this._userStatusSelector.textContent
        };
    }

    setUserInfo({ name, status }) {
        this._userNameSelector.textContent = name;
        this._userStatusSelector.textContent = status;
    }
}