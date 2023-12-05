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

function setCloseModalWindowEventListeners(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("button-close")) {
      closePopup(popup);
    }
  });
}

export {
  openPopup,
  closePopup,
  closeByEscape,
  setCloseModalWindowEventListeners,
};
