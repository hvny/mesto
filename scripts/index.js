let profileContainer = document.querySelector(".profile");
let userName = profileContainer.querySelector(".profile__name");
let userStatus = profileContainer.querySelector(".profile__status");
let profileEditButton = profileContainer.querySelector(".profile__button_type_edit");

let popup = document.querySelector(".popup");
let popupCloseButton = popup.querySelector(".popup__button_type_close");
let nameInput = popup.querySelector("#nameInput");
let infoInput = popup.querySelector("#infoInput");


function openPopup() { //открыть popup
    popup.classList.add("popup_opened");
    nameInput.value = userName.textContent;
    infoInput.value = userStatus.textContent;
}

function closePopup() { //закрыть popup
    popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) { //кнопка "сохранить"
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userStatus.textContent = infoInput.value;
    closePopup();
}



profileEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
popup.addEventListener("submit", handleFormSubmit);