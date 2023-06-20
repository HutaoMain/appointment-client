import "./Team.css";
import { Facebook } from "@mui/icons-material";
import Logo from "../../assets/logo.png";
import Owner from "../../assets/ja.jpg";

const Team = () => {
  return (
    <div className="team" id="team">
      <h2>Our Team</h2>
      <p>
        In completing this project we conducted several interviews to obtain the
        necessary data.
      </p>
      <div className="team-grid">
        <div className="owner">
          <img src={Owner} alt="Owner" />
          <h3>JOHN ALVIN AVELINO</h3>
          <p style={{ color: "gray" }}>BUSSINESS OWNER</p>
          <p>There's nothing wrong for staying small.</p>
          <div className="socials">
            <a
              href="https://www.facebook.com/profile.php?id=100055708482771"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Facebook />
            </a>
          </div>
        </div>
        <div className="company">
          <img src={Logo} alt="Company Logo" />
          <h3>NOTORIOUS DETAILS</h3>
          <p style={{ color: "gray" }}>BUSSINESS</p>
          <p>It will be our pleasure to assist you of all you need.</p>
          <div className="socials">
            <a
              href="https://www.facebook.com/notoriousgarageph"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Facebook />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
