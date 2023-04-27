import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const profileContainer = document.querySelector(".profile");
const userName = profileContainer.querySelector(".profile__name");
const userStatus = profileContainer.querySelector(".profile__status");
const profileEditButton = profileContainer.querySelector(".profile__button_type_edit");
const profileAddButton = profileContainer.querySelector(".profile__button_type_add");

const popupList = Array.from(document.querySelectorAll(".popup"));


const editPopup = document.querySelector("#editPopup");
const editForm = editPopup.querySelector("#editProfileForm");
const profileName = editPopup.querySelector("#profileNameInput");
const profileInfo = editPopup.querySelector("#profileInfoInput");

const addPopup = document.querySelector("#addPopup");
const addForm = addPopup.querySelector("#addCardForm");
const addButton = addPopup.querySelector("#addCardSubmitButton");
const placeName = addPopup.querySelector("#placeNameInput");
const placeLink = addPopup.querySelector("#placeLinkInput");

const imagePopup = document.querySelector("#imagePopup");
const cardsContainer = document.querySelector(".elements");

const listSelector = ".elements";
const imgPopupSelector = "#imagePopup";
const profilePopupSelector = "#editPopup";
const addPopupSelector = "#addPopup";
const userNameSelector = ".profile__name";
const userStatusSelector = ".profile__status";


const initialCards = [{
        placeName: 'Архыз',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        placeName: 'Челябинская область',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        placeName: 'Иваново',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        placeName: 'Камчатка',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        placeName: 'Холмогорский район',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        placeName: 'Байкал',
        placeLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationElems = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_type_save',
    inactiveButtonClass: 'popup__button_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
};


//валидация форм
const formDict = {};
const formList = Array.from(document.querySelectorAll(validationElems.formSelector));
formList.forEach((formElement) => {
    const validatingForm = new FormValidator(validationElems, formElement);
    const formName = formElement.getAttribute("name");
    formDict[formName] = validatingForm;
    validatingForm.enableValidation();
});


/*создание экземпляра карточки*/
const createCard = (item) => {
    console.log(item);
    const card = new Card(
        item,
        () => {
            imgPopup.open(item);
        },
        "#element");
    const cardElement = card.generateCard();
    return cardElement;
}


const userInfo = new UserInfo({ userNameSelector, userStatusSelector });


const profilePopup = new PopupWithForm(profilePopupSelector, (item) => {
    userInfo.setUserInfo(item);
    profilePopup.close();
});
profilePopup.setEventListeners();


const addCardPopup = new PopupWithForm(addPopupSelector,
    (item) => {
        cardList.addItem(createCard(item));
        addCardPopup.close();
    }
);
addCardPopup.setEventListeners();


const imgPopup = new PopupWithImage(imgPopupSelector);
imgPopup.setEventListeners();


/*карточки по умолчанию*/
const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item));
    },
}, listSelector)

cardList.renderItems();



profileEditButton.addEventListener("click", () => { //открываем попап 
    profilePopup.open();
    const getInfo = userInfo.getUserInfo();
    profileName.value = getInfo.name;
    profileInfo.value = getInfo.status;
});

profileAddButton.addEventListener("click", () => {
    addCardPopup.open();
});