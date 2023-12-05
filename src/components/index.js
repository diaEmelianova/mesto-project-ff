import createCard from "./card.js";
import {
  openPopup,
  closePopup,
  closeByEscape,
  setCloseModalWindowEventListeners,
} from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getProfileInfo,
  getInitialCards,
  changeProfile,
  getNewCard,
  changeAvatar,
  setLike,
  unsetLike,
  deleteCard,
} from "./api.js";

import "../pages/index.css";

const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".profile-popup");
const profileForm = document.querySelector(".profile-popup>.popup__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popups = document.querySelectorAll(".popup");
const cardsContainer = document.querySelector(".elements__item");
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
const bigImage = document.querySelector(".popup__image");
const popupFigcaption = document.querySelector(".popup__figcaption");
const popupImage = document.querySelector(".popup_image");

const formConfiguration = {
  popup__formSelector: ".popup__form",
  buttonSelector: ".input__btn",
  inputSelector: ".popup__text",
  inputErrorClass: "popup__text_invalid",
  errorElementClass: "popup__error-message_visible",
  disableButtonClass: "popup__button_disabled",
};

popups.forEach(setCloseModalWindowEventListeners);

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
      cardsContainer.prepend(
        createCard(
          result.name,
          result.link,
          true,
          result.likes.length,
          result._id,
          false,
          onLike,
          onDelete,
          onImageClick
        )
      );
      closePopup(popupAdd);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (buttonCreateCard.textContent = "Создать"));
  clearValidation(evt.target, formConfiguration);
}

popupFormAddCard.addEventListener("submit", addCard);

function handleUpdateAvatar(evt) {
  evt.preventDefault();

  avatarButtonSave.textContent = "Сохранение...";

  changeAvatar(linkAvatarInput.value)
    .then((result) => {
      profileAvatar.src = result.avatar;
      closePopup(popupAvatar);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (avatarButtonSave.textContent = "Сохранить"));
  clearValidation(avatarForm, formConfiguration);
}

avatarForm.addEventListener("submit", handleUpdateAvatar);

avatarButton.addEventListener("click", () => {
  clearValidation(avatarForm, formConfiguration);
  avatarForm.reset();
  openPopup(popupAvatar);
});

function onLike(buttonLike, cardId, likeCounter) {
  if (buttonLike.classList.contains("element__like_active")) {
    unsetLike(cardId)
      .then((result) => {
        buttonLike.classList.remove("element__like_active");
        likeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setLike(cardId)
      .then((result) => {
        buttonLike.classList.add("element__like_active");
        likeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function onDelete(buttonDelete, cardId) {
  deleteCard(cardId)
    .then(() => {
      buttonDelete.closest(".element").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function onImageClick(link, title) {
  bigImage.setAttribute("src", link);
  bigImage.setAttribute("alt", title);
  popupFigcaption.textContent = title;
  openPopup(popupImage);
}

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
    cardsContainer.append(
      createCard(
        card.name,
        card.link,
        profileInfo._id === card.owner._id,
        card.likes.length,
        card._id,
        isLiked,
        onLike,
        onDelete,
        onImageClick
      )
    );
  });
});
