//Слушатели
function showError(input, form, config) {
  input.classList.add(config.inputErrorClass); 

  //найти спан
  const spanIdSelector = `#${input.name}--error`;
  //console.log(spanIdSelector)
  const errorElement = form.querySelector(spanIdSelector);

  //добавить класс для отображения
  errorElement.classList.add(config.errorElementClass);

  //записать текст ошибки
  errorElement.textContent = input.validationMessage;
}

function hideError(input, form, config) {
  input.classList.remove(config.inputErrorClass);

  //найти спан
  const spanIdSelector = `#${input.name}--error`;
  //console.log(spanIdSelector)
  const errorElement = form.querySelector(spanIdSelector);

  //убрать класс
  errorElement.classList.remove(config.errorElementClass);

  //убрать текст ошибки
  errorElement.textContent = "";
}



function checkInputValidity(input, form, config) {
    console.log(input.validity.patternMismatch)
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage)
    } else {
        input.setCustomValidity("")
    }


  if (input.validity.valid) {
    hideError(input, form, config);
  } else {
    showError(input, form, config);
  }

  
}

function disableButton(buttonElement, config) {
    buttonElement.disabled = true
    buttonElement.classList.add(config.disableButtonClass)
}

function enableButton(buttonElement, config) {
    buttonElement.disabled = false
    buttonElement.classList.remove(config.disableButtonClass)
}

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid
    })

}

function toggleButtonState(buttonElement, inputList, config) {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, config)
    } else {
        enableButton(buttonElement, config)
    }

}

function setEventListener(formElement, config) {
  //найти кнопку
  const buttonElement = formElement.querySelector(config.buttonSelector);

  //найти поля ввода
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  //console.log(inputList)

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, formElement, config);
      toggleButtonState(buttonElement, inputList, config)
    });
    
  });
}

//Функции обработчики
export function enableValidation(config) {
  const forms = Array.from(
    document.querySelectorAll(config.popup__formSelector)
  );
  //console.log(forms)

  forms.forEach((formElement) => {
    setEventListener(formElement, config);
  });
}


export function clearValidation(form,  config) {

    const inputList = Array.from(
        form.querySelectorAll(config.inputSelector)
      )
      const buttonElement = form.querySelector(config.buttonSelector)
      disableButton(buttonElement, config)
      inputList.forEach((input) => {
        hideError(input, form, config)
      })

}

