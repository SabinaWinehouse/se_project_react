import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import { getToken, removeToken, setToken } from "../utils/token";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getContent } from "../utils/auth";

function App() {
	const history = useHistory();
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [selectedCard, setSelectedCard] = useState({
		name: "",
		link: "",
	});

	const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		useState(false);

	const [isAddPlacePopupOpen, seIsAddPlacePopupOpen] = useState(false);

	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		useState(false);

	const [infoTooltip, setInfoTooltip] =
		useState({ image: '', isOpen: false, text: '' })

	const [loggedIn, setLoggedIn] = useState(false);
	const [userEmail, setUserEmail] = useState('');

	function handleEditPopupClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPopupClick() {
		seIsAddPlacePopupOpen(true);
	}

	function handleEditAvatarPopupClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleCardClick(card) {
		setSelectedCard({ name: card.name, link: card.link });
		setIsCardPopupOpen(true);
	}

	function closeAllPopups() {
		setSelectedCard({ name: "", link: "" });
		setIsEditProfilePopupOpen(false);
		seIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsCardPopupOpen(false);
		setInfoTooltip({ image: '', isOpen: false, text: '' })
	}

	function handleUpdateUser({ name, about }) {
		api
			.editUserInfo({ name, about })
			.then(() => setCurrentUser({ ...currentUser, name, about }))
			.catch((error) => console.error(error));
	}

	function handleUpdateAvatar({ avatar }) {
		api
			.changeUserAvatar({ avatar })
			.then((res) => setCurrentUser(res))
			.catch((error) => console.error(error));
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((user) => user._id === currentUser._id);

		api.changeLikeStatus(card._id, isLiked).then((newCard) => {
			setCards((state) =>
				state.map((currentCard) =>
					currentCard._id === card._id ? newCard : currentCard
				)
			)
		}).catch((error) => console.error(error));
		;
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id).then(() => {
			setCards((state) =>
				state.filter((currentCard) => currentCard._id !== card._id)
			)
		}).catch((error) => console.error(error));
	}

	function handleAddPlaceSubmit(newCard) {
		api
			.addNewCard(newCard)
			.then((res) => {
				setCards([res, ...cards]);
			})
			.catch((error) => console.error(error));
	}

	const handleLogin = (email, password) => {
		auth.login(email, password)
			.then(data => {
				if (data.token) {
					setToken(data.token);
					setLoggedIn(true);
					history.push('/')
				}
			}).catch(err => {
			if (err.status === 401) {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'The user with the specified email not found'
				})
			} else if (err.status === 400) {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'One of the fields was filled in incorrectly'
				})
			} else {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'Oops, something went wrong! Please try again.'
				})
			}
		})
	}

	const handleRegister = (email, password) => {
		auth.register(email, password)
			.then(data => {
				if (data.data) {
					setInfoTooltip({
						image: 'success',
						isOpen: true,
						text: 'Success! You have now been registered.'
					})
					history.push('/login');
				}
			}).catch(err => {
			if (err.status === 400) {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'One of the fields was filled in incorrectly'
				})
			} else {
				setInfoTooltip({
					image: 'fail',
					isOpen: true,
					text: 'Oops, something went wrong! Please try again.'
				})
			}
		})
	}

	const checkToken = () => {
		if (getToken()) {
			auth.getContent(getToken())
				.then(res => {
					if (res.data) {
						setLoggedIn(true);
						setUserEmail(res.data.email);
						history.push('/');
					} else {
						handleLogout();
					}
				})
		}
	}

	const handleLogout = () => {
		removeToken();
		setLoggedIn(false);
		setCurrentUser({});
		setUserEmail('');
	}

	useEffect(() => {
		checkToken();
	}, [])

	useEffect(() => {
		if (loggedIn) {
			api
				.getUserInfo()
				.then((res) => {
					setCurrentUser(res);
				})
				.catch((error) => console.error(error));
		}
	}, [loggedIn]);

	useEffect(() => {
		if (loggedIn) {
			api
				.getInitialCards()
				.then((res) => {
					setCards(res);
				})
				.catch((error) => console.error(error));
		}
	}, [loggedIn]);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<div className="page__content">
					<Header userEmail={userEmail} onLogout={handleLogout} loggedIn={loggedIn}/>
					<ProtectedRoute exact path='/' loggedIn={loggedIn}>
						<Main
							cards={cards}
							handleCardLike={handleCardLike}
							handleCardDelete={handleCardDelete}
							handleEditPopupClick={handleEditPopupClick}
							handleAddPopupClick={handleAddPopupClick}
							handleEditAvatarPopupClick={handleEditAvatarPopupClick}
							handleCardClick={handleCardClick}
						/>
					</ProtectedRoute>
					<Route path="/login">
						<Login handleLogin={handleLogin}/>
					</Route>
					<Route path="/signup">
						<Register handleRegister={handleRegister}/>
					</Route>
					<Footer/>
				</div>

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<AddPlacePopup
					onAddPlaceSubmit={handleAddPlaceSubmit}
					onClose={closeAllPopups}
					isOpen={isAddPlacePopupOpen}
				/>

				<EditAvatarPopup
					onUpdateAvatar={handleUpdateAvatar}
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
				/>

				<div className="popup" id="popup__delete-card">
					<div className="popup__container">
						<button
							type="button"
							className="popup__close"
							id="deleteCardPopupCloseButton"
						></button>

						<fieldset className="popup__fieldset">
							<h3 className="popup__place">Are you sure?</h3>
							<form
								name="popup_place"
								className="popup__form"
								id="deleteCardForm"
							>
								<button
									className="popup__button popup__create-card"
									name="create_a_card_button"
									type="submit"
								>
									Yes
								</button>
							</form>
						</fieldset>
					</div>
				</div>

				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
					isOpen={isCardPopupOpen}
				/>
			</div>
			<InfoTooltip
				image={infoTooltip.image}
				isOpen={infoTooltip.isOpen}
				onClose={closeAllPopups}
				text={infoTooltip.text}
			/>
		</CurrentUserContext.Provider>
	);
}

export default App;

//1.auth.js написать fetch for URL /signup, /signin (доп инфа в #3,#4)
//2.Сверстать (тупо сверстать) Login, Register, InfoTooltip(разный контентб использование пропсов) 
//3.Получить данные из инпутов форм и записать их в state ()
//4.Написать ProtectedRoute (тренажер)
//5.Отображение верстки, сверить стили (link)
//6.Правильный роутинг 
//7. Submit form (fetch from #1, )