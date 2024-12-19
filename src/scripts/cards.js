// Клонируем шаблон для карточки
export const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(card, deleteCard, likeCard, showImage, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const countLikes = cardElement.querySelector(".card__like-text");

  cardElementImage.src = card.link; // Добавлен src для изображения
  cardElementImage.alt = card.name; // Добавлен alt для изображения
  cardElementTitle.textContent = card.name; // Добавлена подписть для изображения

  if (card.owner._id !== userId) {
    cardDeleteButton.remove();
  }

  if (card.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  countLikes.textContent = card.likes.length;

  // слушатель для кнопки удаления выполняет функцию удаления
  cardDeleteButton.addEventListener("click", () => {
    deleteCard(card, cardDeleteButton);
  });

  // При нажатии на картинку выполняется функция открытия картинки на весь экран
  cardElementImage.addEventListener("click", () => showImage(card));

  // Слушатель для лайка
  cardLikeButton.addEventListener("click", () => {
    likeCard(card, cardLikeButton, countLikes);
  });

  return cardElement;
}
