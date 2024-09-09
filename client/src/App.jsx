
import {
  Outlet,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
// import 'react-toastify/dist/ReactToastify.css';


import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { searchItem } from "./redux/features/Slice/SerchSlice";





function App() {
const Dispatch= useDispatch()
  return (  
  
  <div onClick={()=>Dispatch(searchItem(''))} className="App position-relative"> 
    <Header/>

    <div style={{minHeight:'calc(100vh - 8rem)',paddingTop:'5rem'}} className="  h-100 ">
      <Outlet/>
    </div>

  <Footer/>

  </div>
  );
}

export default App;
