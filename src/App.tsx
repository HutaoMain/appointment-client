import "./App.css";
import Navbar from "./components/navbar/Navbar";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Routes, Route } from "react-router-dom";
import AdminComponent from "./components/AdminComponent/AdminComponent";
import useAuthStore from "./zustand/AuthStore";
import HomePage from "./pages/HomePage";
import { useQuery } from "react-query";
import { UserInterface } from "./types/Types";

function App() {
  const user = useAuthStore((state) => state.user);

  const { data } = useQuery<UserInterface>({
    queryKey: ["App"],
    queryFn: async () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`).then(
        (res) => res.json()
      ),
  });

  return (
    <div className="App">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="admin"
          element={data?.role === "admin" && <AdminComponent />}
        />
      </Routes>
    </div>
  );
}

export default App;
