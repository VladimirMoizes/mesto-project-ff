// Функция, выполняемая при нажатии на кнопку - открывает форму и вешает слушатели событий
export function openPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("click", (evt) => {
    if (evt.target === element) closePopup(element);
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") closePopup(element);
  });
}

// Функция, выполняемая при нажатии на крестик, overlay и escape
export function closePopup(element) {
  element.classList.remove("popup_is-opened");
  if (element.classList.contains("popup_type_new-card")) {
    element.querySelector(".popup__form").reset();
  }
  document.removeEventListener("keydown", (evt) => {
    if (evt.key === "Escape") closePopup(element);
  });
}
