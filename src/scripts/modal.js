// Именованная функция для закрытия по нажатию Esc
const closeByEsc = (evt) => {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
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
  document.removeEventListener("keydown", closeByEsc);
};
