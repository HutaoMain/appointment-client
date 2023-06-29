import "./App.css";
import Navbar from "./components/navbar/Navbar";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/Admin/AdminPage";
import useAuthStore from "./zustand/AuthStore";
import HomePage from "./pages/Home/HomePage";
import { useQuery } from "react-query";
import { UserInterface } from "./types/Types";
import UserPage from "./pages/User/UserPage";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const { data } = useQuery<UserInterface>({
    queryKey: ["App"],
    queryFn: async () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`).then(
        (res) => res.json()
      ),
  });

  useEffect(() => {
    if (user) return;

    if (email) {
      setUser(email);
    }

    console.log(email);
  }, [data]);

  return (
    <div className="App">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="admin" element={data?.role === "admin" && <AdminPage />} />
        <Route path="user" element={data?.role === "user" && <UserPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
