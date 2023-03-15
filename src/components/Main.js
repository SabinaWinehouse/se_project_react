import ProfilePic from "../images/profile_pic.jpg";
export default function Main() {

  function handleEditAvatarClick(){

  }
  function handleEditProfileClick(){

  }
  function handleAddPlaceClick(){

  }

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img src={ProfilePic} alt="profile" className="profile__picture" />
          <button className="profile__edit-avatar" type="button"></button>
        </div>
        <div className="profile__name-edit">
          <h1 className="profile__name">Jacques Cousteau</h1>
          <button type="button" className="profile__button-edit"></button>
        </div>
        <p className="profile__subtitle">Explorer</p>

        <button
          type="button"
          className="profile__button-add"
          id="addButton"
        ></button>
      </section>

      <div className="gallery">
        <ul className="gallery__list"></ul>
      </div>
    </main>
  );
}
