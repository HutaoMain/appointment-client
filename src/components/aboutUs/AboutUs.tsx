import ImageSlider from "../ImageSlider/ImageSlider";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="parent">
      <div className="aboutus-container">
        <div className="left">
          <h2>About us</h2>
          <h2>NOTORIOUS DETAILS</h2>
          <p>Iriga city, 4434 Camarines Sur</p>
          <p>
            Notorious Details is a premium car care shop specializing in Ceramic
            Coating,Proper Maintanance,Premium wash and etc.
          </p>
          <h2>Car Detailing</h2>
          <p>
            This website is a proposed information of the clients of this shop
            that aims to give people accses or direct connection to the Car
            Detailing bussiness. You can find here the services offered, about
            the bussiness and the information your needed before booking an
            appointment. You can ask for help by sending a direct message to the
            owner.
          </p>
        </div>
        {/* Render the right div with image slider */}
        <div className="right">
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
