import "./Foter.css";
import { SiFacebook } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { Fade } from "react-awesome-reveal";

import { FaInstagram } from "react-icons/fa";


import { FcAutomotive } from "react-icons/fc";
import { FcSynchronize } from "react-icons/fc";
import { FcUnlock } from "react-icons/fc";
import logo from "../../imges/footerImge.webp";

import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
import skyDitels from "../../imges/skyDitels.pdf";
import { TfiHeadphoneAlt } from "react-icons/tfi";


const Footer = () => {
  return (
    // <animate__bounceInRight>
    <footer className="footer  mt-4">
      {/* services */}
      <div className="row services m-auto w-100 py-3 px-3 fs-4 text-center">
        <div className="col-sm-6 col-md-3 px-2 ">
          <div className="d-flex align-items-center gap-2 justify-content-md-center">
            <FcAutomotive fontSize={"3rem"} className="" />

            <p className="m-0 fw-bolder d-flex flex-column">
              توصيل سريع
              <span className=" d-none d-md-block ">
                شحن سريع لجميع المنتجات
              </span>
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 px-2">
          <div className="d-flex align-items-center gap-2 justify-content-md-center ">
            <TfiHeadphoneAlt fontSize={"3rem"} />

            <p className="m-0 fw-bolder d-flex flex-column">
              دعم متواصل
              <span className=" d-none d-md-block">24/7 نحن ندعمك 24 ساعة</span>
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 px-2">
          <div className="d-flex align-items-center gap-2 pt-3 pt-md-0 justify-content-md-center">
            <FcUnlock fontSize={"3rem"} />

            <p className="m-0 fw-bolder d-flex flex-column">
              دفع آمن
              <span className=" d-none d-md-block">نحن نضمن الدفع الآمن</span>
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 px-2">
          <div className="d-flex align-items-center pt-3 pt-md-0 3 gap-2 justify-content-md-center">
            <FcSynchronize fontSize={"3rem"} />

            <p className="m-0 fw-bolder d-flex flex-column">
              استرداد الأموال
              <span className="d-none d-md-block">لديك 14 يوما للعودة </span>
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Icons && */}
      <div className="w-100">
        <div className="row p-3 w-100 bp-0 ">
          {/*  communication */}
          <div className="col-12 col-sm-4 text-center pt-3">
            <Fade direction="up" triggerOnce={true} cascade>
              <Link to={"/"}>
                <img
                  className="m-auto "
                  loading="lazy"
                  decoding="async"
                  width={100}
                  src={logo}
                  alt="logo"
                />
                <div className="pt-1 fw-bold">شركة مجرة السماء للتجارة</div>
              </Link>
              {/* <div className="d-flex align-items-center justify-content-center gap-1 py-1 pointer">
                                  <BsTelephone fontSize={'1rem'} />
                                  <a href="tel:+966598909991" >

                                      966598909991+
                                  </a>
                                  </div> */}
              <div className="d-flex align-items-center justify-content-center gap-1">
                <MdOutlineMail fontSize={"1rem"} />
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
                className="btn btn-primary my-1"
                href={skyDitels}
                id="Download"
                download={"skyDitels"}
              >
                <i className=" text-white"> تنزيل معلومات الشركه</i>
              </a>

              <span
                style={{ color: " var(--btn-bg-color) " }}
                className=" fs-5 mt-2 fw-bold d-block"
              >
                {" "}
                تواصل معانا{" "}
              </span>
            
              <div className="d-flex justify-content-center align-items-center pt-1 ">
              <a className="fs-5 mx-1"   href="tel:+966598909991">
               
               <TfiHeadphoneAlt
                 fontSize={"1.7rem"} 
                 color="var( --spancolor)"
               />
             </a>
                <a href="#" className="text-white mx-1">
                  <SiFacebook fontSize={"2rem"} color="#0866ff" />
                </a>
                <a href="#" className="text-white mx-1">
                  <FaTelegramPlane fontSize={"2rem"} color="#28a8e9" />
                </a>
                <a
                  href="https://wa.me/+966598909991"
                  className="text-white mx-1"
                >
                  <BsWhatsapp fontSize={"2rem"} color="#33bd45 " />
                </a>
                <a href="#" className="text-white mx-1 ">
                  <FaInstagram fontSize={"2rem"} color="#df0073" />
                </a>
              </div>
             <Link to="/PrivacyPolic" className=" d-block fw-bold my-2">الاحكام والشروط وسياسات الاسترجاع </Link>

            </Fade>
          </div>
          <div className=" col-12 col-sm-8 mb-0  my-3">
            <Fade direction="up" triggerOnce={true} cascade>
              <h3
                style={{
                  borderColor: " var(--btn-bg-color)!important ",
                  color: "var(--btn-bg-color)",
                }}
                className="text-center border-bottom fw-bold mb-3 pb-2"
              >
                فروعنا{" "}
              </h3>
              <div className=" row ">
                <div className="col-12 col-md-6">
                  <ul className="list-unstyled px-2  text-center">
                    <li className="fs-5">
                      <span
                        style={{ color: " var(--btn-bg-color) " }}
                        className="w-100 d-block text-center fw-bold fs-5 py-2 "
                      >
                        الإدارة العامة
                      </span>

                      <h5 className="footer-link text-center">
                        {" "}
                        الرياض - حي الملز - طريق صلاح الدين الايوبي
                      </h5>
                    </li>
                    <span
                      style={{ color: " var(--btn-bg-color) " }}
                      className="w-100 d-block text-center mt-5 fw-bold fs-5"
                    >
                      {" "}
                      المنطقة الوسطى{" "}
                    </span>
                    <li className="">
                      <h5 className="footer-link">
                        الرياض - مخرج ١٧ - طريق المدينة المنورة{" "}
                      </h5>
                    </li>
                    <li>
                      <h5 className="footer-link">
                        الرياض - حي العارض - طريق الملك عبد العزيز{" "}
                      </h5>
                    </li>
                    <li>
                      <h5 className="footer-link">
                        الرياض - حي السلي - شارع ابن ماجة{" "}
                      </h5>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-6">
                  <ul className="list-unstyled  text-center">
                    <li className=" pt-1">
                      <span
                        style={{ color: " var(--btn-bg-color) " }}
                        className="w-100 d-block text-center fw-bold py-2 fs-5"
                      >
                        {" "}
                        المنطقة الغربية{" "}
                      </span>
                      <h5 className="footer-link text-center">
                        مكة المكرمة - حي الرصيفة - شارع الشجاعة{" "}
                      </h5>
                    </li>
                    <li className=" ">
                      <h5 className="footer-link text-center ">
                        مكة المكرمة - حي الزايدي - طريق الملك فهد{" "}
                      </h5>
                    </li>

                    <li className=" ">
                      <span
                        style={{ color: " var(--btn-bg-color) " }}
                        className="w-100 d-block text-center fw-bold fs-5  py-2"
                      >
                        {" "}
                        المنطقة الشرقية
                      </span>
                    </li>
                    <li className=" ">
                      <h5 className="footer-link text-center">
                        الدمام - حي البادية - شارع المستشفى{" "}
                      </h5>
                    </li>
                  </ul>
                </div>
              </div>
            </Fade>
          </div>

          {/* about*/}
          {/* <div
            style={{ borderColor: " var(--btn-bg-color)!important " }}
            className="col-12 border-top pt-3  mt-2 "
          >
            <Fade direction="up" triggerOnce={true} cascade>
              <h5
                style={{ color: " var(--btn-bg-color) " }}
                className="text-center"
              >
                عن sky Galaxy{" "}
              </h5>
              <ul
                style={{ listStyle: "none" }}
                className="d-flex justify-content-center flex-wrap gap-2"
              >
                <li className="px-2 ">
                  <Link to="/About" className="link-underline-primary">
                    من نحن{" "}
                  </Link>
                </li>
                <li className="px-2">
                  <Link to="/PrivacyPolic" className="footer-link text-white">
                    الاحكام والشروط وسياسات الاسترجاع{" "}
                  </Link>
                </li>
              </ul>
            </Fade>
          </div> */}
        </div>
      </div>

      {/* Footer End Section */}
      <div
        style={{ borderColor: " var(--btn-bg-color)!important " }}
        className="text-center border border-2  border-end-0 border-start-0 p-2"
      >
        <Fade direction="up" duration={500} delay={0} triggerOnce={true}>
          <a href="https://wa.me/+905346833726">
            صمم بواسطه محمد. جميع الحقوق محفوظة <i>.2024 &copy; </i>
          </a>
        </Fade>
      </div>
    </footer>
  );
};

export default Footer;
