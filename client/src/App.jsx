import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import CustomerDashboard from "./pages/CustomerDashboard";

const App = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>

      </Routes>
    </div>
  );
}

export default App;
