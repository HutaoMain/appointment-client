import "./Service.css";
import {
  LocalCarWash,
  Layers,
  CleaningServices,
  Coronavirus,
} from "@mui/icons-material";

const Service = () => {
  return (
    <div className="services" id="services">
      <h2>Our Services</h2>
      <p>Choose our services for the best car care experience.</p>
      <div className="services-grid">
        <div className="service">
          <LocalCarWash />
          <h3>Premium Car Wash</h3>
          <p>
            Get your car looking like new with our premium car wash service.
          </p>
        </div>
        <div className="service">
          <Layers />
          <h3>Ceramic Coating</h3>
          <p>Protect your car's paint with our ceramic coating service.</p>
        </div>
        <div className="service">
          <CleaningServices />
          <h3>Premium Auto Detailing</h3>
          <p>
            Get your car looking and feeling like new with our premium auto
            detailing service.
          </p>
        </div>
        <div className="service">
          <Coronavirus />
          <h3>Car Disinfection</h3>
          <p>Keep your car germ-free with our car disinfection service.</p>
        </div>
      </div>
    </div>
  );
};

export default Service;
