import createCard from "./components/card.js";
import { openPopup, closePopup, closeByEscape } from "./components/modal.js";
import { initialCards } from "./components/cards.js";

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

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("button-close")) {
      console.log(evt.target);
      closePopup(popup);
    }
  });
});

profileEditButton.addEventListener("click", () => openPopup(profilePopup));

//редактирование информации о себе//

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((element) => {
  elementContainer.append(createCard(element.name, element.link));
});

// Форма добавления карточки

popupAddButton.addEventListener("click", () => openPopup(popupAdd));

// Добавление карточки

function addCard(evt) {
  evt.preventDefault();
  elementContainer.prepend(createCard(nameNewCard.value, linkNewCard.value));
  closePopup(popupAdd);
  evt.target.reset();
}

popupFormAddCard.addEventListener("submit", addCard);
