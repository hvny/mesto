export default class Card {
    constructor(data, handleCardClick, handleCardDelete, handleCardLike, handleCardLikeRemove, cardSelector, userId) {
        this._title = data.name;
        this._image = data.link;
        this._likes = data.likes;
        this._selector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._handleCardLikeRemove = handleCardLikeRemove;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._cardData = data;

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
        this._likesQuantity = this._card.querySelector(".element__likes-counter")

        this._setEventListeners();
        this.renderLikes(this._cardData);

        this._cardTitle.textContent = this._title;
        this._cardImage.setAttribute("src", this._image);
        this._cardImage.setAttribute("alt", this._title);

        if (this._ownerId !== this._userId) {
            this._card.removeChild(this._deleteButton);
        }

        return this._card;
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }

    _isLiked() {
        return this._likes.some((like) => like._id == this._userId)
    }

    _cardLikeButton() {
        if (this._isLiked()) {
            this._handleCardLikeRemove(this._cardId);
        } else {
            this._handleCardLike(this._cardId);
        }
    }

    renderLikes(card) {
        this._likes = card.likes;
        if (this._likes.length === 0) {
            this._likesQuantity.textContent = '0';
        } else {
            this._likesQuantity.textContent = this._likes.length;
        }
        if (this._isLiked()) {
            this._likeButton.classList.add('element__button_type_like_active');
        } else {
            this._likeButton.classList.remove('element__button_type_like_active');
        }
    }

    _setEventListeners() {
        this._cardImage.addEventListener("click", () => this._handleCardClick()); //обработчик нажатия по картинке
        this._likeButton.addEventListener("click", () => this._cardLikeButton()); //обработчик кнопки лайка
        this._deleteButton.addEventListener("click", () => this._handleCardDelete(this, this._cardId)); //обработчик кнопки удаления карточки
    }
}