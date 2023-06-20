import { RegistrationInterface } from "../../types/Types";
import { useState } from "react";
import "./RegistrationModal.css";

import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const RegistrationModal = ({ toggleRegistrationModal }: any) => {
  const [registrationInfo, setRegistrationInfo] =
    useState<RegistrationInterface>({
      fullname: "",
      email: "",
      password: "",
    });

  const [error, setError] = useState<string>("");

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setRegistrationInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
        registrationInfo
      );

      toast("Successful Registration!", {
        type: "success",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        toggleRegistrationModal();
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const responseStatus = axiosError.response.status;
          if (responseStatus === 409) {
            setError("Email already exist.");
          } else {
            setError("An error occured.");
          }
        }
      } else {
        setError((err as Error).message);
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Full name"
          name="fullname"
          onChange={onChangeHandler}
        />
      </div>
      <div className="input-container">
        <input
          type="email"
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
      </div>
      {error && (
        <span
          style={{ color: "red", paddingTop: "5px", paddingBottom: "10px" }}
        >
          {error}
        </span>
      )}
      <div className="register-btns">
        <button className="register-button" onClick={handleSubmit}>
          Register
        </button>
        <button
          className="register-button "
          style={{ backgroundColor: "red" }}
          onClick={toggleRegistrationModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RegistrationModal;
