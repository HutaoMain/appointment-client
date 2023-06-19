import useAuthStore from "../../zustand/AuthStore";
import "./LoginModal.css";
import { LoginInterface } from "../../types/Types";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { customStyles } from "../../CustomStyles";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

Modal.setAppElement("#root");

const LoginModal = ({ toggleNavbar }: any) => {
  const setUser = useAuthStore((state) => state.setUser);

  const [credentials, setCredentials] = useState<LoginInterface>({
    email: "",
    password: "",
  });
  const [regIsOpen, setRegIsOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleRegistrationModal = () => {
    setRegIsOpen(!regIsOpen);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
        credentials
      );

      setUser(credentials.email);
      toggleNavbar();
    } catch (err) {
      console.log(err);
      setErrors("Incorrect email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <hr />
      <p>Welcome to Notorious Details</p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={onChangeHandler}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChangeHandler}
        />
        {errors && (
          <div style={{ padding: "5px 0" }}>
            <span style={{ color: "red" }}>{errors}</span>
          </div>
        )}
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <a href="#" className="forgot-password-link or-text">
          Forgot password?
        </a>
        <p className="or-text">
          No account? Register <a onClick={toggleRegistrationModal}>here</a>
        </p>
      </div>
      <p className="or-text">or</p>
      <GoogleLogin />
      <Modal
        isOpen={regIsOpen}
        onRequestClose={toggleRegistrationModal}
        style={customStyles}
      >
        <RegistrationModal toggleRegistrationModal={toggleRegistrationModal} />
      </Modal>
    </div>
  );
};

export default LoginModal;
