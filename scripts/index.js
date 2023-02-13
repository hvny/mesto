let profileContainer = document.querySelector(".profile");
let userName = profileContainer.querySelector(".profile__name");
let userStatus = profileContainer.querySelector(".profile__status");
let profileEditButton = profileContainer.querySelector(".profile__button_type_edit");

let popup = document.querySelector(".popup");
let popupCloseButton = popup.querySelector(".popup__button_type_close");
let popupSaveButton = popup.querySelector(".popup__button_type_save");
let nameInput = popup.querySelector("#nameInput");
let infoInput = popup.querySelector("#infoInput");


function togglePopup() {
    popup.classList.toggle("popup_opened");
    if (popup.classList.contains("popup_opened")) {
        nameInput.value = userName.textContent;
        infoInput.value = userStatus.textContent;
    }

}

function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userStatus.textContent = infoInput.value;
    popup.classList.remove("popup_opened");
}



profileEditButton.addEventListener("click", togglePopup);
popupCloseButton.addEventListener("click", togglePopup);
popupSaveButton.addEventListener("click", handleFormSubmit);