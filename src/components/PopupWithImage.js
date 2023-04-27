import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup__image");
        this._popupImageTitle = this._popup.querySelector(".popup__image-title");
    }

    open(item) {
        this._popupImage.src = item.placeLink;
        this._popupImage.alt = item.placeName;
        this._popupImageTitle.textContent = item.placeName;
        super.open();
    }
}