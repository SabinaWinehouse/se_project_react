import ProfilePic from "../images/profile_pic.jpg";
import {api} from "../utils/api.js"
import React from "react";
export default function Main(props) {


  const [userName, setUserName] =
    React.useState("Jacques Cousteau");
    
    const [userDescription, setUserDescription] =
    React.useState("Explorer");

    const [userAvatar, setUserAvatar] =
    React.useState(ProfilePic);
    
    React.useEffect(()=>{
      api.getUserInfo()
      .then((res)=>{
         setUserName(res.name)
         setUserDescription(res.about)
         setUserAvatar(res.avatar)
        });
    }, [])
   
  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img src={userAvatar} alt="profile" className="profile__picture" />
          <button
            className="profile__edit-avatar"
            type="button"
            onClick={props.handleEditAvatarPopupClick}
          ></button>
        </div>
        <div className="profile__name-edit">
          <h1 className="profile__name">{userName}</h1>
          <button
            type="button"
            className="profile__button-edit"
            onClick={props.handleEditPopupClick}
          ></button>
        </div>
        <p className="profile__subtitle">{userDescription}</p>

        <button
          type="button"
          className="profile__button-add"
          id="addButton"
          onClick={props.handleAddPopupClick}
        ></button>
      </section>

      <div className="gallery">
        <ul className="gallery__list"></ul>
      </div>
    </main>
  );
}
