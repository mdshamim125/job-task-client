import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from './pages/Footer';

function App() {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
