export default function PopupWithForm(props) {
  
  return (
    <div className={`popup ${props.isOpen ? 'popup_open' : ''}`} id={`popup__${props.name}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          id="editPopupSectionCloseButton"
          onClick={props.onClose}
        ></button>

        <fieldset className="popup__fieldset">
          <h3 className="popup__profile">{props.title}</h3>
          {props.children}
          <button
            className="popup__button popup__edit-profile"
            name="edit_profile_button"
            type="submit"
          >
            Save
          </button>
        </fieldset>
      </div>
    </div>
  );
}
