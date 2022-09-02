import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/signupform";
import LogInForm from "./components/loginform";
import Home from "./components/home";
import Account from "./components/account";
import Analytics from "./components/analytics";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/account" element={<Account />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}

export default App;
