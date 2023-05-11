import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, callback) {
        super(popupSelector);
        this._callback = callback;
    }

    open(card, cardId) {
        super.open();
        this._card = card;
        this._cardId = cardId;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._callback(this._card, this._cardId);
            this.close();
        });
    }


}