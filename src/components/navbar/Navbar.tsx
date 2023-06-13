import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Close, Menu, Person } from "@mui/icons-material";
import Modal from "react-modal";
import { customStyles } from "../../CustomStyles";
import LoginModal from "../LoginModal/LoginModal";
import useAuthStore from "../../zustand/AuthStore";
import { UserInterface } from "../../types/Types";
import { useQuery } from "react-query";

Modal.setAppElement("#root");

const Navbar = ({ user }: any) => {
  const clearUser = useAuthStore((state) => state.clearUser);

  const { data } = useQuery<UserInterface>({
    queryKey: ["navbar"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`).then(
        (res) => res.json()
      ),
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <img className="navbar-logo" src={logo} alt="logo" />
        </Link>
        <section className="navbar-responsive-profile-burger">
          <div className={isOpen ? "nav-menu open" : "nav-menu"}>
            <Link className="nav-item" to="/" onClick={() => setIsOpen(false)}>
              <span>HOME</span>
            </Link>
            <Link
              className="nav-item"
              to="/aboutus"
              onClick={() => setIsOpen(false)}
            >
              <span>ABOUT US</span>
            </Link>
            <Link
              className="nav-item"
              to="/dashboard"
              onClick={() => setIsOpen(false)}
            >
              <span>SERVICES</span>
            </Link>
            <Link
              className="nav-item"
              to="class"
              onClick={() => setIsOpen(false)}
            >
              <span>TEAM</span>
            </Link>
            <Link
              className="nav-item"
              to="class"
              onClick={() => setIsOpen(false)}
            >
              <span>CONTACT US</span>
            </Link>
            {data?.role === "admin" && (
              <Link
                className="nav-item"
                to="/admin"
                onClick={() => setIsOpen(false)}
                style={{ textDecoration: "none" }}
              >
                <span>ADMIN</span>
              </Link>
            )}
          </div>

          <div className="menu-icon" onClick={toggleNavbar}>
            {isOpen ? <Close /> : <Menu />}
          </div>
        </section>
        {user ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Person /> {user}
            </div>
            <button className="navbar-btn" onClick={clearUser}>
              Logout
            </button>
          </span>
        ) : (
          <button className="navbar-btn" onClick={toggleNavbar}>
            Login
          </button>
        )}
      </div>
      <Modal isOpen={isOpen} onRequestClose={toggleNavbar} style={customStyles}>
        <LoginModal toggleNavbar={toggleNavbar} />
      </Modal>
    </div>
  );
};

export default Navbar;
