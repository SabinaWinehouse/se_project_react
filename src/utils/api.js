class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	_handleResponse(response) {
		return response.ok ? response.json() : Promise.reject(response.status);
	}

	_request(url, options) {
		return fetch(url, options).then(this._handleResponse);
	}

	getUserInfo() {
		return this._request(this._baseUrl + "/users/me", {
			method: "GET",
			headers: this._headers,
		})
	}

	getInitialCards() {
		return this._request(this._baseUrl + "/cards", {
			method: "GET",
			headers: this._headers,
		})
	}

	editUserInfo({ name, about }) {
		return this._request(this._baseUrl + "/users/me", {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name,
				about,
			}),
		})
	}

	addNewCard(data) {
		return this._request(this._baseUrl + "/cards", {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify(data),
		})
	}

	changeLikeStatus(cardId, isLiked) {
		return this._request(this._baseUrl + "/cards/likes/" + cardId, {
			method: isLiked ? "DELETE" : "PUT",
			headers: this._headers,
		})
	}

	deleteCard(cardId) {
		return this._request(this._baseUrl + "/cards/" + cardId, {
			method: "DELETE",
			headers: this._headers,
		})
	}

	changeUserAvatar({ avatar }) {
		return this._request(this._baseUrl + "/users/me/avatar", {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar,
			}),
		})
	}
}

const BASE_URL = "https://around.nomoreparties.co/v1/cohort-3-en";
export const BASE_REGISTER_URL = "https://register.nomoreparties.co"

export const api = new Api({
	baseUrl: BASE_URL,
	headers: {
		authorization: "46068ffb-8af0-44b6-a433-8660db192f5d",
		"Content-Type": "application/json",
	},
});
