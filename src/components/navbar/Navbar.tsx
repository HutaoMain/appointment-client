import { Close, Menu, Person } from "@mui/icons-material";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
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

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);
  const CloseMenu = () => setIsOpen(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <div>
      <div
        className={isOpen ? "main-container" : ""}
        onClick={() => CloseMenu()}
      />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <img className="navbar-logo" src={logo} alt="logo" />
          </Link>
          <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <a
                href="#"
                style={{ textDecoration: "none", color: "black" }}
                onClick={() => (isOpen ? handleClick : null)}
              >
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="#aboutus"
                onClick={() => (isOpen ? handleClick : null)}
              >
                ABOUT US
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="#services"
                onClick={() => (isOpen ? handleClick : null)}
              >
                SERVICE
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="#team"
                onClick={() => (isOpen ? handleClick : null)}
              >
                TEAM
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="#calendar"
                onClick={() => (isOpen ? handleClick : null)}
              >
                CONTACT US
              </a>
            </li>
            {data?.role === "admin" && (
              <li className="nav-item">
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/admin"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? "" : "active")
                  }
                  onClick={() => (isOpen ? handleClick : null)}
                >
                  ADMIN
                </NavLink>
              </li>
            )}
            {data?.role === "user" && (
              <li className="nav-item">
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/user"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? "" : "active")
                  }
                  onClick={() => (isOpen ? handleClick : null)}
                >
                  USER
                </NavLink>
              </li>
            )}
            {user ? (
              <li className="nav-item">
                <span className="username-logout-btn-container">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "black",
                    }}
                  >
                    <Person /> {user}
                  </div>
                  <button className="navbar-btn" onClick={clearUser}>
                    Logout
                  </button>
                </span>
              </li>
            ) : (
              <button className="navbar-btn" onClick={toggleLoginModal}>
                Login
              </button>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={isOpen ? "close" : "menu"}>
              {isOpen ? (
                <Close sx={{ fontSize: "30px" }} />
              ) : (
                <Menu sx={{ fontSize: "30px" }} />
              )}
            </i>
          </div>
        </div>
      </nav>
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={toggleLoginModal}
        style={customStyles}
      >
        <LoginModal toggleNavbar={toggleLoginModal} />
      </Modal>
    </div>
  );
};

export default Navbar;
