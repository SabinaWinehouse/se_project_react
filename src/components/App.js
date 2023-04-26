import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, seIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

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
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo({ name, about })
      .then(() => {setCurrentUser({ ...currentUser, name, about })
      closeAllPopups();})
      .catch((error) => console.error(error));
  }
  function handleUpdateAvatar({ avatar }) {
    api.changeUserAvatar({ avatar })
    .then((res) =>
     {setCurrentUser(res)
      closeAllPopups();})
    .catch((error) => console.error(error));
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    });
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch((error) => console.error(error));
  }
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            handleEditPopupClick={handleEditPopupClick}
            handleAddPopupClick={handleAddPopupClick}
            handleEditAvatarPopupClick={handleEditAvatarPopupClick}
            handleCardClick={handleCardClick}
          />
          <Footer />
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
       
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isCardPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
