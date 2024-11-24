import "./pages/index.css";
import {
  initialCards,
  createCard,
  deleteCardFunction,
  likeCardFunction,
} from "./scripts/cards";
import { openPopup, closePopup } from "./scripts/modal";

// Форма для редактирования информации в профиле
const profileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const closeProfileButton = profilePopup.querySelector(".popup__close");

// Поля формы имя и работы
const formElement = profilePopup.querySelector(".popup__form");
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');

// Данные формы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// По умолчанию значения в полях
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Модалка для картинок
export const popupImage = document.querySelector(".popup_type_image");
export const closeButtonImage = popupImage.querySelector(".popup__close");

// Картинка и описание в модалке открытия картинки
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

// Форма добавления карточки
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddButton = addPopup.querySelector(".popup__close");

const formElementAdd = addPopup.querySelector(".popup__form");
const nameInputAdd = formElementAdd.querySelector('input[name="place-name"]');
const linkInputAdd = formElementAdd.querySelector('input[name="link"]');

// Галерея карточек
const gallery = document.querySelector(".places__list");

const popupAll = document.querySelectorAll(".popup");
popupAll.forEach((item) => {
  item.classList.add("popup_is-animated");
});

// Функция для открытия картинки по нажатию
function showImageFunction(image) {
  popupImageImg.src = image.link;
  popupImageCaption.textContent = image.name;
  openPopup(popupImage);
}

// Сохранение заполненных данных в форме профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Функция добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const obj = {};
  obj.link = linkInputAdd.value;
  obj.name = nameInputAdd.value;

  gallery.prepend(
    createCard(obj, deleteCardFunction, likeCardFunction, showImageFunction)
  );

  closePopup(addPopup);
  linkInputAdd.value = "";
  nameInputAdd.value = "";
}

// Вывод карточек из массива на страницу
initialCards.forEach((item) => {
  gallery.append(
    createCard(item, deleteCardFunction, likeCardFunction, showImageFunction)
  );
});

// Слушатель закрытия модалки с картинкой
closeButtonImage.addEventListener("click", () => closePopup(popupImage));

// Слушатели отправки двух форм
formElement.addEventListener("submit", handleProfileFormSubmit);
formElementAdd.addEventListener("submit", handleAddFormSubmit);

// Слушатели клика для двух форм для открытия
profileButton.addEventListener("click", () => openPopup(profilePopup));
addButton.addEventListener("click", () => openPopup(addPopup));

// Слушатели клика для двух форм для закрытия
closeProfileButton.addEventListener("click", () => closePopup(profilePopup));
closeAddButton.addEventListener("click", () => closePopup(addPopup));
