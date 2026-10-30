import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import SelectDateTimePage from "./pages/SelectDateTimePage";

const App = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/book-appointment" element={<BookAppointmentPage/>}/>
        <Route path="/book-appointment/date-time" element={<SelectDateTimePage/>}/>

      </Routes>
    </div>
  );
}

export default App;
