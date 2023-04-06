import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {
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

  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
      
    })
    .catch((error) => console.error(error))
  }, []);
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__content">
        <Header />
        <Main
          handleEditPopupClick={handleEditPopupClick}
          handleAddPopupClick={handleAddPopupClick}
          handleEditAvatarPopupClick={handleEditAvatarPopupClick}
          handleCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <PopupWithForm
        name="section-edit"
        title="Edit Profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        formId="editProfileForm"
      >
        <input
          className="popup__input popup__form-name"
          id="name-input"
          name="name"
          type="text"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="name-input-error" className="popup__input-error"></span>
        <input
          className="popup__input popup__form-subtitle"
          id="job-input"
          name="job"
          type="text"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="job-input-error" className="popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="section-add"
        title="New Place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        formId="createCardForm"
      >
        <input
          className="popup__input popup__form-title"
          id="card-name-input"
          name="name"
          type="text"
          placeholder="Title"
          minLength="1"
          maxLength="30"
          required
        />

        <span id="card-name-input-error" className="popup__input-error"></span>
        <input
          className="popup__input popup__form-link"
          id="card-link-input"
          name="link"
          type="url"
          placeholder="Image link"
          required
        />

        <span id="card-link-input-error" className="popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="edit-avatar"
        title="Edit Avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        formId="editProfileForm"
      >
        <input
          className="popup__input popup__form-name"
          id="name-input"
          name="name"
          type="text"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="name-input-error" className="popup__input-error"></span>
        <input
          className="popup__input popup__form-subtitle"
          id="job-input"
          name="job"
          type="text"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="job-input-error" className="popup__input-error"></span>
      </PopupWithForm>

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
    </CurrentUserContext.Provider>
  );
}

export default App;
