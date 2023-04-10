// import "./App.css";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/login" element={<Loginpage />}/>
      <Route path="/register" element={<Registerpage />}/>
    </Routes>
   </Router>
  );
}

export default App;
