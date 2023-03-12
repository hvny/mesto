const showInputError = (formElement, inputElement, errorMessage) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("popup__input_type_error");
    inputError.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__input_type_error");
    inputError.textContent = " ";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("popup__button_type_inactive");
    } else {
        buttonElement.classList.remove("popup__button_type_inactive");
    }
};

const setEventListeners = (formElement) => { //добавляем обработчики всем полям формы
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button_type_save");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((formElement) => {

        setEventListeners(formElement);
    });
};

enableValidation();