//открытие и закрытие popup//

function openPopup(elem) {
  elem.classList.add("popup_opened");
  

  document.addEventListener("keydown", closeByEscape);
}

function closePopup(elem) {
  elem.classList.remove("popup_opened");
  
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, closeByEscape };
