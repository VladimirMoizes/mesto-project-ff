const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: "6eda4763-2669-4bcd-99f1-7d79fb7b6f08",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => res.json());
};

export const getUserId = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => res.json());
};

export const editProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data)
  }).then((res) => res.json())
};

export const addNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
};
