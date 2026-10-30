import { Routes, Route, Outlet } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import SelectDateTimePage from "./pages/SelectDateTimePage";
import PetCareDetailsPage from "./pages/PetCareDetailsPage";
import BookingProvider from "./context/BookingProvider";

const App = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>

        {/* Booking steps share one in-progress booking */}
        <Route path="/book-appointment" element={<BookingProvider><Outlet/></BookingProvider>}>
          <Route index element={<BookAppointmentPage/>}/>
          <Route path="date-time" element={<SelectDateTimePage/>}/>
          <Route path="pet-details" element={<PetCareDetailsPage/>}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
