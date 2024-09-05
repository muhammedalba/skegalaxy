
import  { useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchItem } from "../../redux/features/Slice/SerchSlice";
import Cookies from "universal-cookie";
import "./header.css";

// img
import logo from "../../imges/logo1..webp";
import avatar from "../../imges/avatar.webp";
// icons
import { CiSearch } from "react-icons/ci";
import { IoChevronUpOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Fade } from "react-awesome-reveal";
import { BsWhatsapp } from "react-icons/bs";
import { Results } from "../../redux/features/Slice/QuantityResultSlice";
import { currentPage } from "../../redux/features/Slice/NavigationSlice";
import { CiHeart } from "react-icons/ci";
import { useAutapiMutation } from "../../redux/features/api/users/AuthSlice";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineWifiProtectedSetup } from "react-icons/md";
import { FaUsersRectangle } from "react-icons/fa6";




const Header = () => {
  const [Autapi, { isSuccess }] =  useAutapiMutation();



  const cookies = useMemo(() => new Cookies(), []);
  
  const imgeUrl = cookies.get("imageUrl");
  const image = cookies.get("image");
  const role = cookies.get("role");

  const cartitims = useSelector((state) => state.cart);
  // console.log(cartitims);
  
  const [scroll, setscroll] = useState(false);
  const [trans, settrans] = useState(false);
 
  const dispatch = useDispatch();

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    if (scrollY > 60 && scrollY < 301) {
      settrans(true);
    } else {
      settrans(false);
    }

    if (scrollY > 130) {
      setscroll(true);
    } else {
      setscroll(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // handel serche
  const handelserche = (e) => {

    // console.log(e.target.value);
    dispatch(currentPage(1));
    dispatch(searchItem(e.target.value));

      
  };

  const Scrolto = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() =>{

    if(isSuccess) { 
      
      cookies.remove();
       cookies.remove("firstname");
       cookies.remove("image");
       cookies.remove("imageUrl");
       cookies.remove("role");
       cookies.remove("token");
       cookies.remove("refreshToken");
       window.location.pathname='/'
     
     }
  },[cookies, isSuccess])
  // handel Logout
  const Logout = () => {
  
    Autapi({
      url:'logout',
     body:{},
      method: "post",
    });
    cookies.remove();
    cookies.remove("firstname");
    cookies.remove("image");
    cookies.remove("imageUrl");
    cookies.remove("role");
    cookies.remove("token");
    cookies.remove("refreshToken");
    
 
  };
 // reset navigation to 10 items per page and update navigation property

 const resetNavegation = () => {
  dispatch(Results(15));
  dispatch(currentPage(1));
  dispatch(searchItem(''));
};
  // Auth links
  const AuthLinks = [
    {
      title: " حسابي الشخصي",
      path: "/ProfileAccount",
      icon: <IoMdHome fontSize={"1.2rem"} color="var(--text-color)" />,
    },
    {
      title: "انشاء حساب",
      path: "/signup",
      icon: <FaRegUser fontSize={"1rem"} color="var(--text-color)" />,
    },
    {
      title: "تسجيل دخول",
      path: "/login",
      icon: <CiLogin fontSize={"1.7rem"} color="var(--text-color)" />,
    },
    {
      title: "تسجيل خروج",
      path: "/",
      icon: <CiLogin fontSize={"1.7rem"} color="var(--text-color)" />,
    },
  ];
  // Auth links show
  const AuthLinksShow = AuthLinks.map((link, index) => {
    return (
      <li key={index}>
        <Link
          to={`${link.path}`}
          className={role && link.path === "/login"|| role&&link.path === "/signup"||!role&&link.path === "/ProfileAccount"||!role&&link.path === "/"?"d-none ":'dropdown-item d-flex align-items-center gap-2'}
          onClick={link.path === "/" && Logout}
        >
          {link.icon}
          {link.title}
        </Link>
      </li>
    );
  });

  // Nav links
  const nav_Links = [
    {
      title: " من نحن",
      path: "/About",
      icon: <FaUsersRectangle  fontSize={"1.7rem"} color="var( --text-color)" />,
    }, {
      title: " طلباتي",
      path: "/orders",
      icon: <MdOutlineWifiProtectedSetup fontSize={"1.7rem"} color="var( --text-color)" />,
    },
    {
      title: " المفضلة",
      path: "/Favorite",
      icon: <CiHeart fontSize={"1.7rem"} color="var( --text-color)" />,
    },
    {
      title: "سلة مشترياتي",
      path: "/Cart",
      icon: <BsCart2 fontSize={"1.7rem"} color="var( --text-color)" />,
    },
    {
      title: "الصفحة الرئيسية",
      path: "/",
      icon: <IoStorefrontOutline fontSize={"1.7rem"} color="var( --text-color)" />,
    },
   
    {
      title: "لوحه التحكم",
      path: "/dashboard",
      icon: (
        <AiOutlineDashboard fontSize={"1.7rem"} color="var( --text-color)" />
      ),
    },
  ];

  // get property 
  // const bgColor = document.styleSheets[0].cssRules[0].style.getPropertyValue("--bg-color");


  // navLink show
  const nav_link_show = nav_Links.map((link, index) => {
    return (
      <li
      onClick={resetNavegation}
        key={index}
        className={
          (link.path === "/dashboard" && role === "user") ||
          (link.path === "/orders" && !role ) ||
          (role === undefined && link.path === "/dashboard")
            ? "d-none"
            : "nav-item d-flex align-items-center  "
        }
      >
        <NavLink
          to={link.path}
          className="nav-link p-2 d-flex  align-items-center "
        >
          <span className="px-1 d-none d-lg-block">{link.title}</span>
          
          {<span className=" position-relative">
             {link.icon}
            {link.path === '/Cart' && 
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger ">
               {cartitims> 0 && cartitims}
        
            </span>}
             
          </span>}
        </NavLink>
      </li>
    );
  });

  //

  return (
    <>
      <header
        dir="ltr"
        style={{
          transform: trans ? "translateY(-150%)" : "translateY(0)",
        }}
        className=" w-100  fw-semibold"
      >
        <nav
          style={{
            boxShadow: " rgba(17, 17, 26, 0.1) 0px 1px 0px",
          }}
          className="nav "
        >
          <div className=" d-flex w-100 px-2 py-2  justify-content-between container-fluid">
            {/* logo start */}
            <div className="logo  d-flex align-items-center">
              <Fade delay={0} direction="down" triggerOnce={true} >
                  <Link to={'/'}>    
                   <img
                       loading="lazy"
                       decoding="async"
                         width={50}
                         height={50}
              
                  className="logo  rounded-circle  d-sm-block  "
                  src={logo}
                  alt="logo"
                /> </Link>
                <div
                  style={{ color: "var(--text-color)", whiteSpace: "nowrap", }}
                  className="  mb-0 d-none d-sm-block px-1 "
                >
                  <Fade triggerOnce={true} cascade>
                       sky Galaxy
                  </Fade>
                </div>
                  
              </Fade>
            </div>
            {/* logo end */}
            <div className=" d-lg-block">
              <ul className="my-0 h-100 d-flex  align-items-center gap-2">
                <li className="nav-item d-flex align-items-center"></li>
                <Fade delay={0} direction="down" triggerOnce={true} cascade>
                  {nav_link_show}
                </Fade>

                <Link className="rounded-circle d-none d-sm-block" style={{border:' 0.2rem solid var(--bgColor)'}} to={role ? "ProfileAccount" : "login"}>
                {/* 
            className="logo rounded-circle m-auto d-block " */}
                  <img 
                   loading="lazy"
                   decoding="async"
                     width={50}
                 
                    className="logo d-none d-sm-block rounded-circle dropdown-toggle border-1"
                    src={
                      !image || image === "undefined"
                        ? avatar
                        : `${imgeUrl}/${image}`
                    }
                    alt="avatar"
                  />
                </Link>
              </ul>
            </div>
          </div>
        </nav>

        {/* seareh input && dropdown start */}
        <div className="serch px-3 justify-content-between  position-relative my-3 w-100 d-flex gap-2 align-items-center">
          <Fade className="border-0" delay={0} direction="left" triggerOnce={true} cascade>
            <a href="tel:+966598909991"
             style={{cursor: "pointer"}}
              className="d-none d-sm-flex align-items-center gap-1"
            >
              <BsFillTelephoneFill  className="fs-5" />
              <Fade className="border-0" direction="up" triggerOnce={true} cascade>
                : +966598909991
              </Fade>
            </a>
          </Fade>
          <div
            style={{ border: "1px solid var(--text-color)" }}
            className="h-100  d-flex align-items-center "
          >
            <input
              type="search"
              className="h-100 px-2 w-100 text-end"
              placeholder="...بحث"
              onChange={handelserche}
            />
            <label>
              <CiSearch />
            </label>
          </div>

          {/* {error && <p className="position-absolute w-100"> not fonde </p>} */}

          {/* dropdown */}

          <span
            style={{cursor: "pointer"}}
            className=" d-none d-sm-block dropdown-toggle  "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* <Fade className="border-0" delay={0} direction="right" triggerOnce={true} cascade> */}
              تسجيل الدخول 
            {/* </Fade> */}
          </span>
          <FaUser
           
            className="d-block d-sm-none dropdown-toggle "
            data-bs-toggle="dropdown"
            aria-expanded="false"
            color="var(--spanColo)"
            fontSize={"1.5rem"}
          />

          <ul className=" dropdown-menu">{AuthLinksShow}</ul>
        </div>
        {/* seareh input end */}
      </header>

      {/* go to top start */}
      <span
        className=" "
        style={{
          transform: scroll ? "translateY(0)" : "translateY(-1500px)",
        }}
        onClick={Scrolto}
        id="span"
      >
        <IoChevronUpOutline />
        <IoChevronUpOutline />
      </span>
      {/* go to top end */}
            {/* go to whatsapp start */}
          
        
       
      
      
   <a   style={{
          transform: scroll ? "translateX(0)" : "translateX(-1500px)",
        }}id="whatsapp"href="https://wa.me/+966598909991" className="text-white ">
                        <BsWhatsapp fontSize={"3rem"}   />
                    
          </a>
      
      {/* go to top end */}
    </>
  );
};

export default Header;
