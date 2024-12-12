import "./pages/index.css";
import {
  createCard,
  deleteCardFunction,
  likeCardFunction,
} from "./scripts/cards";
import { openPopup, closePopup } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  getInitialCards,
  getUserId,
  editProfile,
  addNewCard,
} from "./scripts/api";

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
  popupImageImg.alt = image.name;
  popupImageCaption.textContent = image.name;
  openPopup(popupImage);
}

// Сохранение заполненных данных в форме профиля
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();

//   profileTitle.textContent = nameInput.value;
//   profileDescription.textContent = jobInput.value;

//   closePopup(profilePopup);
// }

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
  formElementAdd.reset();
}

// Вывод карточек из массива на страницу
// initialCards.forEach((item) => {
//   gallery.append(
//     createCard(item, deleteCardFunction, likeCardFunction, showImageFunction)
//   );
// });

// Вызов функции, отвечающей за валидацию всех форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

getInitialCards().then((data) => {
  const arrData = Array.from(data);
  arrData.forEach((item) => {
    gallery.append(
      createCard(item, deleteCardFunction, likeCardFunction, showImageFunction)
    );
  });
});

getUserId().then((data) => {
  const profileImage = document.querySelector(".profile__image");
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
});

// ВОТ ЗДЕСЬ НАЧИНАЕТСЯ ПУТАНИЦА. ПОКА ДЛЯ ТЕСТА Я ПРОСТО НАПИСАЛ КОНКРЕТНЫЕ ЗНАЧЕНИ
// КЛЮЧЕЙ, ПОТОМУ ЧТО ЗНАЧЕНИЯ ИХ ПОЛЕЙ НЕ ВЫТАСКИВАЮТСЯ. 
const valueForm = {
  name: "Колумб",
  about: "Исследователь",
};

editProfile(valueForm).then((updateData) => {
  profileTitle.textContent = updateData.name;
  profileDescription.textContent = updateData.about;
  closePopup(profilePopup);
});

const newCardObj = {
  name: "Прив",
  link: "https://i.pinimg.com/originals/c4/4a/74/c44a74f0553bcf43d178c64a65d52779.jpg"
};

addNewCard(newCardObj).then((newCard) => {
  return newCard;
});

// Слушатель закрытия модалки с картинкой
closeButtonImage.addEventListener("click", () => closePopup(popupImage));

// Слушатели отправки двух форм
formElement.addEventListener("submit", editProfile);
formElementAdd.addEventListener("submit", () => {
  gallery.prepend(
    createCard(
      addNewCard,
      deleteCardFunction,
      likeCardFunction,
      showImageFunction
    )
  );
  closePopup(addPopup);
  formElementAdd.reset();
});

// Слушатели клика для двух форм для открытия и очистки ошибок валидации
profileButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  // Чтобы при открытии модалки, кнопка была активной всегда,
  // так как подставляются всегда валидные данные
  document
    .querySelector(".popup__button")
    .classList.remove("popup__button_disabled");
  document.querySelector(".popup__button").disabled = false;
  //

  clearValidation(profilePopup, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
  clearValidation(addPopup, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
});

// Слушатели клика для двух форм для закрытия
closeProfileButton.addEventListener("click", () => {
  closePopup(profilePopup);
});
closeAddButton.addEventListener("click", () => {
  closePopup(addPopup);
});

console.log(nameInput, jobInput);
