import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callBack) {
        super(popupSelector);
        this._callBack = callBack;
        this._popupForm = this._popup.querySelector(".popup__form");
        this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));

    }

    _getInputValues() {
        this._inputValuesDict = {};
        this._inputList.forEach((item) => {
            this._inputValuesDict[item.name] = item.value;
        });
        return this._inputValuesDict;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._callBack(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}