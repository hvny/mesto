import { Card } from "./Card.js";

const profileContainer = document.querySelector(".profile");
const userName = profileContainer.querySelector(".profile__name");
const userStatus = profileContainer.querySelector(".profile__status");
const profileEditButton = profileContainer.querySelector(".profile__button_type_edit");
const profileAddButton = profileContainer.querySelector(".profile__button_type_add");

const popupList = Array.from(document.querySelectorAll(".popup"));

popupList.forEach((somePopup) => { //закрытие попапа при клике на область вне формы
    document.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closePopup(somePopup);
        }
    });
});

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

const closeButtons = document.querySelectorAll(".popup__button_type_close");


closeButtons.forEach((button) => {
    const popup = button.closest(".popup")
    button.addEventListener("click", () => closePopup(popup));
});

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//создаём экземпляр карточки

const createCard = (title, url) => {
    const someCard = new Card(title, url, "#element").generateCard();
    return someCard;
};

/*добавляем карточку в начало*/

const addCard = (card) => {
    cardsContainer.prepend(card);
};

/*добавляем карточки из массива*/

initialCards.forEach((item) => {
    addCard(createCard(item.name, item.link));
});

/*открытие попапа*/

const openPopup = (somePopup) => {
    somePopup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupByEsc);
};

/*закрытие попапа*/

const closePopup = (somePopup) => {
    somePopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByEsc);
};

const closePopupByEsc = (evt) => {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
};


/*попап изменения профиля*/

const handleEditFormSubmit = (evt) => { //кнопка "сохранить"
    evt.preventDefault();
    userName.textContent = profileName.value;
    userStatus.textContent = profileInfo.value;
    closePopup(editPopup);
}

profileEditButton.addEventListener("click", () => { //открываем попап 
    openPopup(editPopup);
    profileName.value = userName.textContent;
    profileInfo.value = userStatus.textContent;
});

editForm.addEventListener("submit", handleEditFormSubmit);

/*попап добавления карточки*/

profileAddButton.addEventListener("click", () => { //открываем попап 
    openPopup(addPopup);
    addButton.classList.add("popup__button_type_inactive");
    addButton.disabled = true;

});

const handleAddFormSubmit = (evt) => { //добавляем карточку
    evt.preventDefault();
    addCard(createCard(placeName.value, placeLink.value));
    addForm.reset();
    closePopup(addPopup);
};

addForm.addEventListener("submit", handleAddFormSubmit);


export { openPopup, cardsContainer, imagePopup };