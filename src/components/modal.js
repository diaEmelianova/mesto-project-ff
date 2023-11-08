//открытие и закрытие popup//
function openPopup(elem) {
  elem.classList.add("popup_opened");
}

function closePopup(elem) {
  elem.classList.remove("popup_opened");
}

export { openPopup, closePopup };
