// import "./App.css";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import MatchingPage from "./pages/MatchingPage";
import MerryList from "./pages/MerryList";
import OwnerProfile from "./pages/OwnerProfile";
import Registerpage from "./pages/Registerpage";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/login" element={<Loginpage />}/>
      <Route path="/register" element={<Registerpage />}/>
      <Route path="/matching" element={<MatchingPage />}/>
      <Route path="/merrylist" element={<MerryList />}/>
      <Route path="/owner" element={<OwnerProfile />}/>
    </Routes>
   </Router>
  );
}

export default App;
