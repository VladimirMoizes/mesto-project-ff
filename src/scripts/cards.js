import {
  cardTemplate,
  closeButtonImage,
  popupImage,
  cardsForLike,
} from "../index";
import { openPopup, closePopup } from "./modal";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточки
export function createCard(card, deleteCard, likeCard, showImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardElementImage.src = card.link;
  cardElementTitle.textContent = card.name;
  cardDeleteButton.addEventListener("click", function (evt) {
    deleteCard(evt.target.closest(".places__item"));
  });

  // По клику на картинку открывается на весь экран
  cardElementImage.addEventListener("click", () => 
    showImage(card)
  );

  

  // По клику вызов функции лайка
  cardsForLike.addEventListener("click", likeCard);

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCardFunction(del) {
  del.remove();
}

// Функция лайка
export function likeCardFunction(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.add("card__like-button_is-active");
  }
}

// Функция для показа попапа с изображением
export function showImageFunction(image) {
  popupImage.querySelector(".popup__image").src = image.link;
  popupImage.querySelector(".popup__caption").textContent = image.name;
  openPopup(popupImage);
  closeButtonImage.addEventListener("click", () => closePopup(popupImage));
}
