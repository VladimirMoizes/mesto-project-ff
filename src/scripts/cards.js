// Массив карточек
// export const initialCards = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ];

// Клонируем шаблон для карточки
export const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  card,
  deleteCard,
  likeCard,
  showImage,
  deleteCardFetch
) {
  const cardsForLike = document.querySelector(".places__list");

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const countLikes = cardElement.querySelector(".card__like-text");
  // console.log(cardElement);

  cardElementImage.src = card.link; // Добавлен src для изображения
  cardElementImage.alt = card.name; // Добавлен alt для изображения
  cardElementTitle.textContent = card.name; // Добавлена подписть для изображения

  if (card.owner._id !== "1da0c5b8f0455ce337c799da") {
    cardDeleteButton.remove();
  }

  if (card.likes.some((like) => like._id === "1da0c5b8f0455ce337c799da")) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  countLikes.textContent = card.likes.length;

  // слушатель для кнопки удаления выполняет функцию удаления
  cardDeleteButton.addEventListener("click", function (evt) {
    deleteCard(evt.target.closest(".places__item"));
    deleteCardFetch(card);
  });

  // При нажатии на картинку выполняется функция открытия картинки на весь экран
  cardElementImage.addEventListener("click", () => showImage(card));

  // Слушатель для лайка
  cardLikeButton.addEventListener("click", () => {
    likeCard(card, cardLikeButton, countLikes);
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCardFunction(evt) {
  evt.remove();
}

// Функция лайка карточки
// export function likeCardFunction(evt) {
//   if (evt.target.classList.contains("card__like-button")) {
//     evt.target.classList.toggle("card__like-button_is-active");
//   }
// }
