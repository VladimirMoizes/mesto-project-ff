import "./pages/index.css";
import { createCard } from "./scripts/cards";
import { openPopup, closePopup } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  getInitialCards,
  getUserId,
  editProfile,
  addNewCard,
  deleteCard,
  changeAvatar,
  addLike,
  deleteCardLike,
} from "./scripts/api";

// Форма для обновления аватара
const avatar = document.querySelector(".profile__image");
const formAvatar = document.querySelector(".popup_type_new-ava");
const closeAvatarButton = formAvatar.querySelector(".popup__close");
const buttonAvatarForm = formAvatar.querySelector(".button");

// Поле формы смены аватара
const avatarForm = formAvatar.querySelector(".popup__form");
const avatarLink = avatarForm.querySelector('input[name="link"]');

// Форма для редактирования информации в профиле
const profileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const closeProfileButton = profilePopup.querySelector(".popup__close");

// Поля формы имя и работы
const formElement = profilePopup.querySelector(".popup__form");
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');
const buttonProfileForm = profilePopup.querySelector(".button");

// Данные профиля на странице
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// Модалка для картинок
const popupImage = document.querySelector(".popup_type_image");
const closeButtonImage = popupImage.querySelector(".popup__close");

// Картинка и описание в модалке открытия картинки
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

// Форма добавления карточки
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddButton = addPopup.querySelector(".popup__close");

const formElementAdd = addPopup.querySelector(".popup__form");
const buttonImageForm = addPopup.querySelector(".button");
const nameInputAdd = formElementAdd.querySelector('input[name="place-name"]');
const linkInputAdd = formElementAdd.querySelector('input[name="link"]');

// Галерея карточек
const gallery = document.querySelector(".places__list");

// Объект с классами для валидации
const objectValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Плавное открытие всех модалок
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

// Вызов функции, отвечающей за валидацию всех форм
enableValidation(objectValidation);

// Массив промисов. Выполнится, когда с сервера придут данные карточек и пользователя
Promise.all([getInitialCards(), getUserId()])
  .then(([card, user]) => {
    card.forEach((item) => {
      gallery.append(
        createCard(
          item,
          handleDeleteCard,
          handleLikeCard,
          showImageFunction,
          user._id
        )
      );
    });
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });

// Функция удаления карточки
const handleDeleteCard = (card, cardElement) => {
  deleteCard(card)
    .then(cardElement.closest(".places__item").remove())
    .catch((err) => {
      console.log(err);
    });
};

// Функция постановки и снятия лайка
const handleLikeCard = (card, cardLikeButton, cardLikesCounter) => {
  if (!cardLikeButton.classList.contains("card__like-button_is-active")) {
    addLike(card)
      .then((item) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        cardLikesCounter.textContent = item.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteCardLike(card)
      .then((item) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        cardLikesCounter.textContent = item.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Слушатель закрытия модалки с картинкой
closeButtonImage.addEventListener("click", () => closePopup(popupImage));

// Слушатели отправки двух форм
formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const valueForm = {
    name: nameInput.value,
    about: jobInput.value,
  };

  buttonProfileForm.textContent = "Сохранение...";

  // Сохранение заполненных данных в форме профиля
  editProfile(valueForm)
    .then((updateData) => {
      profileTitle.textContent = updateData.name;
      profileDescription.textContent = updateData.about;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((buttonProfileForm.textContent = "Сохранить"));
});

// Смена аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const valueLink = {
    avatar: avatarLink.value,
  };

  buttonAvatarForm.textContent = "Сохранение...";

  changeAvatar(valueLink)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((buttonAvatarForm.textContent = "Сохранить"));

  closePopup(formAvatar);
  avatarForm.reset();
});

// Добавление новой карточки при отправке формы
formElementAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardObj = {
    name: nameInputAdd.value,
    link: linkInputAdd.value,
  };

  buttonImageForm.textContent = "Сохранение...";

  // Отправление на сервер новой карточки и её вывод на страницу
  addNewCard(newCardObj)
    .then((newCard) => {
      gallery.prepend(
        createCard(
          newCard,
          handleDeleteCard,
          handleLikeCard,
          showImageFunction,
          newCard.owner._id
        )
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((buttonImageForm.textContent = "Сохранить"));
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
  buttonProfileForm.classList.remove("popup__button_disabled");
  buttonProfileForm.disabled = false;

  // Функция очистки валидации
  clearValidation(profilePopup, objectValidation);
});

// Слушатель нажатия на кноку открытия модалки
// добавления карточки
addButton.addEventListener("click", () => {
  openPopup(addPopup);
  buttonImageForm.classList.add("popup__button_disabled");
  buttonImageForm.disabled = true;
  clearValidation(addPopup, objectValidation);
});

// Слушатель нажатия на аватар
avatar.addEventListener("click", () => {
  openPopup(formAvatar);
  buttonAvatarForm.classList.add("popup__button_disabled");
  buttonAvatarForm.disabled = true;
});

// Слушатели клика для закрытия модалок
closeProfileButton.addEventListener("click", () => {
  closePopup(profilePopup);
});
closeAddButton.addEventListener("click", () => {
  closePopup(addPopup);
});
closeAvatarButton.addEventListener("click", () => {
  closePopup(formAvatar);
});
