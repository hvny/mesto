import '../pages/index.css'; // добавьте импорт главного файла стилей 

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
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
    initialCards
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

const userInfo = new UserInfo({ userNameSelector, userStatusSelector }); //информация профиля

const profilePopup = new PopupWithForm(profilePopupSelector, (item) => { //попап изменения профиля
    userInfo.setUserInfo(item);
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


const imgPopup = new PopupWithImage(imgPopupSelector); //экземпляр попапа картинки
imgPopup.setEventListeners();

/*карточки по умолчанию*/
const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item));
    },
}, listSelector)
cardList.renderItems();

/*обработчик открытия попапа изменения профиля*/
profileEditButton.addEventListener("click", () => {
    profilePopup.open();
    const getInfo = userInfo.getUserInfo();
    profileName.value = getInfo.name;
    profileInfo.value = getInfo.status;
});

/*обработчик открытия попапа добавления карточки*/
profileAddButton.addEventListener("click", () => {
    addCardPopup.open();
});