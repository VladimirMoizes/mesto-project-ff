// Именованная функция для закрытия по нажатию Esc
const closeByEsc = (evt) => {
  if (evt.key === "Escape")
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
};

// Функция, выполняемая при нажатии на кнопку - открывает форму и вешает слушатели событий
export const openPopup = (element) => {
  element.classList.add("popup_is-opened");
  document.addEventListener("click", (evt) => {
    if (evt.target === element) closePopup(element);
  });
  document.addEventListener("keydown", closeByEsc);
};

// Функция, выполняемая при нажатии на крестик, overlay и escape
export const closePopup = (element) => {
  element.classList.remove("popup_is-opened");
  if (element.classList.contains("popup_type_new-card")) {
    element.querySelector(".popup__form").reset();
  }
  document.removeEventListener("keydown", closeByEsc);
};
