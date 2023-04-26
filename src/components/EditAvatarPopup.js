import React from "react";
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup(props) {
  const inputAvatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });

  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit-avatar"
      title="Edit Avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      formId="editProfileForm"
    >
      <input
        ref={inputAvatarRef}
        className="popup__input popup__form-name"
        id="avatar-link-input"
        name="avatar"
        type="text"
        placeholder="Link"
        required
      />
      <span id="avatar-link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
