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

// По умолчанию значения в полях
nameInput.value = document.querySelector(".profile__title").textContent;
jobInput.value = document.querySelector(".profile__description").textContent;

// Модалка для картинок
export const popupImage = document.querySelector(".popup_type_image");
export const closeButtonImage = popupImage.querySelector(".popup__close");

closeButtonImage.addEventListener("click", () => closePopup(popupImage));

// Функция для открытия картинки по нажатию
function showImageFunction(image) {
  popupImage.querySelector(".popup__image").src = image.link;
  popupImage.querySelector(".popup__caption").textContent = image.name;
  openPopup(popupImage);
}

// Сохранение заполненных данных в форме профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

formElement.addEventListener("submit", handleFormSubmit);

// Форма добавления карточки
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddButton = addPopup.querySelector(".popup__close");

const formElementAdd = addPopup.querySelector(".popup__form");
const nameInputAdd = formElementAdd.querySelector('input[name="place-name"]');
const linkInputAdd = formElementAdd.querySelector('input[name="link"]');

const popupAll = document.querySelectorAll(".popup");
popupAll.forEach((item) => {
  item.classList.add("popup_is-animated");
});

// Функция добавления карточки
function handleFormAddSubmit(evt) {
  evt.preventDefault();

  const obj = {};
  obj.link = linkInputAdd.value;
  obj.name = nameInputAdd.value;

  initialCards.unshift(obj);

  initialCards.forEach((item, index) => {
    if (index === 0) {
      document
        .querySelector(".places__list")
        .prepend(
          createCard(
            item,
            deleteCardFunction,
            likeCardFunction,
            showImageFunction
          )
        );
    }
  });
  closePopup(addPopup);
  linkInputAdd.value = "";
  nameInputAdd.value = "";
}

formElementAdd.addEventListener("submit", handleFormAddSubmit);

// Вывод карточек из массива на страницу
initialCards.forEach((item) => {
  document
    .querySelector(".places__list")
    .append(
      createCard(item, deleteCardFunction, likeCardFunction, showImageFunction)
    );
});

// Слушатели клика для двух форм для открытия
profileButton.addEventListener("click", () => openPopup(profilePopup));
addButton.addEventListener("click", () => openPopup(addPopup));

// Слушатели клика для двух форм для закрытия
closeProfileButton.addEventListener("click", () => closePopup(profilePopup));
closeAddButton.addEventListener("click", () => closePopup(addPopup));
