import { NavLink } from "react-router-dom";
import "./SideBarr.css";
import { useEffect, useState } from "react";
// icons
import { FaUsers } from "react-icons/fa";
import { BsClipboardMinus } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa6";
import { MdOutlineBorderColor, MdOutlineMapsHomeWork } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { BiCarousel } from "react-icons/bi";

import { Fade } from "react-awesome-reveal";

import { useDispatch } from "react-redux";
import { Results } from "../../../redux/features/Slice/QuantityResultSlice";
import { currentPage } from "../../../redux/features/Slice/NavigationSlice";

const SideBar = () => {
  const [open, setopen] = useState(false);
  const [display, setdisplay] = useState(true);

  const dispatch = useDispatch();

  // Calculate the screen size to set the close and open menu button
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth <= 767
        ? (setopen(false), setdisplay(false))
        : setdisplay(true);
    });
    return () => {
      window.removeEventListener("resize", setopen);
    };
  }, []);
  //

  // Show or close the sidebar
  const handelchang = () => {
    display && setopen(!open);
  };

  const nav_Links = [
    {
      title: "الطلبات ",
      path: "orders",
      icon: <MdOutlineBorderColor />,
    },
    {
      title: " المستخدمون",
      path: "users",
      icon: <FaUsers />,
    },
    {
      title: "الاقسام ",
      path: "categories",
      icon: <BsClipboardMinus />,
    },
    {
      title: "   الصور الرئيسيه  ",
      path: "carousel",
      icon: <BiCarousel />,
    },

    {
      title: "الشركات ",
      path: "brands",
      icon: <MdOutlineMapsHomeWork />,
    },
    {
      title: "المنتجات ",
      path: "products",
      icon: <FaProductHunt />,
    },
    // {
    //   title: "طلبات التحويل ",
    //   path: "transfers",
    //   icon:<TbTransfer/> ,
    // },

    {
      title: "اكواد الخصم ",
      path: "coupons",
      icon: <BsClipboardMinus />,
    },
  ];

  // get property
  // const bgColor = document.styleSheets[0].cssRules[0].style.getPropertyValue("--bg-color");

  // reset navigation to 10 items per page and update navigation property

  const resetNavegation = () => {
    dispatch(Results(10));
    dispatch(currentPage(1));
  };

  // navLink in map

  const nav_link_show = nav_Links.map((link, index) => {
    return (
      <Fade key={index} delay={0} direction="right" triggerOnce={true}>
        <li
          onClick={resetNavegation}
          className="nav-item d-flex align-items-center "
        >
          <NavLink
            style={{ height: "40px" }}
            to={link.path}
            className="nav-link p-2 d-flex  align-items-center fs-5 "
          >
            {link.icon}
            <span
              style={{ display: open ? "block" : "none" }}
              className=" text-nowrap me-2 "
            >
              {link.title}
            </span>
          </NavLink>
        </li>{" "}
      </Fade>
    );
  });

  return (
    <div
      style={{ width: open ? "175px" : "60px" }}
      className="sidebar overflow-hidden pt-5 px-2 
          "
    >
      <ul style={{ position: "fixed" }} className="p-0 ">
        {display && (
          <div className="py-2">
            <FaBarsStaggered
              onClick={handelchang}
              className="m-2"
              fontSize={"25px"}
              cursor={"pointer"}
            />
          </div>
        )}
        {nav_link_show}
      </ul>
    </div>
  );
};

export default SideBar;
