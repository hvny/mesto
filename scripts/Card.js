import { openPopup, cardsContainer, imagePopup } from "./index.js";

class Card {
    constructor(name, link, cardSelector) {
        this._title = name;
        this._image = link;
        this._selector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._selector)
            .content.querySelector(".element")
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._card = this._getTemplate();
        this._setEventListeners();

        this._card.querySelector(".element__title").textContent = this._title;
        this._card.querySelector(".element__image").setAttribute("src", this._image);
        this._card.querySelector(".element__image").setAttribute("alt", this._title);

        return this._card;
    }

    _setEventListeners() {
        this._card.querySelector(".element__image").addEventListener("click", () => { //открытие попапа фотографии
            imagePopup.querySelector(".popup__image").src = this._image;
            imagePopup.querySelector(".popup__image").alt = this._title;
            imagePopup.querySelector(".popup__image-title").textContent = this._title;
            openPopup(imagePopup);
        });

        this._card.querySelector(".element__button_type_like").addEventListener("click", (evt) => { //лайк
            evt.target.classList.toggle('element__button_type_like_active');
        });

        this._card.querySelector(".element__button_type_close").addEventListener("click", () => { //удаление карточки
            cardsContainer.removeChild(this._card);
        });
    }
}
export { Card };