export default class UserInfo {
    constructor({ userNameSelector, userStatusSelector, userAvatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userStatus = document.querySelector(userStatusSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userStatus.textContent
        };
    }

    setUserInfo({ name, about }) {
        this._userName.textContent = name;
        this._userStatus.textContent = about;
    }

    setUserAvatar(avatar) {
        this._userAvatar.src = avatar.avatar;
    }
}