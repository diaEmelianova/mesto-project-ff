
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-1",
  headers: {
    authorization: "9cbb1215-3345-4775-9e5f-b3ff45cfa047",
    "Content-Type": "application/json",
  },
};

// загрузка информации о пользователе с сервера

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//загрузка карточек с сервера

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const changeProfile = (profileForm) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me", {
    method: "PATCH",
    headers: {
      authorization: "9cbb1215-3345-4775-9e5f-b3ff45cfa047",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileForm.name,
      about: profileForm.about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//добавление новой карточки

export const getNewCard = (newCard) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/cards", {
    method: "POST",
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
    headers: {
      authorization: "9cbb1215-3345-4775-9e5f-b3ff45cfa047",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//удаление карточки
export const deleteCard = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "9cbb1215-3345-4775-9e5f-b3ff45cfa047",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//постановка лайка
export const setLike = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: "9cbb1215-3345-4775-9e5f-b3ff45cfa047",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//удаление лайка

export const unsetLike = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "9cbb1215-3345-4775-9e5f-b3ff45cfa047",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//обновление аватара пользователя
export const changeAvatar = (link) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "9cbb1215-3345-4775-9e5f-b3ff45cfa047",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
