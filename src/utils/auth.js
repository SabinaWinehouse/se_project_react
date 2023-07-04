import { BASE_REGISTER_URL } from "./api";

export const register = (email, password) => {
	return fetch(`${BASE_REGISTER_URL}/signup`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})
		.then(res => res.ok ? res.json() : Promise.reject(res))
		.catch(e => console.error(e))
}

export const login = (email, password) => {
	return fetch(`${BASE_REGISTER_URL}/signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})
		.then(res => res.ok ? res.json() : Promise.reject(res))
		.catch(e => console.error(e))
}

export const getContent = token => {
	return fetch(`${BASE_REGISTER_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	})
		.then(res => res.json())
		.catch(e => console.error(e))
}
