function showError(input, form, config) {
  input.classList.add(config.inputErrorClass);

  const spanIdSelector = `#${input.name}--error`;

  const errorElement = form.querySelector(spanIdSelector);

  errorElement.classList.add(config.errorElementClass);

  errorElement.textContent = input.validationMessage;
}

function hideError(input, form, config) {
  input.classList.remove(config.inputErrorClass);

  const spanIdSelector = `#${input.name}--error`;

  const errorElement = form.querySelector(spanIdSelector);

  errorElement.classList.remove(config.errorElementClass);

  errorElement.textContent = "";
}

function checkInputValidity(input, form, config) {
  console.log(input.validity.patternMismatch);
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (input.validity.valid) {
    hideError(input, form, config);
  } else {
    showError(input, form, config);
  }
}

function disableButton(buttonElement, config) {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.disableButtonClass);
}

function enableButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.disableButtonClass);
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(buttonElement, inputList, config) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

function setEventListener(formElement, config) {
  const buttonElement = formElement.querySelector(config.buttonSelector);

  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, formElement, config);
      toggleButtonState(buttonElement, inputList, config);
    });
  });
}

export function enableValidation(config) {
  const forms = Array.from(
    document.querySelectorAll(config.popup__formSelector)
  );

  forms.forEach((formElement) => {
    setEventListener(formElement, config);
  });
}

export function clearValidation(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.buttonSelector);
  disableButton(buttonElement, config);
  inputList.forEach((input) => {
    hideError(input, form, config);
  });
}
