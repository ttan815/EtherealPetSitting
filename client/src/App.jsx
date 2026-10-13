import { Route, Routes } from "react-router";
import CreateAccountPage from "./pages/CreateAccountPage";

const App = () => {
  return <div>
    <Routes>
      <Route path="/CreateAccount" element={<CreateAccountPage />}/>
    </Routes>
  </div>
}

export default App