import { Fade } from "react-awesome-reveal";
// Import Swiper React components
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./About.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import logo from "../../imges/logob.webp";
import img2 from "../../imges/about/about-1.jpg";
import img1 from "../../imges/about/about-2.jpg";
import img3 from "../../imges/about/about-3.jpg";
import img4 from "../../imges/about/about-4.jpg";
import img5 from "../../imges/about/about-5.jpg";
import { Helmet } from "react-helmet-async";

const About = () => {
  const images = [
    { id: "2", value: img3 },
    { id: "4", value: img2 },
    { id: "1", value: img1 },
    { id: "5", value: img4 },
    { id: "3", value: img5 },
  ];
  const carosel = images.map((i) => {
    return (
      <SwiperSlide key={i.id} className="">
        <img className="w-100 h-100" src={i.value} alt="img" />
      </SwiperSlide>
    );
  });
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Sky Galaxy || مجرة السماء للتجارة يتوفر لدينا جميع انواع العوازل  (المائية - الحرارية - مواد حقن وإصلاح الخرسانة - فوم بوليرثان) "
        />
        <meta
          name="keywords"
          content="   العوازل المائية , العوازل الحرارية , مواد حقن وإصلاح الخرسانة , فوم بوليرثان"
        />
        <title>
          Sky Galaxy | أفضل المواد للبناء والعزل وإصلاح الخرسانات | مجرة السماء
          للتجارة الالكترونيه{" "}
        </title>
      </Helmet>
      <div id="about" className="container pt-5 mt-3 overflow-hidden">
        <h1 className="text-center pt-4 text-primary"> من نحن !</h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper  border-top pt-4"
        >
          {carosel}
        </Swiper>
        {/* Content Sections */}
        <section className="About" id="About">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-5">
                <Fade direction="up" triggerOnce cascade>
                  <div className="img1">
                    <img
                      width={400}
                      height={300}
                      src={logo}
                      alt="Hero"
                      className="w-100 "
                    />
                  </div>
                </Fade>
              </div>
              <div className="col-md-7 ">
                <Fade direction="up" triggerOnce cascade>
                  <div className="mt-4">
                    <h3 className="text-center"> شركة مجرة السماء للتجارة </h3>
                    <span className="about_prag text-center w-100 d-inline-block">
                      شركة مجرة السماء للتجارة{" "}
                    </span>
                    <p className="mt-3 text-dark">
                      نحن من الشركات الكبرى في السوق السعودي في مجال العزل
                      المائي والحراري والحماية ومعالجة الخرسانة ، والتي تأسست في
                      المملكة العربية السعودية بمدينة الرياض وبناء على ثقتنا
                      بالمنتجات المحلية أصبحنا موزعين لجميع المصانع المتخصصة في
                      صنع العوازل ، ووكلاء لأكثر من علامة تجارية عالمية في مجال
                      العزل المائي والحراري ومواد معالجة الخرسانة
                    </p>
                  </div>
                </Fade>
              </div>

              <div className="row pt-4 mt-4 border-top">
                <div className="col-md-12 ">
                  <div className="mt-4">
                    <Fade direction="up" triggerOnce cascade>
                      <h3 className=" text-center "> رؤيتنا</h3>
                      <span className="about_prag text-center w-100 d-inline-block">
                        شركة مجرة السماء للتجارة{" "}
                      </span>
                      <p className="mt-3 text-dark">
                        العمل الدائم على افتتاح فروع في جميع أنحاء المملكة؛ مما
                        يؤهلنا إلى حجز مكان ريادي في هذا المجال ؛وان نصبح دوما
                        الخيار الأول للعملاء الذين يبحثون عن التميز ؛ونسعى دائما
                        أن نكون شركاء النجاح مع عملائنا
                      </p>{" "}
                    </Fade>
                  </div>
                </div>
                {/* <div className="col-md-5">
                  <Fade direction="up" triggerOnce cascade>
                    <div className="img2">
                      <img
                        width={400}
                        height={300}
                        src={logo}
                        alt="Hero"
                        className="w-100  "
                      />
                    </div>
                  </Fade>
                </div>*/}
              </div> 
              <div className="row pt-5">
              

                <div className="row pt-4 mt-4 border-top">
                {/* <div className="col-md-5">
                    <Fade direction="up" triggerOnce cascade>
                      <div className="img2">
                        <img
                          width={400}
                          height={300}
                          src={logo}
                          alt="Hero"
                          className="w-100  "
                        />
                      </div>
                    </Fade>
                  </div> */}
                  <div className="col-md-12 ">
                    <div className="mt-4">
                      <Fade direction="up" triggerOnce cascade>
                        <h3 className=" text-center "> اهدافنا</h3>
                        <span className="about_prag text-center w-100 d-inline-block">
                          شركة مجرة السماء للتجارة{" "}
                        </span>
                        <p className="mt-3 text-dark">
                          بناء جسور من الثقة مع العملاء تعتمد على تقديم خدمات
                          عالية الجودة عن طريق خبرات فريق عمل متخصص في مجال
                          العزل المائي والحراري ؛ وتقديم حلول متطورة لخدمات العزل
                          المائي والحراري عن طريق الاهتمام بالجودة العالمية وفهم
                          نشاط العملاء ؛ ووضع اسعار تنافسية لفهم احتياجاتكم و تقديم
                          خدمة توصيل فعالة وموثوقة إلى موقع العميل في جميع أنحاء
                          المملكة
                        </p>{" "}
                      </Fade>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*contact  */}
        <section className="bg-contacts border-top">
          <main
            className=" pt-5 mt-2  Contact-items  container Contact-sec"
            id="Contact"
          >
            <Fade direction="up" triggerOnce>
              <div className="text-center border-bottom">
                <h2 className="fs-3">التواصل</h2>
                <p className="fs-4">
                  هل تريد مساعدة ؟{" "}
                  <span className="fs-5 text-danger">تواصل معنا لا تتردد</span>
                </p>
              </div>
            </Fade>
            <div className="item pt-5">
              <div className=" row row-gap-3 flex-wrap">
                <div className="demo1  col-12 col-md-6">
                  <Fade direction="up" triggerOnce className="w-100 h-100">
                    <div className="one  p-3 ">
                      <h3>الإدارة العامة</h3>
                      <p>الرياض - حي الملز - طريق صلاح الدين الايوبي</p>
                    </div>
                  </Fade>
                </div>
                <div className="demo1 col-12 col-md-6">
                  <Fade direction="up" triggerOnce className="w-100 h-100">
                    <div className="one w-100 p-3">
                      <h3> المنطقة الوسطى </h3>
                      <p>الرياض - مخرج ١٧ - طريق المدينة المنورة</p>
                    </div>
                  </Fade>
                </div>

                {/* <div className="two-sec row"> */}
                <div className="demo1 col-12 col-md-6">
                  <Fade direction="up " triggerOnce className="w-100 h-100">
                    <div className="one p-3">
                      <h3>اتصل بنا </h3>
                      <a href="https://wa.me/+966598909991">+966598909991</a>
                    </div>
                  </Fade>
                </div>
                <div className="demo1 col-12 col-md-6 ">
                  <Fade direction="up " triggerOnce className="w-100 h-100">
                    <div className="one p-3">
                      <h3>بريدنا الالكتروني</h3>
                      <a href="mailto:info@skygalaxyco.com">
                        {" "}
                        info@skygalaxyco.com
                      </a>
                    </div>{" "}
                  </Fade>
                </div>
              </div>
              {/* </div> */}
            </div>
            {/*map  */}
            <div className="mt-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.7122636397758!2d50.088684!3d26.432760499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fd00723c33a3%3A0x81186921c4f94e68!2z2LnZiNin2LLZhCDZhdin2YrYqSDYrdix2KfYsdmK2Kkg2LHYutmI2YrYqSDZhdis2LHYqSDYp9mE2LPZhdin2KEg2YTZhNiq2KzYp9ix2Kk!5e0!3m2!1sar!2str!4v1724486500106!5m2!1sar!2str"
                height={250}
                style={{ border: 0, width: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default About;
