import "./Foter.css";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { lazy, Suspense, useCallback, useEffect } from "react";

import logo from "../../imges/footerImge.webp";
import skyDitels from "../../imges/skyDitels.pdf";
import { XIcon } from "react-share";
import { addHoverEffect } from "../../utils/icons_hover";

// icons

const SiSnapchat = lazy(() =>
  import("react-icons/si").then((module) => ({ default: module.SiSnapchat }))
);
const SiFacebook = lazy(() =>
  import("react-icons/si").then((module) => ({ default: module.SiFacebook }))
);
const FaTelegramPlane = lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaTelegramPlane,
  }))
);
const BsWhatsapp = lazy(() =>
  import("react-icons/bs").then((module) => ({ default: module.BsWhatsapp }))
);
const BsFillTelephoneFill = lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsFillTelephoneFill,
  }))
);
const FcAutomotive = lazy(() =>
  import("react-icons/fc").then((module) => ({ default: module.FcAutomotive }))
);
const FcSynchronize = lazy(() =>
  import("react-icons/fc").then((module) => ({ default: module.FcSynchronize }))
);
const FcUnlock = lazy(() =>
  import("react-icons/fc").then((module) => ({ default: module.FcUnlock }))
);
const MdOutlineMail = lazy(() =>
  import("react-icons/md").then((module) => ({ default: module.MdOutlineMail }))
);
const TfiHeadphoneAlt = lazy(() =>
  import("react-icons/tfi").then((module) => ({
    default: module.TfiHeadphoneAlt,
  }))
);
const RiDownloadCloud2Line = lazy(() =>
  import("react-icons/ri").then((module) => ({
    default: module.RiDownloadCloud2Line,
  }))
);
const FaInstagram = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaInstagram }))
);

const Footer = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const icons = document.querySelectorAll(".mouse-hover");
    const cleanupFunctions = Array.from(icons).map((icon) =>
      addHoverEffect(icon)
    );

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    // <animate__bounceInRight>
    <footer className="footer  mt-4">
      {/* services */}
      <div className="row services  py-3 px-3 w-100 m-auto fs-4 text-center">
        <div className="col-sm-6 col-md-3 px-2 ">
          <div className="d-flex align-items-center gap-2 justify-content-md-center w-100">
            <Suspense>
              <FcAutomotive fontSize={"3rem"} className="" />
            </Suspense>

            <p className="m-0 fw-bolder d-flex flex-column">
              توصيل سريع
              <span className=" d-none d-md-block ">
                شحن سريع لجميع المنتجات
              </span>
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 px-2">
          <div className="d-flex align-items-center gap-2 justify-content-md-center w-100">
            <Suspense>
              <TfiHeadphoneAlt fontSize={"3rem"} />
            </Suspense>

            <p className="m-0 fw-bolder d-flex flex-column">
              دعم متواصل
              <span className=" d-none d-md-block">24/7 نحن ندعمك 24 ساعة</span>
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 px-2">
          <div className="d-flex align-items-center gap-2 pt-3 pt-md-0 justify-content-md-center w-100">
            <Suspense>
              <FcUnlock fontSize={"3rem"} />
            </Suspense>

            <p className="m-0 fw-bolder d-flex flex-column">
              دفع آمن
              <span className=" d-none d-md-block">نحن نضمن الدفع الآمن</span>
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 px-2">
          <div className="d-flex align-items-center pt-3 pt-md-0 3 gap-2 justify-content-md-center">
            <Suspense>
              <FcSynchronize fontSize={"3rem"} />
            </Suspense>
            <p className="m-0 fw-bolder d-flex flex-column">
              استرداد الأموال
              <span className="d-none d-md-block">لديك 14 يوما للعودة </span>
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Icons && */}

      <div className="row p-3  bp-0 ">
        {/*  communication */}
        <div className="col-12 col-sm-4 text-center pt-3">
          <Fade className="w-100" direction="up" triggerOnce={true} cascade>
            <Link to={"/"}>
              <img
                className="m-auto "
                loading="lazy"
                decoding="async"
                width={100}
                height={100}
                src={logo}
                alt="logo"
              />
              <div className="pt-1 fw-bold">شركة مجرة السماء للتجارة</div>
            </Link>

            <div className="d-flex align-items-center justify-content-center gap-1">
              <Suspense>
                <MdOutlineMail fontSize={"1rem"} />
              </Suspense>
              <a href="mailto:info@skygalaxyco.com"> info@skygalaxyco.com</a>
            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-center column-gap-2">
              <span
                style={{ color: " var(--btn-bg-color) " }}
                className="fs-5 fw-bold     text-nowrap"
              >
                الرقم الضريبي:{" "}
              </span>
              <span className="fw-bold">311658655700003</span>
            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-center column-gap-2">
              <span
                style={{ color: " var(--btn-bg-color) " }}
                className="fw-bold fs-5 text-nowrap "
              >
                السجل التجاري :{" "}
              </span>
              <span className="fw-bold">1010881633</span>
            </div>

            <a
              className="btn btn-outline-primary my-1"
              href={skyDitels}
              id="Download"
              download={"skyDitels.pdf"}
            >
              <Suspense>
                <RiDownloadCloud2Line fontSize={"1.5rem"} className="mx-1 " />
              </Suspense>
              <i className=" "> تحميل اوراق الشركه </i>
            </a>

            <span
              style={{ color: " var(--btn-bg-color) " }}
              className=" fs-5 mt-2 fw-bold d-block"
            >
              {" "}
              تواصل معنا{" "}
            </span>

            <div className="d-flex justify-content-center align-items-center pt-1 ">
              <a className="fs-5 mx-1 mouse-hover" href="tel:+966598909991">
                <Suspense>
                  <BsFillTelephoneFill
                    fontSize={"1.3rem"}
                    color="var( --spancolor)"
                  />
                </Suspense>
              </a>
              <a
                href="https://www.facebook.com/share/UcQFNEMfpaWuphKy/?mibextid=qi2Omg"
                target="_blank"
                className="text-white mx-1 mouse-hover"
              >
                <Suspense>
                  <SiFacebook fontSize={"1.3rem"} color="#0866ff" />
                </Suspense>
              </a>
              <a
                href="http://t.me/Skygalaxyshop"
                target="_blank"
                className="text-white mx-1 mouse-hover"
              >
                <Suspense>
                  <FaTelegramPlane fontSize={"1.3rem"} color="#28a8e9" />
                </Suspense>
              </a>
              <a
                href="https://wa.me/+966598909991"
                target="_blank"
                className="text-white mx-1 mouse-hover"
              >
                <Suspense>
                  <BsWhatsapp fontSize={"1.3rem"} color="#33bd45 " />
                </Suspense>
              </a>
              <a
                href="https://www.snapchat.com/add/skygalaxyshop?share_id=VESqbU6Mucg&locale=ar-AE"
                target="_blank"
                className="text-white mx-1  mouse-hover"
              >
                <Suspense>
                  <SiSnapchat fontSize={"1.6rem"} color="#fffc00" />
                </Suspense>
              </a>
              <a
                href="https://www.instagram.com/sky.galaxy.shop?igsh=MTdkODBteWZ4cDY1MQ=="
                target="_blank"
                className="text-white mx-1 mouse-hover"
              >
                <Suspense>
                  <FaInstagram fontSize={"1.3rem"} color="#df0073" />
                </Suspense>
              </a>
              <a
                href="https://x.com/skygalaxyshop?s=09"
                target="_blank"
                className="text-white mx-1 mouse-hover"
              >
                <Suspense>
                  <XIcon size={25} round={true} />
                </Suspense>
              </a>
            </div>
            <Link
              onClick={scrollToTop}
              to="/PrivacyPolic"
              className=" d-block fw-bold my-2"
            >
              الاحكام والشروط وسياسات الاسترجاع
            </Link>
          </Fade>
        </div>
        <div className=" col-12 col-sm-8 mb-0  my-3">
          <h3
            style={{
              borderColor: " var(--btn-bg-color)!important ",
              color: "var(--btn-bg-color)",
            }}
            className="text-center border-bottom fw-bold mb-3 pb-2  w-100"
          >
            فروعنا{" "}
          </h3>

          <div className=" row ">
            <div className="col-12 col-md-6">
              <Fade direction="up" triggerOnce={true} cascade>
                <ul className="list-unstyled px-2  text-center">
                  <li className="fs-5">
                    <span
                      style={{ color: " var(--btn-bg-color) " }}
                      className="w-100 d-block text-center fw-bold fs-5 py-2 "
                    >
                      الإدارة العامة
                    </span>

                    <h5 className="footer-link text-center">
                  
                      الرياض - حي الملز - طريق صلاح الدين الايوبي
                    </h5>
                  </li>
                  <span
                    style={{ color: " var(--btn-bg-color) " }}
                    className="w-100 d-block text-center mt-5 fw-bold fs-5"
                  >
                   
                    المنطقة الوسطى
                  </span>
                  <li className="">
                    <h5 className="footer-link">
                      الرياض - مخرج ١٧ - طريق المدينة المنورة
                    </h5>
                  </li>
                  <li>
                    <h5 className="footer-link">
                      الرياض - حي العارض - طريق الملك عبد العزيز
                    </h5>
                  </li>
                  <li>
                    <h5 className="footer-link">
                      الرياض - حي السلي - شارع ابن   ماجة
                    </h5>
                  </li>
                </ul>
              </Fade>
            </div>

            <div className="col-12 col-md-6">
              <Fade direction="up" triggerOnce={true} cascade>
                <ul className="list-unstyled  text-center">
                  <li className=" pt-1">
                    <span
                      style={{ color: " var(--btn-bg-color) " }}
                      className="w-100 d-block text-center fw-bold py-2 fs-5"
                    >
                      
                      المنطقة الغربية
                    </span>
                    <h5 className="footer-link text-center">
                      مكة المكرمة - حي الرصيفة - شارع الشجاعة
                    </h5>
                  </li>
                  <li className=" ">
                    <h5 className="footer-link text-center ">
                      مكة المكرمة - حي الزايدي - طريق الملك فهد
                    </h5>
                  </li>

                  <li className=" ">
                    <span
                      style={{ color: " var(--btn-bg-color) " }}
                      className="w-100 d-block text-center fw-bold fs-5  py-2"
                    >
                      
                      المنطقة الشرقية
                    </span>
                  </li>
                  <li className=" ">
                    <h5 className="footer-link text-center">
                      الدمام - حي البادية - شارع المستشفى
                    </h5>
                  </li>
                </ul>
              </Fade>
            </div>
          </div>
        </div>
      </div>

      {/* Footer End Section */}
      <div
        style={{ borderColor: " var(--btn-bg-color)!important " }}
        className="text-center border border-top-1 py-2 overflow-hidden "
      >
        <Fade direction="up" triggerOnce={true}>
          <a
            className={"w-100"}
            target="_blank"
            href="https://www.codeprops.com"
          >
            صمم بواسطه codeprops. جميع الحقوق محفوظة <i>.2024 &copy; </i>
          </a>
        </Fade>
      </div>
    </footer>
  );
};

export default Footer;
