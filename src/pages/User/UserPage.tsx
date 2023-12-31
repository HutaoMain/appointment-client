import "./UserPage.css";
import { useQuery } from "react-query";
import useAuthStore from "../../zustand/AuthStore";
import { AppointmentInterface } from "../../types/Types";
import { useState } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

const UserPage = () => {
  const user = useAuthStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const currentDate = moment().format("YYYY-MM-DD");

  const { data } = useQuery<AppointmentInterface[]>({
    queryKey: ["UserPage"],
    queryFn: async () =>
      fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/email/${user}`
      ).then((res) => res.json()),
  });

  const filteredAppointments = data?.filter((item) =>
    item.appointmentDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting appointments by appointmentDate
  const sortedAppointments = filteredAppointments?.sort((a, b) =>
    a.appointmentDate.localeCompare(b.appointmentDate)
  );

  const handleCancelAppointment = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/delete/${id}`
      );
      toast.success("Successfully cancelled your appointment", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/update/${id}`,
        {
          userMarkAsRead: true,
        }
      );
      toast.success("Successfully cancelled your appointment", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // Update UI or display a success message
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-page">
      <div className="search-container">
        <input
          type="text"
          placeholder={`Search by date (e.g. ${currentDate})...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {sortedAppointments?.map((item, key) => (
        <div className="rectangle" key={key}>
          <div className="rectangle-header">
            <h3>Appointment Details</h3>
          </div>
          <div className="rectangle-content">
            <div className="rectangle-item">
              <span className="rectangle-label">Date:</span>
              <span className="rectangle-value">{item.appointmentDate}</span>
            </div>
            <div className="rectangle-item">
              <span className="rectangle-label">Time:</span>
              <span className="rectangle-value">{item.appointmentTime}</span>
            </div>
            <div className="rectangle-item">
              <span className="rectangle-label">Message:</span>
              <span className="rectangle-value">{item.inquiryMessage}</span>
            </div>
            <div className="rectangle-item">
              <span className="rectangle-label">Status:</span>
              <span className="rectangle-value">{item.status}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <button
              className="cancel-appointment-btn"
              onClick={() => handleCancelAppointment(item._id)}
            >
              Cancel Appointment
            </button>
            {item.userMarkAsRead === false && item.userNotification === true ? (
              <button
                className="cancel-appointment-btn"
                onClick={() => handleMarkAsRead(item._id)}
              >
                Mark as read
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
