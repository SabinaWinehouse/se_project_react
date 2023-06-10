import React from "react";
import PopupWithForm from "./PopupWithForm";
export default function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }
  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: placeName,
      link: placeLink,
    });
    props.onClose();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="section-add"
      title="New Place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      formId="createCardForm"
    >
      <input
        onChange={handlePlaceNameChange}
        value={placeName}
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
        onChange={handlePlaceLinkChange}
        value={placeLink}
        className="popup__input popup__form-link"
        id="card-link-input"
        name="link"
        type="url"
        placeholder="Image link"
        required
      />

      <span id="card-link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
