import React from "react";
export default function ImagePopup(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_open" : ""}`}
      id="popup__image-section"
    >
      <div className="popup__content">
        <button
          type="button"
          className="popup__button-close-image popup__close"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
