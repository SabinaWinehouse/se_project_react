import profilePic from "../images/profile_pic.jpg";
import { api } from "../utils/api.js";
import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    });
}
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img src={currentUser.avatar} alt="profile" className="profile__picture" />
          <button
            className="profile__edit-avatar"
            type="button"
            onClick={props.handleEditAvatarPopupClick}
          ></button>
        </div>
        <div className="profile__name-edit">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__button-edit"
            onClick={props.handleEditPopupClick}
          ></button>
        </div>
        <p className="profile__subtitle">{currentUser.about}</p>

        <button
          type="button"
          className="profile__button-add"
          id="addButton"
          onClick={props.handleAddPopupClick}
        ></button>
      </section>

      <div className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.handleCardClick}
              onCardLike={handleCardLike}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
