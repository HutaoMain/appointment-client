import Service from "../../components/ServiceComponent/Service";
import Team from "../../components/TeamComponent/Team";
import AboutUs from "../../components/aboutUs/AboutUs";
import Calendar from "../../components/calendar/Calendar";
import Header from "../../components/header/Header";

const HomePage = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Calendar />
      <Header />
      <AboutUs />
      <Service />
      <Team />

      <div className="mapouter">
        <div className="gmap_canvas">
          <h2>You can find us here</h2>
          <p>Visit us to see personally our service.</p>
          <iframe
            style={{ height: "500px", maxWidth: "1240px", width: "100%" }}
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Notorious Details&t=&z=18&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
      </div>
      <div className="footer">
        <h3>
          Copyright ©2023 Notorious Details Auto Detailing™. All rights
          reserved.
        </h3>
      </div>
    </div>
  );
};

export default HomePage;
