// Здесь будет находиться всё, связанное с валидацией форм, кроме вызова функций enableValidation и clearValidation
// Они вызываются в index.js

// Функция показа ошибки
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  parameters
) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Добавляем нижнюю красную границу и текст ошибки
  inputElement.classList.add(parameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parameters.errorClass);
};

// Функция скрытия ошибки
const hideInputError = (formElement, inputElement, parameters) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Убираем нижнюю красную границу и текст ошибки
  inputElement.classList.remove(parameters.inputErrorClass);
  errorElement.classList.remove(parameters.errorClass);
  errorElement.textContent = "";
};

// Функция проверки валидности формы
const isValid = (formElement, inputElement, parameters) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // showInputError получает параметром форму, в которой
    // находится проверяемое поле, само это поле, текст ошибки и
    // объект параметров
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      parameters
    );
  } else {
    // hideInputError также, но без текста ошибки
    hideInputError(formElement, inputElement, parameters);
  }
};

// Функция, которая ищет хоть один невалидный инпут
// в форме, принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция для переключения (актисная/неактивная) кнопки формы
const toggleButtonState = (inputList, buttonElement, parameters) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(parameters.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(parameters.inactiveButtonClass);
  }
};

// Функция, которая проходит по всем полям формы.
// Вызывается в функции enableValidation
const setEventListeners = (formElement, parameters) => {
  // Получаем массив полей
  const inputList = Array.from(formElement);
  // Ищем кнопку внутри формы
  const buttonElement = formElement.querySelector(
    parameters.submitButtonSelector
  );

  // Сразу делаем кнопу активной/неактивной
  toggleButtonState(inputList, buttonElement, parameters);

  // Проходим по массиву полей, каждое поле проверяем на валидность
  // Меняем состояние кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, parameters);
      toggleButtonState(inputList, buttonElement, parameters);
    });
  });
};

// Функция для получения массива всех форм страницы
export const enableValidation = (parameters) => {
  const formList = Array.from(
    document.querySelectorAll(parameters.formSelector)
  );

  // Для каждой формы вызываем функцию setEventListeners
  formList.forEach((formElement) => setEventListeners(formElement, parameters));
};

// Функция очистки ошибок валидации
// Её вызываем при открытии форм
export const clearValidation = (profileForm, validationConfig) => {
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );

  inputList.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, validationConfig);
  });
};
