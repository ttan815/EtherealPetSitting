// Defines the application routes and shared page layout.
import { Routes, Route, Outlet } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import CustomerDashboard  from "./pages/CustomerDashboard";
import ReviewsPage from "./pages/ReviewsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import SelectDateTimePage from "./pages/SelectDateTimePage";
import PetCareDetailsPage from "./pages/PetCareDetailsPage";
import BookingProvider from "./context/BookingProvider";
import ReviewPayDeposit from "./pages/ReviewPayDepositPage"
import BookingConfirmation from "./components/booking/BookingConfirmation";

/**
 * Renders the application's page routes and the shared booking-step provider.
 * @returns {JSX.Element} The application route tree.
 */
const App = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>
        <Route path="/reviews" element={<ReviewsPage/>}/>
        <Route path="/book-appointment" element={<BookAppointmentPage/>}/>

        {/* Booking steps share one in-progress booking */}
        <Route path="/book-appointment" element={<BookingProvider><Outlet/></BookingProvider>}>
          <Route index element={<BookAppointmentPage/>}/>
          <Route path="date-time" element={<SelectDateTimePage/>}/>
          <Route path="pet-details" element={<PetCareDetailsPage/>}/>
          <Route path="review-and-pay" element={<ReviewPayDeposit/>}/>
          <Route path="confirm" element={<BookingConfirmation/>}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
