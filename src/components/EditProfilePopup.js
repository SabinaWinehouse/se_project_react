import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="section-edit"
      title="Edit Profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      formId="editProfileForm"
    >
      <input
        onChange={handleNameChange}
        value={name || ""}
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
        onChange={handleDescriptionChange}
        value={description || ""}
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
  );
}
