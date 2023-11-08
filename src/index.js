import createCard from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

import "./pages/index.css";

const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".profile-popup");
const profileCloseButton = document.querySelector(".button-close");
const profileForm = document.querySelector(".profile-popup>.popup__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupImage = document.querySelector(".popup_image");
const popups = document.querySelectorAll(".popup");
const elementContainer = document.querySelector(".elements__item");
const popupAddButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup__add");
const popupAddCloseButton = document.querySelector("#popupAddCloseButton");
const linkNewCard = document.querySelector("#linkNewCard");
const nameNewCard = document.querySelector("#nameNewCard");
const buttonCreateNewCard = document.querySelector("#buttonCreateCard");
const popupFormAddCard = document.querySelector("#popupFormAddCard");

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
});

popups.forEach((elem) => {
  elem.addEventListener("click", (evt) => {
    if (evt.target.classList?.contains("popup")) {
      closePopup(evt.target);
    }
  });
});

profileEditButton.addEventListener("click", () => openPopup(profilePopup));
profileCloseButton.addEventListener("click", () => closePopup(profilePopup));

//редактирование информации о себе//

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileForm.addEventListener("submit", (evt) => handleProfileFormSubmit(evt));

//Массив карточек

import capadokiaImage from "./images/capadokia.jpg";
import kamchatkaImage from "./images/kamchatka.jpg";
import canionImage from "./images/canion.jpg";
import pragsImage from "./images/prags.jpg";
import forestImage from "./images/forest.jpg";
import japanImage from "./images/japan.jpg";

const initialCards = [
  {
    name: "Кападокия",
    link: capadokiaImage,
  },
  {
    name: "Камчатка",
    link: kamchatkaImage,
  },
  {
    name: "Озеро Прагс",
    link: pragsImage,
  },
  {
    name: "Высокий лес",
    link: forestImage,
  },
  {
    name: "Гранд каньон",
    link: canionImage,
  },
  {
    name: "Япония",
    link: japanImage,
  },
];

initialCards.forEach((element) => {
  elementContainer.append(createCard(element.name, element.link));
});

popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));

// Форма добавления карточки

popupAddButton.addEventListener("click", () => openPopup(popupAdd));
popupAddCloseButton.addEventListener("click", () => closePopup(popupAdd));

// Добавление карточки

function addCard(evt) {
  evt.preventDefault();
  elementContainer.prepend(createCard(nameNewCard.value, linkNewCard.value));
  closePopup(popupAdd);
  evt.target.reset();
}

popupFormAddCard.addEventListener("submit", addCard);
