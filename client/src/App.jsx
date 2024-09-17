
import {
  Outlet,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";

import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { searchItem } from "./redux/features/Slice/SerchSlice";


import { useEffect } from "react";
import { Results } from "./redux/features/Slice/QuantityResultSlice";
import { currentPage } from "./redux/features/Slice/NavigationSlice";













function App() {
const Dispatch= useDispatch()

// Reset navigation when going back
useEffect(() => {

  const handleBackButton = () => {
    window.scrollTo({ top: 1100, behavior: "smooth" });
    Dispatch(Results(15));
    Dispatch(currentPage(1));
    Dispatch(searchItem(""));

};

  window.onpopstate = handleBackButton;

  return () => {
    window.onpopstate = null;
  };
}, [Dispatch]);


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
