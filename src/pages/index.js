import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    userName,
    userStatus,
    userAvatar,
    profileEditButton,
    profileAddButton,
    profileName,
    profileInfo,
    listSelector,
    imgPopupSelector,
    profilePopupSelector,
    addPopupSelector,
    userNameSelector,
    userStatusSelector,
    validationElems,
} from "../utils/constants.js";

//валидация форм
const formDict = {};
const formList = Array.from(document.querySelectorAll(validationElems.formSelector));
formList.forEach((formElement) => {
    const validatingForm = new FormValidator(validationElems, formElement);
    const formName = formElement.getAttribute("name");
    formDict[formName] = validatingForm;
    validatingForm.enableValidation();
});

const imgPopup = new PopupWithImage(imgPopupSelector); //экземпляр попапа картинки
imgPopup.setEventListeners();

/*создание экземпляра карточки*/
const createCard = (item) => {
    const card = new Card(
        item,
        () => {
            imgPopup.open(item);
        },
        "#element");
    const cardElement = card.generateCard();
    return cardElement;
}

/*карточки по умолчанию*/
const defaultCards = () => {
    fetch("https://mesto.nomoreparties.co/v1/cohort-65/cards", {
            method: "GET",
            headers: {
                authorization: "107572fd-a23a-435b-9724-668d3d26cd42"
            }
        })
        .then((res) => res.json())
        .then((cards) => {
            const cardList = new Section({
                data: cards,
                renderer: (item) => {
                    cardList.addItem(createCard(item));
                },
            }, listSelector)
            cardList.renderItems();
        })
}
defaultCards();

const sendUserInfo = ({ newName, newStatus }) => {
    fetch("https://mesto.nomoreparties.co/v1/cohort-65/users/me", {
        method: 'PATCH',
        headers: {
            authorization: "107572fd-a23a-435b-9724-668d3d26cd42",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newName,
            about: newStatus
        })
    });
}


fetch("https://nomoreparties.co/v1/cohort-65/users/me", {
        method: "GET",
        headers: {
            authorization: "107572fd-a23a-435b-9724-668d3d26cd42"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        userName.value = data["name"];
        userStatus.value = data["about"];
        userAvatar.src = data["avatar"];
    })





const userInfo = new UserInfo({ userNameSelector, userStatusSelector }); //информация профиля

const profilePopup = new PopupWithForm(profilePopupSelector, (item) => { //попап изменения профиля
    userInfo.setUserInfo(item);
    console.log("userInfo:", userInfo.getUserInfo());

    //sendUserInfo(userInfo.getUserInfo());
    profilePopup.close();
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(addPopupSelector, //попап добавления карточки
    (item) => {
        cardList.addItem(createCard(item));
        addCardPopup.close();
    }
);
addCardPopup.setEventListeners();





/*обработчик открытия попапа изменения профиля*/
profileEditButton.addEventListener("click", () => {
    profilePopup.open();
    const getInfo = userInfo.getUserInfo();
    profileName.value = getInfo.name;
    profileInfo.value = getInfo.status;
    formDict["editProfileForm"].resetValidation();
});

/*обработчик открытия попапа добавления карточки*/
profileAddButton.addEventListener("click", () => {
    addCardPopup.open();
    formDict["cardForm"].resetValidation();
});