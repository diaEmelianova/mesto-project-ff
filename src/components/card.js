import { openPopup } from "./modal";

const elementTemplate = document.querySelector("#card");
const bigImage = document.querySelector(".popup__image");
const popupFigcaption = document.querySelector(".popup__figcaption");
const popupImage = document.querySelector(".popup_image");

function createCard(title, link) {
  const newCard = elementTemplate.content.cloneNode(true);
  const image = newCard.querySelector(".element__image");

  newCard.querySelector(".element__title").textContent = title;
  image.alt = title;
  image.src = link;

  newCard
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });

  newCard
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });

  image.addEventListener("click", function (evt) {
    bigImage.setAttribute("src", link);
    bigImage.setAttribute("alt", title);
    popupFigcaption.textContent = title;
    openPopup(popupImage);
  });

  return newCard;
}

export default createCard;
