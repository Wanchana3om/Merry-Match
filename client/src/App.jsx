// import "./App.css";
import Homepage from "./pages/Homepage";
import Navigationbar from "./components/Navigationbar";
import Footer from "./components/Footer";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import DraggableList from "./components/DraggableItem";

function App() {
  return (
    <>
      <Registerpage />
      <DraggableList />
      {/* <Navigationbar />
      <Homepage />
      <Footer /> */}
    </>
  );
}

export default App;
