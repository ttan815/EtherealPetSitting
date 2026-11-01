import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import EditPet from "./pages/EditPet";

const App = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<EditPet/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>

      </Routes>
    </div>
  );
}

export default App;
