export default function ImagePopup() {
  return (
    <div className="popup" id="popup__image-section">
      <div className="popup__content">
        <button
          type="button"
          className="popup__button-close-image popup__close"
        ></button>
        <figure className="popup__figure">
          <img className="popup__image" src="#" alt="#" />
          <figcaption className="popup__caption"></figcaption>
        </figure>
      </div>
    </div>
  );
}
