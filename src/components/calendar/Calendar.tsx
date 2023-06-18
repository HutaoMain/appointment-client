import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import TimePicker from "react-time-picker";
import "./Calendar.css";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { customStyles } from "../../CustomStyles";
import { AppointmentInterface } from "../../types/Types";
import { useQuery } from "react-query";

Modal.setAppElement("#root");

const Calendar = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(
    new Date().toLocaleTimeString()
  );
  const [message, setMessage] = useState<string>("");

  const { data } = useQuery<AppointmentInterface[]>("calendar", async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/appointment/list`
    );
    return response.data.map((appointment: any) => ({
      title: appointment.appointmentTime,
      date: appointment.appointmentDate,
    }));
  });

  const handleTimeChange = (time: string | null) => {
    if (time) {
      setSelectedTime(time);
    }
  };

  const toggleModal = (date: any) => {
    setOpen(!open);
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/create`,
        {
          appointmentDate: moment(selectedDate).format("yyyy-MM-DD"),
          appointmentTime: selectedTime,
          inquiryMessage: message,
        }
      );
      toast.success("Successfully file an appointment", {
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

  return (
    <div className="calendar">
      <h2>Book an appointment here</h2>
      <p>
        Click on your desired date for the appointment and submit your inquiry.
      </p>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={(info) => toggleModal(info.date)}
          events={data}
        />
        <Modal isOpen={open} onRequestClose={toggleModal} style={customStyles}>
          <div className="modal-container">
            <h2>Date: {moment(selectedDate).format("yyyy-MM-DD")}</h2>
            <label>
              Time of Appointment: {""}
              <TimePicker
                onChange={handleTimeChange}
                value={selectedTime}
                className="time-picker"
              />
            </label>
            <label>
              Message:
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                onChange={(e) => setMessage(e.target.value)}
                className="text-area"
              ></textarea>
            </label>
            <div className="calendar-btns">
              <button className="calendar-btn submit" onClick={handleSubmit}>
                Submit Appointment
              </button>
              <button className="calendar-btn cancel" onClick={toggleModal}>
                Cancel Appointment
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Calendar;
