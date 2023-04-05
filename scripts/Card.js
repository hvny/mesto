import { openPopup, imagePopup } from "./index.js";

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
        this._cardImage = this._card.querySelector(".element__image");
        this._likeButton = this._card.querySelector(".element__button_type_like");
        this._cardTitle = this._card.querySelector(".element__title");
        this._deleteButton = this._card.querySelector(".element__button_type_close");

        this._setEventListeners();

        this._cardTitle.textContent = this._title;
        this._cardImage.setAttribute("src", this._image);
        this._cardImage.setAttribute("alt", this._title);

        return this._card;
    }

    _removeCard() {
        this._card.remove();
        this._card = null;
    }

    /*метод кнопки лайка*/
    _cardLikeButton() {
        this._likeButton.classList.toggle('element__button_type_like_active');
    }

    //открываем попап с фотографией
    _openCardPopup() {
        imagePopup.querySelector(".popup__image").src = this._image;
        imagePopup.querySelector(".popup__image").alt = this._title;
        imagePopup.querySelector(".popup__image-title").textContent = this._title;
        openPopup(imagePopup);
    }

    _setEventListeners() {
        this._cardImage.addEventListener("click", () => this._openCardPopup());
        this._likeButton.addEventListener("click", () => this._cardLikeButton()); //обработчик кнопки лайка
        this._deleteButton.addEventListener("click", () => this._removeCard()); //обработчик кнопки удаления карточки
    }
}
export { Card };