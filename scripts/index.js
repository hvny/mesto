let profileContainer = document.querySelector(".profile");
let userName = profileContainer.querySelector(".profile__name");
let userStatus = profileContainer.querySelector(".profile__status");
let profileEditButton = profileContainer.querySelector(".profile__button_type_edit");
let profileAddButton = profileContainer.querySelector(".profile__button_type_add");


let popup = document.querySelector(".popup");
let editPopup = document.querySelector("#editPopup");
let profileName = editPopup.querySelector("#profileNameInput");
let profileInfo = editPopup.querySelector("#profileInfoInput");

let addPopup = document.querySelector("#addPopup");
let placeName = editPopup.querySelector("#placeNameInput");
let placeLink = editPopup.querySelector("#placeLinkInput");

let imagePopup = document.querySelector("#imagePopup");

let cardsContainer = document.querySelector(".elements");

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
    const userTemplate = document.querySelector("#element").content;
    const userCard = userTemplate.querySelector(".element").cloneNode(true);
    userCard.querySelector(".element__title").textContent = item.name;
    userCard.querySelector(".element__image").setAttribute("src", item.link);
    userCard.querySelector(".element__image").setAttribute("alt", item.name);
    cardsContainer.append(userCard);
});

let image = cardsContainer.querySelector(".element__image")

function showedPopup(somePopup) { //открытый попап
    somePopup.classList.add("popup_opened");
    let popupCloseButton = somePopup.querySelector(".popup__button_type_close"); //переменная с кнопкой закрытия открытого попапа

    if (somePopup === editPopup) { //если открыт попап редактирования профиля
        profileName.value = userName.textContent;
        profileInfo.value = userStatus.textContent;

        let editForm = somePopup.querySelector("#editProfileForm");

        function handleEditFormSubmit(evt) { //кнопка "сохранить"
            evt.preventDefault();
            userName.textContent = profileName.value;
            userStatus.textContent = profileInfo.value;
            closePopup(somePopup);
        }
        editForm.addEventListener("submit", handleEditFormSubmit);
    } else if (somePopup === addPopup) { //если открыт попап добавления карточки
        let addForm = somePopup.querySelector("#addCardForm");

        function handleAddFormSubmit(evt) { //кнопка "добавить"
            evt.preventDefault();
            closePopup(somePopup);
        }

        addForm.addEventListener("submit", handleAddFormSubmit);
    }

    function closePopup(somePopup) { //функция закрытия попапа
        somePopup.classList.remove("popup_opened");
    }

    popupCloseButton.addEventListener("click", () => { //закрываем
        closePopup(somePopup);
    });
}

profileEditButton.addEventListener("click", () => {
    showedPopup(editPopup);
});


profileAddButton.addEventListener("click", () => {
    showedPopup(addPopup);
});

image.addEventListener("click", () => {
    showedPopup(imagePopup);
    console.log(image);
})