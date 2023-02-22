let profileContainer = document.querySelector(".profile");
let userName = profileContainer.querySelector(".profile__name");
let userStatus = profileContainer.querySelector(".profile__status");
let profileEditButton = profileContainer.querySelector(".profile__button_type_edit");
let profileAddButton = profileContainer.querySelector(".profile__button_type_add");


let popup = document.querySelector(".popup");

let editPopup = document.querySelector(".popup_type_edit");
let profileName = editPopup.querySelector("#profileNameInput");
let profileInfo = editPopup.querySelector("#profileInfoInput");

let addPopup = document.querySelector(".popup_type_add");
let addForm = editPopup.querySelector("#addCardForm");
let placeName = editPopup.querySelector("#placeNameInput");
let placeLink = editPopup.querySelector("#placeLinkInput");


/*
function openEditPopup() { //открыть popup профиля
    editPopup.classList.add("popup_opened");
    profileName.value = userName.textContent;
    profileInfo.value = userStatus.textContent;
}

function openAddPopup() { //открыть popup карточки
    addPopup.classList.add("popup_opened");
}

function closePopup() { //закрыть popup
    popup.classList.toggle("popup_opened");
}

function handleEditFormSubmit(evt) { //кнопка "сохранить"
    evt.preventDefault();
    userName.textContent = profileName.value;
    userStatus.textContent = profileInfo.value;
    closePopup();
}*/

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