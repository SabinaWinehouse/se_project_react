import React from "react";
export default function InfoTooltip(props) {
  return (
    <div class="info-popup">
      <div class="info-popup__container">
        <button type="button" class="info-popup__button-close"></button>
        <figure class="info-popup__figure">
          <img
            class="info-popup__image"
            src="../infoTooltip/images/X_icon.png"
            alt="#"
          />
          <figcaption class="info-popup__caption">
            Oops, something went wrong! Please try again.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
