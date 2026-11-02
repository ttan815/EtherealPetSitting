// Defines the application routes and shared page layout.
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import CustomerDashboard  from "./pages/CustomerDashboard";
import ReviewsPage from "./pages/ReviewsPage";
import BookingProvider from "./context/BookingProvider";
import BookingFlow from "./components/booking/BookingFlow";
import PaymentPage from "./pages/PaymentPage";

/**
 * Renders the application's page routes and the shared booking-step provider.
 * @returns {JSX.Element} The application route tree.
 */
const App = () => {
  return (
    <div>
      <BookingProvider>
        <Routes>

          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/create-account" element={<CreateAccount/>}/>
          <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>
          <Route path="/reviews" element={<ReviewsPage/>}/>
          <Route path="/payment/:id" element={<PaymentPage/>}/>
          <Route path="/book-appointment" element={<BookingFlow/>}/>

        </Routes>
      </BookingProvider>
    </div>
  );
}

export default App;
