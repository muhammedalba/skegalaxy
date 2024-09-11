import "./About.css";
// import video from "../../imges/Profile/about-video.mp4";
import heroImage from "../../imges/Profile/prof.jpg";
import img1 from "../../imges/Profile/prof.jpg";
import img2 from "../../imges/Profile/IMG-20240809-WA0018.jpg";
import img3 from "../../imges/Profile/IMG-20240809-WA0042.jpg";
import img4 from "../../imges/Profile/IMG-20240809-WA0048.jpg";
import img5 from "../../imges/Profile/IMG-20240809-WA0070.jpg";
import img6 from "../../imges/Profile/IMG-20240809-WA0085.jpg";

import { Fade } from "react-awesome-reveal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// Import Swiper React components
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const About = () => {
  const images=[
    {id: "1",value:img1},
    {id: "2",value:img2},
    {id: "3",value:img3},
    {id: "4",value:img4},
    {id: "5",value:img5},
    {id: "6",value:img6},
  ]
  const carosel=images.map(i =>{
    return <SwiperSlide key={i.id} onClick={()=>console.log(1)
    } className="">
      <img className="w-100 h-100" src={i.value} alt="img" />
    </SwiperSlide>
  })
  return (
    <div id="about" className="container pt-5 mt-3 overflow-hidden">
      <h1 className="text-center pt-4 text-primary"> من نحن !</h1>
      {/* Video Section */}
      {/* <div className="video-container overflow-hidden w-100  ">
        <video
          style={{  objectFfit: "cover" ,width: 'inherit'}}
          controls
        >
          <source src={video} type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو.
        </video>
      </div> */}
      <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
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

              <div className="">
                <img width={400} height={400} src={heroImage} alt="Hero" className="w-100 rounded" />
              
              </div>
              </Fade>
            </div>
            <div className="col-md-7 ">
            <Fade direction="up" triggerOnce cascade>
              <div className="mt-4">
                <h3 className="text-center"> شركة مجرة السماء للتجارة </h3>
                <span className="about_prag text-center w-100 d-inline-block">شركة مجرة السماء للتجارة </span>
                <p className="mt-3 text-dark">
                شركة مجرة السماء هي من الشركات الكبرى في السوق السعودي في مجال العزل المائي والحراري والحماية ومعالجة الخرسانة والتي تأسست في المنطقة الوسطى في المملكة العربية السعودية بمدينة الرياض لتقديم خدمات عالية الجودة طبقاً للمواصفات والمعايير الهندسية المعتمدة من الجهات الهندسية المختصة داخل مملكتنا الحبيبة

شركة مجرة السماء وفريقها الهندسي والفني يسعى جاهداً لتقديم الإرسادات والإستشارات والحلول الهندسية الفعالة والجذرية في مجال العزل المائي والحراري . كما تقوم شركة مجرة السماء بتنفيذ الكثير من المشاريع المتوسطة والضخمة حول مناطق ومدن المملكة 
                </p>
              </div></Fade>
            </div>

          
           <div className="row pt-4 mt-4 border-top">
           <div className="col-md-7 ">
              <div className="mt-4">
                <Fade direction="up" triggerOnce cascade>

               
                <h3 className=" text-center "> رؤيتنا</h3>
                <span className="about_prag text-center w-100 d-inline-block">شركة مجرة السماء للتجارة </span>
                <p className="mt-3 text-dark">
                الريادة المحلية من خلال استراتيجية تنفيذ المشاريع التي تتوافق مع أعلى معايير الجودة السعودية والعالمية لتصبح أفضل مؤسسة رائدة.  شركة جالاكسي سكاي المتخصصة والمفضلة في إدارة وتشغيل وصيانة المرافق في المملكة تهدف إلى إدارة وتشغيل وصيانة المرافق في المملكة.

وتركز على كسب ثقة عملائنا وموظفينا والمجتمع بالمرافق والمشاريع المخصصة لها من قبل الوزارات والمؤسسات العامة وكوادر فنية مدربة وموظفين أكفاء واحترافية وجودة.  بفضل الأداء الفعال لمنشأة تجارية قادرة على التطور والنمو
                </p> </Fade>
              </div>
            </div> 
             <div className="col-md-5">
             <Fade direction="up" triggerOnce cascade>
              <div className="">
                <img width={400} height={400} src={img4} alt="Hero" className="w-100 rounded " />
              
              </div>
              </Fade>
            </div>
           </div>
          </div>
        </div>
      </section>
    {/*contact  */}
      <section className="bg-contacts">
        <main className=" pt-5 mt-2  Contact-items  container Contact-sec" id="Contact">
        <Fade direction="up" triggerOnce>

          <div className="text-center border-bottom">
            <h2 className="fs-3">التواصل</h2>
            <p className="fs-4">
             هل تريد مساعده ؟ <span className="fs-3 text-danger">تواصل معنا لا تتردد</span>
            </p>
          </div>
         </Fade> 
          <div className="item pt-5">
            <div className="one-sec row row-gap-3 flex-wrap">
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
                  <h3>   المنطقة الوسطى   </h3>
                  <p >الرياض - مخرج ١٧ - طريق المدينة المنورة</p>
                </div>
                </Fade>
              </div>
           
            {/* <div className="two-sec row"> */}
              <div className="demo1 col-12 col-md-6">
                <Fade direction="up " triggerOnce  className="w-100 h-100">
                <div className="one p-3">
                  <h3>اتصل بنا </h3>
                  <a href="https://wa.me/+966598909991" >+966598909991</a>
                </div>
                </Fade>
              </div>
              <div className="demo1 col-12 col-md-6 ">
              <Fade direction="up " triggerOnce  className="w-100 h-100">
                <div className="one p-3">
                <h3>بريدنا الالكتروني</h3>
                <a href="mailto:info@skygalaxyco.com"> info@skygalaxyco.com</a>
                </div> </Fade>
              </div>
              </div>
            {/* </div> */}
          </div> 
         {/*map  */}
          <div className="mt-5">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.7122636397758!2d50.088684!3d26.432760499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fd00723c33a3%3A0x81186921c4f94e68!2z2LnZiNin2LLZhCDZhdin2YrYqSDYrdix2KfYsdmK2Kkg2LHYutmI2YrYqSDZhdis2LHYqSDYp9mE2LPZhdin2KEg2YTZhNiq2KzYp9ix2Kk!5e0!3m2!1sar!2str!4v1724486500106!5m2!1sar!2str" height={250} style={{border: 0,width:'100%'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

           </div>
       
        </main>
      </section>
      
    </div>
  );
};

export default About;
