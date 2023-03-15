import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, seIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  function handleEditPopupClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPopupClick() {
    seIsAddPlacePopupOpen(true)
  }
  function handleEditAvatarPopupClick() {
    setIsEditAvatarPopupOpen(true)
  }


  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
        <Footer />
      </div>
      <div className="popup" id="popup__section-edit">
        <div className="popup__container">
          <button
            type="button"
            className="popup__close"
            id="editPopupSectionCloseButton"
          ></button>

          <fieldset className="popup__fieldset">
            <h3 className="popup__profile">Edit profile</h3>
            <form
              name="popup_profile"
              className="popup__form"
              id="editProfileForm"
            >
              <input
                className="popup__input popup__form-name"
                id="name-input"
                name="name"
                type="text"
                placeholder="Name"
                minlength="2"
                maxlength="40"
                required
              />
              <span id="name-input-error" className="popup__input-error"></span>
              <input
                className="popup__input popup__form-subtitle"
                id="job-input"
                name="job"
                type="text"
                placeholder="About me"
                minlength="2"
                maxlength="200"
                required
              />
              <span id="job-input-error" className="popup__input-error"></span>
              <button
                className="popup__button popup__edit-profile"
                name="edit_profile_button"
                type="submit"
              >
                Save
              </button>
            </form>
          </fieldset>
        </div>
      </div>

      <div className="popup" id="popup__section-add">
        <div className="popup__container">
          <button
            type="button"
            className="popup__close"
            id="addPopupSectionCloseButton"
          ></button>

          <fieldset className="popup__fieldset">
            <h3 className="popup__place">New place</h3>
            <form
              name="popup_place"
              className="popup__form"
              id="createCardForm"
            >
              <input
                className="popup__input popup__form-title"
                id="card-name-input"
                name="name"
                type="text"
                placeholder="Title"
                minlength="1"
                maxlength="30"
                required
              />

              <span
                id="card-name-input-error"
                className="popup__input-error"
              ></span>
              <input
                className="popup__input popup__form-link"
                id="card-link-input"
                name="link"
                type="url"
                placeholder="Image link"
                required
              />

              <span
                id="card-link-input-error"
                className="popup__input-error"
              ></span>
              <button
                className="popup__button popup__create-card"
                name="create_a_card_button"
                type="submit"
              >
                Create
              </button>
            </form>
          </fieldset>
        </div>
      </div>

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

      <div className="popup" id="popup__edit-avatar">
        <div className="popup__container">
          <button
            type="button"
            className="popup__close"
            id="editAvatarPopupCloseButton"
          ></button>

          <fieldset className="popup__fieldset">
            <h3 className="popup__profile">Edit Avatar</h3>
            <form
              name="popup_profile"
              className="popup__form"
              id="editAvatarForm"
            >
              <input
                className="popup__input popup__form-name"
                id="avatar-link-input"
                name="avatar"
                type="text"
                placeholder="Link"
                required
              />
              <span
                id="avatar-link-input-error"
                className="popup__input-error"
              ></span>
              <button
                className="popup__button popup__edit-avatar-button"
                name="edit_profile_button"
                type="submit"
              >
                Save
              </button>
            </form>
          </fieldset>
        </div>
      </div>

      <ImagePopup />
    </div>
  );
}

export default App;
