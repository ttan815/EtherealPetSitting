import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import CustomerDashboard  from "./pages/CustomerDashboard";
import ReviewsPage from "./pages/ReviewsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";

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

      </Routes>
    </div>
  );
}

export default App;
