import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import {
    userName,
    userStatus,
    userAvatar,
    profileEditButton,
    profileAddButton,
    profileAvatarButton,
    profileName,
    profileInfo,
    listSelector,
    imgPopupSelector,
    profilePopupSelector,
    editAvatarPopupSelector,
    addPopupSelector,
    deleteCardPopupSelector,
    userNameSelector,
    userStatusSelector,
    userAvatarSelector,
    validationElems,
} from "../utils/constants.js";


let userId;
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

const userInfo = new UserInfo({ userNameSelector, userStatusSelector, userAvatarSelector }); //информация профиля

const cardsContainer = new Section({ //контейнер для карточек
    renderer: (item, userId) => {
        cardsContainer.addItem(createCard(item, userId))
    }
}, listSelector);

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
    headers: {
        authorization: "107572fd-a23a-435b-9724-668d3d26cd42",
        "Content-Type": "application/json"
    }
});

Promise.all([api.getUserInfo(), api.getInitialCards()]) //отправляем и обрабатываем два запроса: инфа о юзере, карточки. 
    .then(([userRes, cardRes]) => { //userRes - объект с информацией о юзере, cardRes -  массив с карточками
        userId = userRes._id;
        userInfo.setUserInfo(userRes);
        userInfo.setUserAvatar(userRes);
        cardsContainer.renderItems(cardRes, userId)
    })
    .catch(err => console.log(err))

const createCard = (item, userId) => {
    const card = new Card(
        item,
        () => { //открытие попапа карточки
            imgPopup.open(item);
        },
        (card, cardId) => { //открытие попапа удаления
            deleteCardPopup.open(card, cardId);
        },
        (cardId) => { //лайк
            api.putLike(cardId)
                .then((cardData) => {
                    card.renderLikes(cardData);
                })
                .catch(err => console.log(err));
        },
        (cardId) => { //убираем лайк    
            api.deleteLike(cardId)
                .then((cardData) => {
                    card.renderLikes(cardData);
                    console.log(cardData, "cardData")
                })
                .catch(err => console.log(err));
        },
        "#element",
        userId
    );
    const cardElement = card.generateCard();
    return cardElement;
}

/*попап удаления карточки*/
const deleteCardPopup = new PopupWithSubmit(deleteCardPopupSelector,
    (card, cardId) => {
        deleteCardPopup.loading("Удаление...")
        console.log(card, cardId);
        api.deleteCard(cardId)
            .then(() => {
                card.removeCard();
                deleteCardPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                deleteCardPopup.loading("Да");
            })
    }
);
deleteCardPopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, //попап изменения профиля
    (userData) => {
        profilePopup.loading("Сохранение...");
        api.setUserInfo(userData)
            .then((data) => {
                userInfo.setUserInfo(data);
                profilePopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                profilePopup.loading("Сохранить");
            })

    });
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(addPopupSelector, //попап добавления карточки
    (cardData) => {
        addCardPopup.loading("Создание...");
        api.addCard(cardData)
            .then((card) => {
                cardsContainer.addItem(createCard(card, userId));
                addCardPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                addCardPopup.loading("Создать");
            })
    }
);
addCardPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm(editAvatarPopupSelector, //попап изменения аватарки
    (avatar) => {
        editAvatarPopup.loading("Сохранение...");
        console.log(avatar);
        api.setUserAvatar(avatar)
            .then(() => {
                userAvatar.src = `<%=require(${avatar})%>`;
                editAvatarPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                editAvatarPopup.loading("Сохранить");
            })
    }
);
editAvatarPopup.setEventListeners();

/*обработчик открытия попапа изменения профиля*/
profileEditButton.addEventListener("click", () => {
    profilePopup.open();
    const getInfo = userInfo.getUserInfo();
    profileName.value = getInfo.name;
    profileInfo.value = getInfo.about;
    formDict["editProfileForm"].resetValidation();
});

/*обработчик открытия попапа добавления карточки*/
profileAddButton.addEventListener("click", () => {
    addCardPopup.open();
    formDict["cardForm"].resetValidation();
});

/*обработчик открытия попапа изменения аватарки*/
profileAvatarButton.addEventListener("click", () => {
    editAvatarPopup.open();
});