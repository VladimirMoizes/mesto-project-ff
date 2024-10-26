// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      deleteCard(evt.target.closest(".places__item"));
    });
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCardFunction(del) {
  del.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  document
    .querySelector(".places__list")
    .append(createCard(item, deleteCardFunction));
});
