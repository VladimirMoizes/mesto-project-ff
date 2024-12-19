// Конфиг с базовым url и заголовками
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: "6eda4763-2669-4bcd-99f1-7d79fb7b6f08",
    "Content-Type": "application/json",
  },
};

// Функция проверки статуса ответа от сервера
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение массива карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(getResponse);
};

// Получение данных пользователя с сервера
export const getUserId = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(getResponse);
};

// Редактирование на сервере данных пользователя
export const editProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(getResponse);
};

// Смена аватара на сервере
export const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatar),
  }).then(getResponse);
};

// Добавление на сервер новой карточки
export const addNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(getResponse);
};

// Удаление с сервера карточки
export const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify(card),
  }).then(getResponse);
};

// Постановка лайка
export const addLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(card),
  }).then(getResponse);
};

// Снятие лайка
export const deleteCardLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify(card),
  }).then(getResponse);
};
