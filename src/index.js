import createCard from "./components/card.js";
import { openPopup, closePopup, closeByEscape } from "./components/modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getProfileInfo,
  getInitialCards,
  changeProfile,
  getNewCard,
  changeAvatar,
} from "./api.js";

import "./pages/index.css";

const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".profile-popup");
const profileForm = document.querySelector(".profile-popup>.popup__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popups = document.querySelectorAll(".popup");
const elementContainer = document.querySelector(".elements__item");
const popupAddButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup__add");
const linkNewCard = document.querySelector("#linkNewCard");
const nameNewCard = document.querySelector("#nameNewCard");
const popupFormAddCard = document.querySelector("#popupFormAddCard");
const profileAvatar = document.querySelector(".profile__avatar");
const buttonSaveProfile = document.querySelector(".input__btn");
const buttonCreateCard = document.querySelector("#buttonCreateCard");
const avatarButton = document.querySelector(".profile__edit-photo");
const avatarButtonSave = document.querySelector("#buttonAvatar");
const linkAvatarInput = document.querySelector("#linkAvatar");
const popupAvatar = document.querySelector(".popup__change-avatar");
const avatarForm = document.querySelector("#popupChangeAvatar");

const formConfiguration = {
  popup__formSelector: ".popup__form",
  buttonSelector: ".input__btn",
  inputSelector: ".popup__text",
  inputErrorClass: "popup__text_invalid",
  errorElementClass: "popup__error-message_visible",
  disableButtonClass: "popup__button_disabled",
};

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("button-close")) {
      closePopup(popup);
    }
  });
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  clearValidation(profileForm, formConfiguration);
  openPopup(profilePopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  buttonSaveProfile.textContent = "Сохранение...";

  changeProfile({ name: nameInput.value, about: jobInput.value })
    .then((result) => {
      profileTitle.textContent = result.name;
      profileSubtitle.textContent = result.about;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })

    .finally(() => (buttonSaveProfile.textContent = "Сохранить"));
  clearValidation(profileForm, formConfiguration);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

popupAddButton.addEventListener("click", () => {
  clearValidation(popupFormAddCard, formConfiguration);
  popupFormAddCard.reset();
  openPopup(popupAdd);
});

function addCard(evt) {
  evt.preventDefault();

  buttonCreateCard.textContent = "Создание...";

  getNewCard({ name: nameNewCard.value, link: linkNewCard.value })
    .then((result) => {
      elementContainer.prepend(
        createCard(
          result.name,
          result.link,
          true,
          result.likes.length,
          result._id,
          false
        )
      );
      closePopup(popupAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (buttonCreateCard.textContent = "Создать"));
  clearValidation(evt.target, formConfiguration);
  evt.target.reset();
}

popupFormAddCard.addEventListener("submit", addCard);

function newAvatar(evt) {
  evt.preventDefault();

  avatarButtonSave.textContent = "Сохранение...";

  changeAvatar(linkAvatarInput.value)
    .then((result) => {
      profileAvatar.src = result.avatar;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (avatarButtonSave.textContent = "Сохранить"));
  clearValidation(avatarForm, formConfiguration);
  evt.target.reset();
}

avatarForm.addEventListener("submit", newAvatar);

avatarButton.addEventListener("click", () => {
  clearValidation(avatarForm, formConfiguration);
  avatarForm.reset();
  openPopup(popupAvatar);
});

avatarButtonSave.addEventListener("click", () => {
  closePopup(popupAvatar);
});

enableValidation(formConfiguration);

Promise.all([getInitialCards(), getProfileInfo()]).then((result) => {
  const profileInfo = result[1];
  const initialCards = result[0];

  profileTitle.textContent = profileInfo.name;
  profileSubtitle.textContent = profileInfo.about;
  profileAvatar.src = profileInfo.avatar;

  initialCards.forEach((card) => {
    const isLiked = card.likes.some(
      (profile) => profile._id === profileInfo._id
    );
    elementContainer.append(
      createCard(
        card.name,
        card.link,
        profileInfo._id === card.owner._id,
        card.likes.length,
        card._id,
        isLiked
      )
    );
  });
  console.log(result);
});
