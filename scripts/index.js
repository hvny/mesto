const profileContainer = document.querySelector(".profile");
let userName = profileContainer.querySelector(".profile__name");
let userStatus = profileContainer.querySelector(".profile__status");
const profileEditButton = profileContainer.querySelector(".profile__button_type_edit");
const profileAddButton = profileContainer.querySelector(".profile__button_type_add");


const popup = document.querySelector(".popup");
const editPopup = document.querySelector("#editPopup");
const editPopupCloseButton = editPopup.querySelector(".popup__button_type_close");
const editForm = editPopup.querySelector("#editProfileForm");
const profileName = editPopup.querySelector("#profileNameInput");
const profileInfo = editPopup.querySelector("#profileInfoInput");

const addPopup = document.querySelector("#addPopup");
const addPopupCloseButton = addPopup.querySelector(".popup__button_type_close");
const addForm = addPopup.querySelector("#addCardForm");

const imagePopup = document.querySelector("#imagePopup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__button_type_close");

const cardsContainer = document.querySelector(".elements");

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

initialCards.forEach((item) => { //добавляем карточки из массива
    addCard(item);
});

function addCard(card) { //функция добавления карточки
    const userTemplate = document.querySelector("#element").content;
    const userCard = userTemplate.querySelector(".element").cloneNode(true);
    const userCardTitle = userCard.querySelector(".element__title");
    const userCardImage = userCard.querySelector(".element__image");

    userCardTitle.textContent = card.name;
    userCardImage.setAttribute("src", card.link);
    userCardImage.setAttribute("alt", card.name);

    cardsContainer.prepend(userCard);

    userCard.querySelector(".element__button_type_like").addEventListener("click", (evt) => { //ставим лайк
        evt.target.classList.toggle('element__button_type_like_active');
    });

    userCardImage.addEventListener("click", (evt) => { //открываем попап с фотографией
        const image = imagePopup.querySelector(".popup__image");
        const ImageTitle = imagePopup.querySelector(".popup__image-title");

        image.setAttribute("src", evt.target.getAttribute("src"));
        ImageTitle.textContent = evt.target.getAttribute("alt");

        openPopup(imagePopup)
    });

    userCard.querySelector(".element__button_type_close").addEventListener("click", (evt) => { //удаляем карточку
        cardsContainer.removeChild(userCard);
    });
}

function openPopup(somePopup) { //функция открытия попапа
    somePopup.classList.add("popup_opened");
}

function closePopup(somePopup) { //функция закрытия попапа
    somePopup.classList.remove("popup_opened");
}


//попап изменения профиля
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

editPopupCloseButton.addEventListener("click", () => { //закрываем
    closePopup(editPopup);
});

editForm.addEventListener("submit", handleEditFormSubmit);


//попап добавления карточки
profileAddButton.addEventListener("click", () => { //открываем попап 
    openPopup(addPopup);
});


function handleAddFormSubmit(evt) { //добавляем карточку
    evt.preventDefault();

    const placeName = addPopup.querySelector("#placeNameInput").value;
    const placeLink = addPopup.querySelector("#placeLinkInput").value;
    let newCard = {
        name: placeName,
        link: placeLink
    };
    addCard(newCard);
    addPopup.querySelector("#placeNameInput").value = "";
    addPopup.querySelector("#placeLinkInput").value = "";
    closePopup(addPopup);
}

addPopupCloseButton.addEventListener("click", () => { //закрываем
    closePopup(addPopup);
});

addForm.addEventListener("submit", handleAddFormSubmit);


//попап с фотографией

imagePopupCloseButton.addEventListener("click", () => { //закрываем
    closePopup(imagePopup);
});