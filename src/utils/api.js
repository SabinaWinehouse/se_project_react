 class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _handleResponse(response) {
      return response.ok ? response.json() : Promise.reject(response.status);
    }
  
    getUserInfo() {
      return fetch(this._baseUrl + "/users/me", {
        method: "GET",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    getInitialCards() {
      return fetch(this._baseUrl + "/cards", {
        method: "GET",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    editUserInfo({ name, about }) {
      return fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        headers: this._headers,
  
        body: JSON.stringify({
          name,
          about,
        }),
      }).then(this._handleResponse);
    }
    addNewCard(data) {
      return fetch(this._baseUrl + "/cards", {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._handleResponse);
    }
  
    changeLikeStatus(cardId, isLiked) {
      return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: isLiked ? "DELETE" : "PUT",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    deleteCard(cardId) {
      return fetch(this._baseUrl + "/cards/" + cardId, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    changeUserAvatar({ avatar }) {
      return fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar,
        }),
      }).then(this._handleResponse);
    }
  }
  export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
      authorization: "46068ffb-8af0-44b6-a433-8660db192f5d",
      "Content-Type": "application/json",
    },
});
