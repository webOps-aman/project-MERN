import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import ShowData from "./components/ShowData";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<RegistrationForm/>}/>
          <Route path="/showdata" element={<ShowData/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
