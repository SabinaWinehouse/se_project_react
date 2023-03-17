export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <li className="card" >
      <button type="button" className="card__delete-button"></button>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__picture"
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-wrapper">
          <button type="button" className="card__like-button"></button>
          <span className="class__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
