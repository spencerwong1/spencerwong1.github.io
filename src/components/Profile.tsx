import '../css/profile.css';
import brilliant  from '../assets/brilliant.png'
import pfp        from '../assets/character.png'

export default function Profile() {
  return (
    <div className="profile-box">
      <div className="brilliant-box">
        <h1 className="brilliant-text title-text"> Brilliant Move! <img className="brilliant-img" src={brilliant}/> </h1>
      </div>

      <div className="profile-card">
        <div className="title-box">
          <h1 className="title-text white"> Profile Card </h1>
        </div>
        <div className="img-box">
          <img
            src={pfp}
            className="profile-img"
          />
        </div>
        <div className="info">
          <div className="text-box text">
            <span> Name: </span>
            <span> Spencer Wong </span>
          </div>
          <div className="text-box text">
            <span> University: </span>
            <span> UNSW </span>
          </div>
          <div className="text-box text">
            <span> Degree: </span>
            <span> Computer Science  &amp; Commerce </span>
          </div>
          <div className="text-box text">
            <span> Favourite Opening: </span>
            <span> Ruy Lopez </span>
          </div>
        </div>
      </div>
    </div>
  );
}
