import { Link, NavLink, useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import logo from "../../../imges/logo.webp";
import avatar from "../../../imges/avatar.webp";
// icons

import { CiSearch } from "react-icons/ci";

import { IoMdHome } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";

import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";





import { searchItem } from "../../../redux/features/Slice/SerchSlice";
import { useDispatch } from "react-redux";
import { Fade } from "react-awesome-reveal";
import { Results } from "../../../redux/features/Slice/QuantityResultSlice";
import { currentPage } from "../../../redux/features/Slice/NavigationSlice";
// import { Fade } from "react-awesome-reveal";

const TopBar = () => {
  const cookies = new Cookies();
  const imgeUrl = cookies.get("imageUrl");
  const image = cookies.get("image");
  const role = cookies.get("role") || "user";
  const dispatch = useDispatch();
  const navigate= useNavigate()
 // handel serche
 const handelserche = (e) => {
  // console.log(e.target.value);

    dispatch(Results(15));
    dispatch(currentPage(1));
 
  dispatch(searchItem(e.target.value));
};

  // handel Logout
  const Logout = () => {
    const cookies = new Cookies();
    // cookies.remove();
    cookies.remove("firstname");
    cookies.remove("image");
    cookies.remove("imageUrl");
    cookies.remove("role");
    cookies.remove("token");
    
    navigate('/')
 
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
          className={role&&link.path === "/login"|| role&&link.path === "/signup"||!role&&link.path === "/ProfileAccount"||!role&&link.path === "/"?"d-none ":'dropdown-item d-flex align-items-center gap-2'}
          onClick={link.path === "/" && Logout}
        >
          {link.icon}
          {link.title}
        </Link>
      </li>
    );
  });

  // Nav links
  const navLinks = [
    {
      title: "صفحة الرئيسيه",
      path: "/",
      icon: <IoMdHome fontSize={"1.7rem"} color="var( --text-color)" />,
    },
    {
      title: "لوحه التحكم",
      path: "/dashboard",
      icon: (
        <AiOutlineDashboard fontSize={"1.7rem"} color="var( --text-color)" />
      ),
    },
  ];

  // navLink in map   dispatch(searchItem(''));
  const resetSearch=()=>{
    dispatch(searchItem(''));
  }

  const nav_link_show = navLinks.map((link, index) => {
    return (
      <li onClick={resetSearch}
        key={index}
        className={
          role === "user" && link.path === "/dashboard"
            ? "d-none"
            : "nav-item d-flex align-items-center "
        }
      >
        {/* <Fade delay={0} direction="down" triggerOnce={true} cascade> */}
          <NavLink
            to={link.path}
            className="nav-link p-2 d-flex  align-items-center "
          >
            <span className="px-1 d-none d-md-block ">{link.title}</span>
            {link.icon}
          </NavLink>
        {/* </Fade> */}
      </li>
    );
  });


  return (
    <header dir="ltr" className="w-100 text-uppercase fw-semibold">
      <nav
        style={{
          boxShadow: " rgba(17, 17, 26, 0.1) 0px 1px 0px",
        }}
        className="nav "
      >
        <div className=" d-flex w-100 px-2 py-2  justify-content-between container-fluid">
          {/* logo start */}
          {/* <Fade delay={0} direction="up" triggerOnce={true}> */}
            <div className="logo d-flex   align-items-center">
              <img
                className="logo    me-2 d-sm-block  "
                src={logo}
                alt="logo"
              />
              <div
                style={{ color: "var(--text-color)", whiteSpace: "nowrap" }}
                className=" mb-0 d-none d-sm-block"
              >
                {/* <Fade triggerOnce={true} cascade> */}
                    مجرة السماء 
                {/* </Fade> */}
              </div>
            </div>
          {/* </Fade> */}
          {/* logo end */}
          <div className=" d-lg-block">
            <ul className="my-0 h-100 d-flex  align-items-center ">
              {nav_link_show}

              <img
                className="logo px-1 d-none d-sm-block rounded-circle dropdown-toggle border-1"
                src={
                  !image || image === "undefined"
                    ? avatar
                    : `${imgeUrl}/${image}`
                }
                alt="avatar"
              />
            </ul>
          </div>
        </div>
      </nav>

        {/* seareh input && dropdown start */}
        <div className="serch px-3 justify-content-between  position-relative my-3 w-100 d-flex gap-2 align-items-center">
          <Fade className="border-0" delay={0} direction="left" triggerOnce={true} cascade>
            <span
             style={{cursor: "pointer"}}
              className="d-none d-sm-flex align-items-center gap-1"
            >
              <BsFillTelephoneFill  className="fs-5" />
              <Fade className="border-0" direction="up" triggerOnce={true} cascade>
                : +905346833726
              </Fade>
            </span>
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
            <label >
              <CiSearch  />
            </label>
          </div>

     

          <span
            style={{cursor: "pointer"}}
            className=" d-none d-sm-block dropdown-toggle  "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Fade className="border-0" delay={0} direction="right" triggerOnce={true} cascade>
              تسجيل دخول \انشاء حساب
            </Fade>
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
  );
};

export default TopBar;
