import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useQuery } from "react-query";
import { AppointmentInterface, UserInterface } from "../../types/Types";
import useAuthStore from "../../zustand/AuthStore";
import axios from "axios";
import "./NotificationBadge.css";

function NotificationBadge() {
  const [appointmentList, setAppointmentList] =
    useState<AppointmentInterface[]>();

  const user = useAuthStore((state) => state.user);

  const { data } = useQuery<UserInterface>({
    queryKey: ["NotificationBadge"],
    queryFn: async () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`).then(
        (res) => res.json()
      ),
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/email/${user}`
      );
      setAppointmentList(res.data);
    };
    fetch();
  }, [data]);

  const handleClick = () => {
    {
      data?.role === "user"
        ? (window.location.href = "/user")
        : (window.location.href = "/admin");
    }
  };

  return (
    <div>
      {data?.role === "user" ? (
        <IconButton aria-label="notifications" onClick={handleClick}>
          <Badge
            badgeContent={
              appointmentList?.filter(
                (appointment) =>
                  appointment.userMarkAsRead === false &&
                  appointment.userNotification === true
              ).length || 0
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      ) : (
        <IconButton aria-label="notifications" onClick={handleClick}>
          <Badge
            badgeContent={
              appointmentList?.filter(
                (appointment) => appointment.adminMarkAsRead === false
              ).length || 0
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      )}
    </div>
  );
}

export default NotificationBadge;
