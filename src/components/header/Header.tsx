import "./Header.css";
import headerPic from "../../assets/header-pic.png";

const Header = () => {
  return (
    <div className="header" id="header">
      <section className="header-left">
        <div className="header-text">
          <h2>
            You can schedule an appointment with us at
            <b> Notorious Details Auto Detailing.</b>
          </h2>
          <span>
            This website is designed to convey important information from Online
            Booking Reservation Notorious Details. The platform wants to develop
            the way information is disseminated.
          </span>
        </div>
      </section>
      <section className="header-right">
        <img className="header-pic" src={headerPic} alt="header-car" />
      </section>
    </div>
  );
};

export default Header;
