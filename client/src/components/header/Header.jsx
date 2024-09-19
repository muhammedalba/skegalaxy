import  {
  useCallback,
  useEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
} from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchItem } from "../../redux/features/Slice/SerchSlice";
import Cookies from "universal-cookie";
import "./header.css";
import { Fade } from "react-awesome-reveal";
import { Results } from "../../redux/features/Slice/QuantityResultSlice";
import { currentPage } from "../../redux/features/Slice/NavigationSlice";
import { useAutapiMutation } from "../../redux/features/api/users/AuthSlice";
// img
import logo from "../../imges/logo.webp";
import avatar from "../../imges/avatar.webp";

// icons
const RiTwitterXFill  = lazy(() =>
  import("react-icons/ri").then((module) => ({ default: module.RiTwitterXFill }))
);

const SiSnapchat  = lazy(() =>
  import("react-icons/si").then((module) => ({ default: module.SiSnapchat }))
);
const CiSearch = lazy(() =>
  import("react-icons/ci").then((module) => ({ default: module.CiSearch }))
);
const IoChevronUpOutline = lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoChevronUpOutline,
  }))
);
const IoStorefrontOutline = lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoStorefrontOutline,
  }))
);
const AiOutlineDashboard = lazy(() =>
  import("react-icons/ai").then((module) => ({
    default: module.AiOutlineDashboard,
  }))
);
const BsCart2 = lazy(() =>
  import("react-icons/bs").then((module) => ({ default: module.BsCart2 }))
);
const CiLogin = lazy(() =>
  import("react-icons/ci").then((module) => ({ default: module.CiLogin }))
);
const FaRegUser = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaRegUser }))
);

const TfiHeadphoneAlt = lazy(() =>
  import("react-icons/tfi").then((module) => ({
    default: module.TfiHeadphoneAlt,
  }))
);
const CiHeart = lazy(() =>
  import("react-icons/ci").then((module) => ({ default: module.CiHeart }))
);
const MdOutlineWifiProtectedSetup = lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineWifiProtectedSetup,
  }))
);

const BsWhatsapp = lazy(() =>
  import("react-icons/bs").then((module) => ({ default: module.BsWhatsapp }))
);
const IoMdHome = lazy(() =>
  import("react-icons/io").then((module) => ({ default: module.IoMdHome }))
);

const MdWhatsapp = lazy(() =>
  import("react-icons/md").then((module) => ({ default: module.MdWhatsapp }))
);
const PiUserCircleLight = lazy(() =>
  import("react-icons/pi").then((module) => ({
    default: module.PiUserCircleLight,
  }))
);
const PiShoppingCartThin = lazy(() =>
  import("react-icons/pi").then((module) => ({
    default: module.PiShoppingCartThin,
  }))
);
const LiaHomeSolid = lazy(() =>
  import("react-icons/lia").then((module) => ({
    default: module.LiaHomeSolid,
  }))
);
const HiOutlineChevronLeft = lazy(() =>
  import("react-icons/hi2").then((module) => ({
    default: module.HiOutlineChevronLeft,
  }))
);
const PiCaretDownThin = lazy(() =>
  import("react-icons/pi").then((module) => ({
    default: module.PiCaretDownThin,
  }))
);
const SiFacebook = lazy(() =>
  import("react-icons/si").then((module) => ({
    default: module.SiFacebook,
  }))
);
const FaTelegramPlane = lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaTelegramPlane,
  }))
);
const FaInstagram = lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaInstagram,
  }))
);
const BsFillTelephoneFill = lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsFillTelephoneFill,
  }))
);


// <a  id="btnSerch" class="btn"
     
// href=https://api.whatsapp.com/send?phone=9647816435470&text=المنتج%20%3A%20${e.title}%20قسم%20مستحضرات%20التجميل
// target="_blank">buy now</a>

{/* <script>
window.onscroll = function(){
    myFunctiono()
};
function myFunctiono() {
    var winscroll = document.body.scrollTop || document.documentElement.scrollTop;
    var heigth = document.documentElement.scrollHeight - document.documentElement.clientHeight ;
    var scrolled = (winscroll / heigth) * 100 ;
    document.getElementById("mybar").style.width = scrolled +"%" 
};
</script> */}

const Header = () => {
  const [Autapi, { isSuccess }] = useAutapiMutation();

  const cookies = useMemo(() => new Cookies(), []);

  const imgeUrl = cookies.get("imageUrl");
  const image = cookies.get("image");
  const role = cookies.get("role");

  const cartitims = useSelector((state) => state.cart);
  const categoriesitims = useSelector((state) => state.Categories);
  const brandsitims = useSelector((state) => state.brands);
  const search = useSelector((state) => state.serch);



  const [scroll, setscroll] = useState(false);
  const [trans, settrans] = useState(false);
  const [open, setopen] = useState(false);
  const [showSubMinu, setshowSubMinu] = useState(false);
  const [showSubMinuBrands, setshowSubMinuBrands] = useState(false);

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

  const handelserche = useCallback(
    (e) => {
      window.scrollTo({ top: 1100, behavior: "smooth" });
      dispatch(currentPage(1));
      dispatch(searchItem(e.target.value));
    },
    [dispatch]
  );
  const Scrolto = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isSuccess) {
      cookies.remove();
      cookies.remove("firstname");
      cookies.remove("image");
      cookies.remove("imageUrl");
      cookies.remove("role");
      cookies.remove("token");
      cookies.remove("refreshToken");
      window.location.pathname = "/";
    }
  }, [cookies, isSuccess]);
  // handel Logout
  const Logout = () => {
    Autapi({
      url: "logout",
      body: {},
      method: "post",
    });
 
  };
  // reset navigation to 10 items per page and update navigation property

  const resetNavegation = () => {
    dispatch(Results(15));
    dispatch(currentPage(1));
    dispatch(searchItem(""));

  };
  // Auth links
  const AuthLinks = [
    {
      title: " حسابي الشخصي",
      path: "/ProfileAccount",
      icon: (
        <Suspense>
          <IoMdHome fontSize={"1.5rem"} color="var( --btn-bg-color)" />
        </Suspense>
      ),
    },
    {
      title: "انشاء حساب",
      path: "/signup",
      icon: (
        <Suspense>
          <FaRegUser fontSize={"1.5rem"} color="var( --btn-bg-color)" />
        </Suspense>
      ),
    },
    {
      title: "تسجيل دخول",
      path: "/login",
      icon: (
        <Suspense>
          <CiLogin fontSize={"1.5rem"} color="var( --btn-bg-color)" />
        </Suspense>
      ),
    },
    {
      title: "تسجيل خروج",
      path: "/",
      icon: (
        <Suspense>
          <CiLogin fontSize={"1.5rem"} color="var(--btn-bg-color)" />
        </Suspense>
      ),
    },
  ];
  // Auth links show
  const AuthLinksShow = AuthLinks.map((link, index) => {
    return (
      <li key={index}>
        
        <Link 
          to={`${link.path}`}
          className={
            (role && link.path === "/login") ||
            (role && link.path === "/signup") ||
            (!role && link.path === "/ProfileAccount") ||
            (!role && link.path === "/")
              ? "d-none "
              : "dropdown-item d-flex align-items-center gap-2"
          }
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
      title: " طلباتي",
      path: role === "admin" ? "/dashboard/orders" : "/orders",
      icon: (
        <Suspense>
          <MdOutlineWifiProtectedSetup
            fontSize={"1.2rem"}
            color="var(--text-color)"
          />
        </Suspense>
      ),
    },
    {
      title: " المفضلة",
      path: "/Favorite",
      icon: (
        <Suspense>
          <CiHeart fontSize={"1.2rem"} color="var(--text-color)" />
        </Suspense>
      ),
    },
    {
      title: "سلة مشترياتي",
      path: "/Cart",
      icon: (
        <Suspense>
          <BsCart2 fontSize={"1.2rem"} color="var(--text-color)" />
        </Suspense>
      ),
    },

    // {
    //   title: "شركاء النجاح",
    //   path: "/cart",
      // icon:  <Suspense>
      //     <BsCart2 fontSize={"1.2rem"} color="var(--text-color)" />
      // </Suspense>
    // },
    // {
    //   title: "الاقسام",
    //   path: "/cart",
      // icon:  <Suspense>
      //     <BsCart2 fontSize={"1.2rem"} color="var(--text-color)" />
      // </Suspense>
    // },
    {
      title: "الصفحة الرئيسية",
      path: "/",
      icon: (
        <Suspense>
          <IoStorefrontOutline fontSize={"1.2rem"} color="var(--text-color)" />
        </Suspense>
      ),
    },

    {
      title: "لوحه التحكم",
      path: "/dashboard",
      icon: (
        <Suspense>
          <AiOutlineDashboard fontSize={"1.2rem"} color="var(--text-color)" />
        </Suspense>
      ),
    },
  ];


  // get property
  // const bgColor = document.styleSheets[0].cssRules[0].style.getPropertyValue("--bg-color");




const closeMenu= useCallback(()=>{
  
  window.scrollTo({ top: 0, behavior: "smooth" });
 setshowSubMinu(false) ;
 setshowSubMinuBrands(false); 
 setopen(false); 
  
},[]);

  // in desktop
  const categories=categoriesitims.map((category)=>{
    return   <Link  to={`/category/${category._id}`} onClick={closeMenu} key={category._id} className="card border-0 px-4 py-2 w-100  ">
        <span>{category?.name.split("_")[0]}</span>
        {/* <span>{category?.name.split("_")[1]}</span> */}
                   
           </Link>
    });
    // in mobile
    const SubMinuCategories=categoriesitims.map((category)=>{
      return   <li  key={category._id} className="border-bottom">
          <Link  to={`/category/${category._id}`} onClick={closeMenu}>{category?.name.split("_")[0]}</Link>
          {/* <span>{category?.name.split("_")[1]}</span> */}
                     
             </li>
      });
      // in mobile
      const brands=brandsitims.map((brand)=>{
        return   <Link  to={`/brand/${brand._id}`}  key={brand._id} onClick={closeMenu} className="card border-0 px-4 py-2 w-100  ">
                    <span  >{brand?.name.split("_")[0]}</span>
                     {/* <span>{brand?.name.split("_")[1]}</span> */}
                       
               </Link>
        });
        // in desktop
        const SubMinuBrands=brandsitims.map((brand)=>{
          return   <li  key={brand._id} className="border-bottom">
              <Link  to={`/brand/${brand._id}`} onClick={closeMenu} >{brand?.name.split("_")[0]}</Link>
              {/* <span>{brand?.name.split("_")[1]}</span> */}
                         
                 </li>
          });



  // navLink show
  const nav_link_show = nav_Links.map((link, index) => {
    return (
      <li
      //  onMouseOver={()=>{link.title === 'الاقسام'&& setshowSubMinu(true),link.title === 'شركاء النجاح'&& setshowSubMinuBrands(true)}} onMouseOut={()=>{setshowSubMinu(false),
      //   setshowSubMinuBrands(false)
      //  }} 
        onClick={resetNavegation}
        key={index}
        className={
          (link.path === "/dashboard" && role === "user") ||
          (link.path === "/Cart" && role === "admin") ||
          (link.path === "/Favorite" && role === "admin") ||
          (link.path === "/orders" && !role) ||
          (role === undefined && link.path === "/dashboard")
            ? "d-none"
            : "nav-item d-flex align-items-center   position-relative"
        }
      >
       

                 <NavLink
          to={link.path}
          className="nav-link  py-1 px-2 d-flex  align-items-center position-relative"
        >
          <span className="mx-1 d-none d-lg-block">{link.title}</span>

          {
            <span className=" position-relative ">
              {link.icon}
              {link.path === "/Cart" && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger ">
                  {cartitims > 0 && cartitims}
                </span>
              )}
            </span>
          }
                </NavLink>
          
       
      </li>
    );
  });

  //

  return (
    <>
      <header onClick={()=>setshowSubMinu(false)}
        dir="ltr"
        style={{
          transform: trans && !open ? "translateY(-150%)" : "translateY(0)",
        }}
        className=" w-100  fw-semibold"
      >
        <nav
          style={{
            boxShadow: " rgba(17, 17, 26, 0.1) 0px 1px 0px",
          }}
          className="nav "
        >
          <div className=" d-flex w-100 px-2 py-1  justify-content-between container-fluid">
            {/* logo start */}
            <div className="  d-flex align-items-center">
              <Fade delay={0} direction="down" triggerOnce={true}>
                <Link to={"/"}>
                  <img
                    loading="lazy"
                    decoding="async"
                    width={50}
                    height={50}
                    className="logo  d-block  "
                    src={logo}
                    alt="logo"
                  />{" "}
                </Link>
                <div
                  style={{ color: "var(--btn-bg-color)", whiteSpace: "nowrap" }}
                  className="  mb-0 d-none d-sm-block px-1 "
                >
                  <Fade triggerOnce={true} cascade>
                    sky Galaxy
                  </Fade>
                </div>
              </Fade>
            </div>
            {/* logo end */}

            <div className="d-none d-lg-block">
              <ul className="my-0 h-100 d-flex  align-items-center gap-row-2">
                <li className="nav-item d-flex align-items-center"></li>
                 <li onMouseOver={()=>setshowSubMinu(true)} onMouseOut={()=>setshowSubMinu(false)} className="nav-item d-flex align-items-center justify-content-between position-relative ">
              <Suspense>
                <PiCaretDownThin style={{transform:showSubMinu? 'rotateX(180deg)':'rotateX(0deg)'}} className="MinusIcon " fontSize={"1rem"} />
              </Suspense>
                <Link className="mx-1" to={'/categories'}>
                  الاقسام     
                
                </Link>
                  <ul className={`${showSubMinu? "position-absolute  sub-menu  text-end":"d-none "}`}>
                    {SubMinuCategories}
                  </ul>
                </li> 



                <li onMouseOver={()=>setshowSubMinuBrands(true)} onMouseOut={()=>setshowSubMinuBrands(false)} className="nav-item px-1 d-flex align-items-center justify-content-between position-relative">
              <Suspense>
                <PiCaretDownThin style={{transform:showSubMinuBrands? 'rotateX(180deg)':'rotateX(0deg)'}} className="MinusIcon " fontSize={"1rem"} />
              </Suspense>
              <Link className="mx-1" to={'/brands'}>
                  شركاء النجاح     
              
              </Link>
                  <ul className={`${showSubMinuBrands? "position-absolute  sub-menu  text-end":"d-none "}`}>
                    {SubMinuBrands}
                  </ul>
                </li> 
                <Fade delay={0} direction="down" triggerOnce={true} cascade>
                  {nav_link_show}
                </Fade>

                <Link
                  className="rounded-circle d-none d-sm-block mx-1"
                  style={{ border: " 0.2rem solid var(--bgColor)" }}
                  to={role ? "ProfileAccount" : "login"}
                >
                  {/* 
            className="logo rounded-circle m-auto d-block " */}
                  <img
                    loading="lazy"
                    decoding="async"
                    width={50}
                    className="logo d-none d-sm-block rounded-circle dropdown-toggle border-1 "
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

        
            {/* bars button srt && icons */}
            <div className=" d-flex d-lg-none align-items-center">
              <NavLink
                to={"/cart"}
                className={
                  role === "admin"
                    ? "d-none"
                    : "p-1 border rounded-circle position-relative"
                }
              >
                <Suspense>
                  <PiShoppingCartThin
                    fontSize={"1.4rem"}
                    color="var( --btn-bg-color)"
                  />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger ">
                    {cartitims > 0 && cartitims}
                  </span>
                </Suspense>
              </NavLink>
              <NavLink
                to={"/Favorite"}
                className={
                  role === "admin" ? "d-none" : "p-1 border rounded-circle mx-1"
                }
              >
                <Suspense>
                  <CiHeart fontSize={"1.4rem"} color="var( --btn-bg-color)" />
                </Suspense>
              </NavLink>
              <NavLink to={"/"} className="p-1 border rounded-circle mx-1">
                <Suspense>
                  <LiaHomeSolid
                    fontSize={"1.4rem"}
                    color="var( --btn-bg-color)"
                  />
                </Suspense>
              </NavLink>
              <NavLink
                to={"/dashboard"}
                className={
                  role !== "admin" ? "d-none" : "p-1 border rounded-circle mx-1"
                }
              >
                <Suspense>
                  <AiOutlineDashboard
                    fontSize={"1.4rem"}
                    color="var( --btn-bg-color)"
                  />
                </Suspense>
              </NavLink>

              <div
                onClick={() => setopen(!open)}
                className="bars d-flex mx-3  align-items-center;
                      flex-column   justify-content-center "
              >
                <span
                  style={{
                    transform: open && "translateY(9px) rotate(-45deg)",
                    backgroundColor: open ? "#f96363" : "var(--bgColor)",
                  }}
                ></span>
                <span
                  className="w-50 mx-0"
                  style={{
                    transform: open ? "scale(0)" : "scale(1)",
                    backgroundColor: open ? "#f96363" : "var(--bgColor)",
                  }}
                ></span>
                <span
                  style={{
                    transform: open && "translateY(-9px) rotate(45deg)",
                    backgroundColor: open ? "#f96363" : "var(--bgColor)",
                  }}
                ></span>
              </div>
            </div>

            {/* bars button end */}
          </div>
        </nav>

        {/* seareh input && dropdown start */}
        <div className="serch px-3 justify-content-between  position-relative my-1 w-100 d-flex gap-2 align-items-center">
          <Fade
            className="border-0"
            delay={0}
            direction="left"
            triggerOnce={true}
            cascade
          >
            <a
              href="tel:+966598909991"
              style={{ cursor: "pointer" }}
              className="d-none d-sm-flex align-items-center gap-1"
            >
              <Suspense>
                <TfiHeadphoneAlt className="fs-5" color="var( --spancolor)" />
              </Suspense>
              <Fade
                className="border-0 "
                direction="up"
                triggerOnce={true}
                cascade
              >
                : +966598909991
              </Fade>
            </a>
          </Fade>
          <a href="tel:+966598909991">
            <Suspense>
              <TfiHeadphoneAlt
                className="fs-5 d-sm-none"
                color="var( --spancolor)"
              />{" "}
            </Suspense>
          </a>
          <div className=" input-box h-100  m-auto d-flex align-items-center ">
            <input
              type="search"
              className="h-100 px-2 w-100 text-end"
              placeholder="...بحث"
              onChange={handelserche}
              value={search}
            />
            <label>
              <Suspense>
                <CiSearch fontSize={"1.7rem"} />
              </Suspense>
            </label>
          </div>

          {/* dropdown */}

          <div style={{ fontWeight: "100" }} className="   d-none d-lg-block">
            <Link to={"/about"} className="mx-1 p-1">
              <span className=""> من نحن </span>{" "}
            </Link>
            <Link to={"/PrivacyPolic"} className="p-1 mx-1">
              الاحكام والشروط{" "}
            </Link>
          </div>

          <span
            style={{ cursor: "pointer" }}
            className=" d-none dropdown-toggle  "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* <Fade className="border-0" delay={0} direction="right" triggerOnce={true} cascade>  */}
            {!role ? " تسجيل الدخول" : "تسجيل خروج"}
            {/* </Fade>  */}
          </span>
          {/* auth links */}
          <div>
            <Suspense>
              <PiUserCircleLight
                className="d-block  dropdown-toggle "
                data-bs-toggle="dropdown"
                aria-expanded="false"
                color="var( --btn-bg-color)"
                fontSize={"1.7rem"}
              />
            </Suspense>

            <ul className=" dropdown-menu">{AuthLinksShow}</ul>
          </div>
        </div>
        {/* seareh input end */}
      </header>

      {/* go to top start */}
      <span
        className=" border border-2"
        style={{
          transform: scroll ? "translateY(0)" : "translateY(-1500px)",
        }}
        onClick={Scrolto}
        id="span"
      >
        <Suspense>
          <IoChevronUpOutline />
        </Suspense>
        <Suspense>
          <IoChevronUpOutline />
        </Suspense>
      </span>
      {/* go to top end */}

      {/* go  whatsapp start */}
      <a
        style={{
          animation:scroll?'shake  1s    infinite linear':'' ,
          transform: scroll
            ? "translateX(0)"
            : "translateX(-1500px)",
        }}
        id="whatsapp"
        href="https://wa.me/+966598909991"
        className="text-white p-1 rounded-circle"
      >
        <Suspense>
          <MdWhatsapp fontSize={"2.8rem"} className="" />
        </Suspense>
      </a>

      {/* go  whatsapp end */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, .5)",
          display: open ? "block" : "none",
          zIndex: "4",
        }}
        className="h-100 w-100 position-absolute  "
      ></div>
      {/* side bar in mobeil */}
      <div
        className="d-lg-none  justify-content-end mobelLink"
        style={{
          transform: open ? "translateX(0)" : "translateX(200%)",
        }}
      >
        <ul className="pt-3 text-nowrap px-0 w-100">
          <li
            onClick={() => setopen(false)}
            style={{ transform: open ? "translateX(0)" : "translateX(200%)" }}
            className={"nav-item  py-2   w-100 "}
          >
            <NavLink to={"/"}>الصفحه الرئيسية</NavLink>
          </li>
          <li
            style={{ transform: open ? "translateX(0)" : "translateX(200%)" }}
            className={"nav-item w-100 "}
          >
            <button
              className=" px-3 collapseHeader collapsed card border-0  w-100 "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#categories"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              الاقسام
              <Suspense>             
                <HiOutlineChevronLeft className="plusIcon" fontSize={"1rem"} />
              </Suspense>
              <Suspense>
                <PiCaretDownThin className="MinusIcon " fontSize={"1rem"} />
              </Suspense>
            </button>
       

            <div className="collapse " id="categories">
              {categories}
            
            </div>
          </li>
          <li
            style={{ transform: open ? "translateX(0)" : "translateX(200%)" }}
            className={"nav-item w-100 "}
          >
            <button
              className=" px-3 collapseHeader collapsed card border-0  w-100 "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample1"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              شركاء النجاح
              <Suspense>             
                <HiOutlineChevronLeft className="plusIcon" fontSize={"1rem"} />
              </Suspense>
              <Suspense>
                <PiCaretDownThin className="MinusIcon " fontSize={"1rem"} />
              </Suspense>
            </button>

            <div className="collapse " id="collapseExample1">
              {brands}
            
            </div>
          </li>
          <li
            onClick={() => setopen(false)}
            style={{ transform: open ? "translateX(0)" : "translateX(200%)" }}
            className={role === "admin" ? "d-none" : "nav-item  py-2   w-100 "}
          >
            <NavLink to={"cart"}>سلة المشتريات</NavLink>
          </li>
          <li
            onClick={() => setopen(false)}
            style={{ transform: open ? "translateX(0)" : "translateX(200%)" }}
            className={
              !role || role === undefined ? "d-none" : "nav-item  py-2   w-100 "
            }
          >
            <NavLink to={"/orders"}>طلباتي</NavLink>
          </li>
          <li
            onClick={() => setopen(false)}
            style={{ transform: open ? "translateX(0)" : "translateX(200%)" }}
            className={"nav-item  py-2   w-100 "}
          >
            <NavLink to={"/about"}>من نحن</NavLink>
          </li>
          <li
            onClick={() => setopen(false)}
            style={{ transform: open ? "translateX(0)" : "translateX(200%)" }}
            className={"nav-item  py-2   w-100 "}
          >
            <NavLink to={"/PrivacyPolic"}>الاحكام والشروط</NavLink>
          </li>
          <li
            onClick={() => setopen(false)}
            style={{ transform: open ? "translateX(0)" : "translateX(200%)" }}
            className={"nav-item  py-2   w-100 "}
          >
            <a>معلومات التواصل</a>
            <div className="d-flex justify-content-center align-items-center pt-1 flex-wrap text-center w-auto">
                <a className=" w-auto" href="tel:+966598909991">
                  <Suspense>
                    <BsFillTelephoneFill
                      fontSize={"1.3rem"}
                      color="var( --spancolor)"
                    />
                  </Suspense>
                </a>
                <a href="https://www.facebook.com/share/UcQFNEMfpaWuphKy/?mibextid=qi2Omg" target="_blank"  className="w-auto ">
                  <Suspense>
                    <SiFacebook fontSize={"1rem"} color="#0866ff" />
                  </Suspense>
                </a>
                <a href="http://t.me/Skygalaxyshop" target="_blank" className=" w-auto">
                  <Suspense>
                    <FaTelegramPlane fontSize={"1rem"} color="#28a8e9" />
                  </Suspense>
                </a>
                <a
                  href="https://wa.me/+966598909991" target="_blank"
                  className="w-auto "
                >
                  <Suspense>
                    <BsWhatsapp fontSize={"1rem"} color="#33bd45 " />
                  </Suspense>
                </a>
                <a href="https://www.snapchat.com/add/skygalaxyshop?share_id=VESqbU6Mucg&locale=ar-AE" target="_blank" className="w-auto   ">
                  <Suspense>
                    <SiSnapchat   fontSize={"1rem"} color="#fffc00" />
                  </Suspense>
                </a>
                <a href="https://www.instagram.com/sky.galaxy.shop?igsh=MTdkODBteWZ4cDY1MQ==" target="_blank" className=" w-auto ">
                  <Suspense>
                    <FaInstagram fontSize={"1rem"} color="#df0073" />
                  </Suspense>
                </a>
                <a href="https://x.com/skygalaxyshop?s=09" target="_blank" className="  w-auto">
                  <Suspense>
                    <RiTwitterXFill  fontSize={"1rem"} color="#000" />
                  </Suspense>
                </a>
              </div>
          </li>
        </ul>
      </div>
    </>
  );
}; 

export default Header;
