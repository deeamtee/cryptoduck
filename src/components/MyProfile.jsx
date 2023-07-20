import NavBar from './NavBar';
import './styles/MyProfile.css';

function MyProfile ({ userData = {} }) {
  const { username, email} = userData;
  return (
    <>
      <NavBar />
      <div className="my-profile">
        <div className="my-profile__container">
          <div className="my-profile__header">
            <p>Мой профиль</p>
            <hr className="my-profile__rule"/>
          </div>
          <div className="my-profile__info">
            <div className="my-profile__user">
              <p className="my-profile__key">Логин:</p>
              <p className="my-profile__value">{username}</p>
            </div>
            <div className="my-profile__user">
              <p className="my-profile__key">Email:</p>
              <p className="my-profile__value">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile;
