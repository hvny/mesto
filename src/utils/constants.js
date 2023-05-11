const profileContainer = document.querySelector(".profile");
export const profileEditButton = profileContainer.querySelector(".profile__button_type_edit");
export const profileAddButton = profileContainer.querySelector(".profile__button_type_add");
export const profileAvatarButton = profileContainer.querySelector(".profile__avatar-container");

const editPopup = document.querySelector("#editPopup");
export const profileName = editPopup.querySelector("#profileNameInput");
export const profileInfo = editPopup.querySelector("#profileInfoInput");

export const listSelector = ".elements";
export const imgPopupSelector = "#imagePopup";
export const profilePopupSelector = "#editPopup";
export const addPopupSelector = "#addPopup";
export const editAvatarPopupSelector = "#editAvatarPopup";
export const deleteCardPopupSelector = "#deleteCardPopup";
export const userNameSelector = ".profile__name";
export const userStatusSelector = ".profile__status";
export const userAvatarSelector = ".profile__avatar";

export const userAvatar = profileContainer.querySelector(userAvatarSelector);

export const validationElems = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_type_save',
    inactiveButtonClass: 'popup__button_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
};