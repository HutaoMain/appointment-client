import AboutUs from "../components/aboutUs/AboutUs";
import Calendar from "../components/calendar/Calendar";
import Header from "../components/header/Header";

const HomePage = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <AboutUs />
      <Calendar />
    </div>
  );
};

export default HomePage;
