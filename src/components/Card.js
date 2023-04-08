import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;
  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }
  function onCardLike(){
    props.onCardLike(props.card);
  }
  function onCardDelete(){
    props.onCardDelete(props.card);
  }


  return (
    <li className="card">
      <button type="button" onClick={onCardDelete} className={cardDeleteButtonClassName}></button>

      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__picture"
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-wrapper">
          <button type="button" onClick={onCardLike} className={cardLikeButtonClassName}></button>
          <span className="class__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
