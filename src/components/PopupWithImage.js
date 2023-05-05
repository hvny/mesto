import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup__image");
        this._popupImageTitle = this._popup.querySelector(".popup__image-title");
    }

    open(item) {
        this._popupImage.src = item.link;
        this._popupImage.alt = item.name;
        this._popupImageTitle.textContent = item.name;
        super.open();
    }
}