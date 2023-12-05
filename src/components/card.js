const elementTemplate = document.querySelector("#card");

function createCard(
  title,
  link,
  isDelete,
  likesCount,
  cardId,
  isLiked,
  onLike,
  onDelete,
  onImageClick
) {
  const newCard = elementTemplate.content.cloneNode(true);
  const image = newCard.querySelector(".element__image");
  const buttonDelete = newCard.querySelector(".element__delete");
  const likeCounter = newCard.querySelector(".element__like-counter");
  const buttonLike = newCard.querySelector(".element__like");

  newCard.querySelector(".element__title").textContent = title;
  image.alt = title;
  image.src = link;

  likeCounter.textContent = likesCount;

  if (isDelete) {
    buttonDelete.style.display = "block";
  }

  if (isLiked) {
    buttonLike.classList.add("element__like_active");
  }

  buttonLike.addEventListener("click", () =>
    onLike(buttonLike, cardId, likeCounter)
  );

  buttonDelete.addEventListener("click", () => onDelete(buttonDelete, cardId));

  image.addEventListener("click", () => onImageClick(link, title));

  return newCard;
}

export default createCard;
