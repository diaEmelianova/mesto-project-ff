import { openPopup } from "./modal";
import { deleteCard, setLike, unsetLike } from "../api";

const elementTemplate = document.querySelector("#card");
const bigImage = document.querySelector(".popup__image");
const popupFigcaption = document.querySelector(".popup__figcaption");
const popupImage = document.querySelector(".popup_image");

function createCard(title, link, isDelete, likesCount, cardId, isLiked) {
  const newCard = elementTemplate.content.cloneNode(true);
  const image = newCard.querySelector(".element__image");
  const buttonDelete = newCard.querySelector(".element__delete");
  const likeCounter = newCard.querySelector(".element__like-counter");
  const buttonLike = newCard.querySelector(".element__like");

  newCard.querySelector(".element__title").textContent = title;
  image.alt = title;
  image.src = link;

  //отображение количества лайков
  likeCounter.textContent = likesCount;

  //отображение кнопки удаления
  if (isDelete) {
    buttonDelete.style.display = "block";
  }

  if (isLiked) {
    buttonLike.classList.add("element__like_active");
  }

  buttonLike.addEventListener("click", function (evt) {
   
    //проверка есть ли лайк
    if ( evt.target.classList.contains('element__like_active')) {
      //вызываю unsetLik
      unsetLike(cardId)
        .then((result) => {
          evt.target.classList.remove("element__like_active");
          //применяю счетчик лайков
          likeCounter.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //вызываю setlike
      setLike(cardId)
        .then((result) => {
          evt.target.classList.add("element__like_active");
          //применяю счетчик лайков
          likeCounter.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // buttonLike.addEventListener("click", function (evt) {
   
    //проверка есть ли лайк
  //   if (!isLiked) {
  //     //вызываю unsetLik
  //     setLike(cardId)
  //       .then((result) => {
  //         evt.target.classList.add("element__like_active");
  //         //применяю счетчик лайков
  //         likeCounter.textContent = result.likes.length;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     //вызываю setlike
  //     unsetLike(cardId)
  //       .then((result) => {
  //         evt.target.classList.remove("element__like_active");
  //         //применяю счетчик лайков
  //         likeCounter.textContent = result.likes.length;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // });



  buttonDelete.addEventListener("click", function (evt) {
    deleteCard(cardId)
      .then(() => {
        evt.target.closest(".element").remove();
      })
      .catch((err) => {
        console.log(err);
      });
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
