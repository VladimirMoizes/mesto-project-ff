import { doc } from "prettier";
import "./pages/index.css";
import { initialCards, createCard, deleteCardFunction, likeCardFunction, showImageFunction } from "./scripts/cards";
import { openPopup, closePopup } from "./scripts/modal";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
// Форма профиля
const profileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const closeProfileButton = profilePopup.querySelector(".popup__close");

// Находим форму в DOM
const formElement = profilePopup.querySelector(".popup__form");
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');

// Заполняем поля по умолчанию (текстом из разметки)
nameInput.value = document.querySelector(".profile__title").textContent;
jobInput.value = document.querySelector(".profile__description").textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  nameInput.value;
  jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  const profile__title = document.querySelector(".profile__title");
  const profile__description = document.querySelector(".profile__description");

  // Вставьте новые значения с помощью textContent
  profile__title.textContent = nameInput.value;
  profile__description.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//Форма по кнопке плюс
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddButton = addPopup.querySelector(".popup__close");

const formElementAdd = addPopup.querySelector('.popup__form');
const nameInputAdd = formElementAdd.querySelector('input[name="place-name"]');
const linkInputAdd = formElementAdd.querySelector('input[name="link"]');

function handleFormAddSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  linkInputAdd.value;
  nameInputAdd.value;

  // Создание объекта с присваиванием значений для ключей name, link
  let obj = {}
  obj.link = linkInputAdd.value;
  obj.name = nameInputAdd.value;
  console.log(obj);

  // Добавление нового объекта в начало массива с карточками
  initialCards.unshift(obj);

  // Вывод нового элемента массима на страницу
  initialCards.forEach((item, index) => { 
    if (index === 0) {
    document
      .querySelector(".places__list")
      .prepend(createCard(item, deleteCardFunction));
  }}
);
  closePopup(addPopup);
  linkInputAdd.value = ''
  nameInputAdd.value = ''
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementAdd.addEventListener("submit", handleFormAddSubmit);

// Открытие картинки при нажатии на карточку
export const popupImage = document.querySelector(".popup_type_image");
export const closeButtonImage = popupImage.querySelector(".popup__close");

// @todo: Функция создания карточки описана в cards.js

// Список всех карточек (для делегирования по клику)
export const cardsForLike = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  document
    .querySelector(".places__list")
    .append(createCard(item, deleteCardFunction, likeCardFunction, showImageFunction));
});

// Слушатели события на нажатие по кнопкам (для открытия двух форм)
profileButton.addEventListener("click", () => openPopup(profilePopup));
addButton.addEventListener("click", () => openPopup(addPopup));

// Слушатели события на нажатие по крестикам в двух формах
closeProfileButton.addEventListener("click", () => closePopup(profilePopup));
closeAddButton.addEventListener("click", () => closePopup(addPopup));





