const profileContainer = document.querySelector(".profile");
const userName = profileContainer.querySelector(".profile__name");
const userStatus = profileContainer.querySelector(".profile__status");
const profileEditButton = profileContainer.querySelector(".profile__button_type_edit");
const profileAddButton = profileContainer.querySelector(".profile__button_type_add");

const popup = document.querySelector(".popup");
const editPopup = document.querySelector("#editPopup");
const editForm = editPopup.querySelector("#editProfileForm");
const profileName = editPopup.querySelector("#profileNameInput");
const profileInfo = editPopup.querySelector("#profileInfoInput");

const addPopup = document.querySelector("#addPopup");
const addForm = addPopup.querySelector("#addCardForm");
const placeName = addPopup.querySelector("#placeNameInput");
const placeLink = addPopup.querySelector("#placeLinkInput");

const imagePopup = document.querySelector("#imagePopup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__button_type_close");
const imageOpened = imagePopup.querySelector(".popup__image");
const imageTitle = imagePopup.querySelector(".popup__image-title");

const cardsContainer = document.querySelector(".elements");
const userTemplate = document.querySelector("#element").content;

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

/*создаём карточку*/

function createCard(title, url) {
    let userCard = userTemplate.querySelector(".element").cloneNode(true);
    let userCardTitle = userCard.querySelector(".element__title");
    let userCardImage = userCard.querySelector(".element__image");
    let cardLikeButton = userCard.querySelector(".element__button_type_like");
    let cardDeleteButton = userCard.querySelector(".element__button_type_close");
    userCardTitle.textContent = title;
    userCardImage.setAttribute("src", url);
    userCardImage.setAttribute("alt", title);

    userCardImage.addEventListener("click", (evt) => { //открываем фото
        imageOpened.src = url;
        imageOpened.alt = title;
        imageTitle.textContent = title;
        openPopup(imagePopup);
    });

    cardLikeButton.addEventListener("click", (evt) => { //лайкаем карточку
        evt.target.classList.toggle('element__button_type_like_active');
    });

    cardDeleteButton.addEventListener("click", () => { //удаляем карточку
        cardsContainer.removeChild(userCard);
    });

    return userCard;
}


/*добавляем карточку в начало*/

function addCard(card) {
    cardsContainer.prepend(card);
}

/*добавляем карточки из массива*/

initialCards.forEach((item) => {
    addCard(createCard(item.name, item.link));
});

/*открытие попапа*/

function openPopup(somePopup) {
    somePopup.classList.add("popup_opened");
}

/*закрытие попапа*/

function closePopup(somePopup) {
    somePopup.classList.remove("popup_opened");
}


/*попап изменения профиля*/

function handleEditFormSubmit(evt) { //кнопка "сохранить"
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
});

function handleAddFormSubmit(evt) { //добавляем карточку
    evt.preventDefault();
    addCard(createCard(placeName.value, placeLink.value));
    addForm.reset();
    closePopup(addPopup);
}

addForm.addEventListener("submit", handleAddFormSubmit);