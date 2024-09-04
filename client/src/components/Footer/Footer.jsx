import "./Foter.css";
import { SiFacebook } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { Fade } from "react-awesome-reveal";

import { FaInstagram } from "react-icons/fa";

import { FcHeadset  } from "react-icons/fc";
import { FcAutomotive } from "react-icons/fc";
import { FcSynchronize } from "react-icons/fc";
import { FcUnlock } from "react-icons/fc";
import logo from '../../imges/footerImge.webp'
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";






const Footer = () => {
  return (
    // <animate__bounceInRight>
    <footer className="footer  mt-4">
      {/* services */}
      <div className="row services m-auto w-100 py-3 px-3 fs-4 text-center">
        <div className="col-sm-6 col-md-3 px-2 ">
          <div className="d-flex align-items-center gap-2 justify-content-md-center">
            <FcAutomotive fontSize={"3rem"}  className="" />

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
            <FcHeadset  fontSize={"3rem"} />

            <p className="m-0 fw-bolder d-flex flex-column">
              دعم متواصل
              <span className=" d-none d-md-block">
               
                24/7 نحن ندعمك 24 ساعة
              </span>
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 px-2">
          <div className="d-flex align-items-center gap-2 pt-3 pt-md-0 justify-content-md-center">
            <FcUnlock fontSize={"3rem"} />

            <p className="m-0 fw-bolder d-flex flex-column">
              دفع آمن
              <span className=" d-none d-md-block">
                نحن نضمن الدفع الآمن
              </span>
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 px-2">
          <div className="d-flex align-items-center pt-3 pt-md-0 3 gap-2 justify-content-md-center">
            <FcSynchronize fontSize={"3rem"} />

            <p className="m-0 fw-bolder d-flex flex-column">
              استرداد الأموال
              <span className="d-none d-md-block">
                لديك 14 يوما للعودة{" "}
              </span>
            </p>
          </div>
        </div>
      </div>

{/* Social Media Icons && */} 
      <div className="w-100">
          <div className="row p-3 w-100 bp-0 ">  
                {/*  communication */}
                <div className="col-12 col-sm-4 text-center pt-3">
                    <Fade direction='up' triggerOnce={true} cascade>
                                 <Link to={'/'}>
                                    <img className="m-auto "loading="lazy"
                   decoding="async"
                     width={100}
                     src={logo} alt="logo" />
                                    <div className="pt-1 ">
                                        
                                        شركة مجرة السماء للتجارة 
                                    </div>
                                  </Link>
                                  <div className="d-flex align-items-center justify-content-center gap-1 py-1 pointer">
                                  <BsTelephone fontSize={'1rem'} />
                                  <a href="tel:+966598909991" >

                                      966598909991+
                                  </a>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-center gap-1">
                                      <MdOutlineMail fontSize={'1rem'}/>
                                      <a href="*"> info@skygalaxyco.com</a>
                                  </div>

                    <div className="d-flex justify-content-center align-items-center  mt-2">
                      <a href="#" className="text-white me-1">
                        <SiFacebook fontSize={"2rem"} color="#0866ff" />
                      </a>
                      <a href="#" className="text-white mx-1">
                        <FaTelegramPlane fontSize={"2rem"} color="#28a8e9"/>
                      </a>
                      <a href="https://wa.me/+966598909991" className="text-white mx-1">
                        <BsWhatsapp fontSize={"2rem"}  color="#33bd45 " />
                      </a>
                      <a  href="#" className="text-white mx-1 ">
                        <FaInstagram fontSize={"2rem"}  color="#df0073"/>
                      </a>
                    </div>


                    </Fade>
                   
         
                </div>  
                <div className=" col-12 col-sm-8 mb-0  my-3">
                            <Fade direction='up' triggerOnce={true} cascade>
                                <h3 style={{borderColor:' var(--btn-bg-color)!important '}} className="text-center border-2 border-top-0 border-start-0 border-end-0  border mb-3 pb-2">فروعنا </h3>
                                <div className=" row ">
                                    <div className="col-12 col-md-6">
                                    <ul className="list-unstyled px-2  text-center">
                                        <li className="fs-5">
                                          <span className="w-100 d-block text-center fs-5 pt-2 ">الإدارة العامة</span>

                                          <h5 className="footer-link text-center"> الرياض - حي الملز - طريق صلاح الدين الايوبي</h5>
                                        </li>
                                        <span className="w-100 d-block text-center  fs-5"> المنطقة الوسطى </span>
                                        <li className="">

                                    <h5 className="footer-link">    
                                        
                                      الرياض - مخرج ١٧ - طريق المدينة المنورة   </h5>
                                  </li>
                                  <li>

                                    <h5 className="footer-link">                                        
                                    الرياض - حي العارض - طريق الملك عبد العزيز  </h5>
                                  </li>
                                  <li>
                                    <h5 className="footer-link"> 

                                    الرياض - حي السلي - شارع ابن ماجة   </h5>
                                  </li>
    

                                      
                                    
                                    </ul>
                                    </div>
                                    <div className="col-12 col-md-6">
                                    <ul className="list-unstyled  text-center">
                                    <li className=" pt-1">
                                          <span className="w-100 d-block text-center py-2 fs-5">  المنطقة الغربية </span>
                                          <h5 className="footer-link text-center"> 
                                            
                                          مكة المكرمة - حي الرصيفة - شارع الشجاعة </h5>
                                        </li>
                                        <li className=" ">
                                          <h5 className="footer-link text-center ">
    
                                          مكة المكرمة -  حي الزايدي - طريق الملك فهد </h5>
                                        </li> 
                                      
                                        <li className=" ">
                                        <span className="w-100 d-block text-center fs-5  py-2"> المنطقة الشرقية</span>

                              
                                        </li> 
                                        <li className=" ">
                                          <h5 className="footer-link text-center">
    
                                          الدمام - حي البادية -  شارع المستشفى   </h5>
                                        </li> 
                                      
                                    
                                    </ul>
                                    </div>
                                </div>
                            </Fade>
                </div>  

                {/* pages*/}
                {/* <div className="col-sm-6 col-md-2  my-3">
                            <Fade direction='up' triggerOnce={true} cascade>
                                <h5>الصفحات </h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/" className="footer-link text-white">الصفحه الرئيسيه</Link></li>
                                    <li><Link to="/authors" className="footer-link text-white">من نحن  </Link></li>
                                    <li><Link to="/authors" className="footer-link text-white">تواصل معنا </Link></li>
                                </ul>
                            </Fade>
                </div>   */}

                {/* Über uns Column */}
                {/* <div className="col-sm-6 col-md-5 ">
                            <Fade direction='up' triggerOnce={true} cascade>
                                <h5>موقعنا </h5>
                                <div className="">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.7122636397758!2d50.088684!3d26.432760499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fd00723c33a3%3A0x81186921c4f94e68!2z2LnZiNin2LLZhCDZhdin2YrYqSDYrdix2KfYsdmK2Kkg2LHYutmI2YrYqSDZhdis2LHYqSDYp9mE2LPZhdin2KEg2YTZhNiq2KzYp9ix2Kk!5e0!3m2!1sar!2str!4v1724486500106!5m2!1sar!2str" height={150} style={{border: 0,width:'100%'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

            </div>
                            </Fade> 
                </div>  */}
                {/* Social Media Icons */}
                 <div className="Social col-12 col-sm-4 align-items-center  p-2 text-center fs-3 ">
                {/*  <Fade
                    direction="up"
                    duration={500}
                    delay={0}
                    cascade
                    triggerOnce={true}
                  >
                    <span>اتصل بنا :</span>

                    <div className="d-flex justify-content-center align-items-center  ">
                      <a href="#" className="text-white me-3">
                        <SiFacebook fontSize={"2rem"} color="#0866ff" />
                      </a>
                      <a href="#" className="text-white me-3">
                        <FaTelegramPlane fontSize={"2rem"} color="#28a8e9"/>
                      </a>
                      <a href="https://wa.me/+966598909991" className="text-white me-3">
                        <BsWhatsapp fontSize={"2rem"}  color="#33bd45 " />
                      </a>
                      <a  href="#" className="text-white me-3 ">
                        <FaInstagram fontSize={"2rem"}  color="#df0073"/>
                      </a>
                    </div>
                  </Fade>*/}
                </div> 
            
           </div>  

      </div>
      
           {/* <div className="col-12 ">
            <div className="">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.7122636397758!2d50.088684!3d26.432760499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fd00723c33a3%3A0x81186921c4f94e68!2z2LnZiNin2LLZhCDZhdin2YrYqSDYrdix2KfYsdmK2Kkg2LHYutmI2YrYqSDZhdis2LHYqSDYp9mE2LPZhdin2KEg2YTZhNiq2KzYp9ix2Kk!5e0!3m2!1sar!2str!4v1724486500106!5m2!1sar!2str" height={100} style={{border: 0,width:'100%'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

            </div>

          </div>  */}

   




      {/* Footer End Section */}
      <div style={{borderColor:' var(--btn-bg-color)!important '}} className="text-center border border-2  border-end-0 border-start-0 p-2">
        <Fade direction="up" duration={500} delay={0} triggerOnce={true}>
          <p>
            صمم بواسطه محمد. جميع الحقوق محفوظة <i>.2024 &copy; </i>
          </p>
        </Fade>
      </div>
     
    </footer>
  );
};

export default Footer;
