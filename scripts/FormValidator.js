class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        inputError.textContent = errorMessage;
    };

    _hideInputError(inputElement) {
        const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        inputError.textContent = " ";
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

        this._formElement.addEventListener("reset", () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, buttonElement), 0
            });
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}

export { FormValidator };

/*
//код с прошлого спринта

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    inputError.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, settings) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    inputError.textContent = " ";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, settings) => { //добавляем обработчики всем полям формы
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    formElement.addEventListener("reset", () => {
        setTimeout(() => {
            toggleButtonState(inputList, buttonElement, settings), 0
        });
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
};

enableValidation(validationElems);*/