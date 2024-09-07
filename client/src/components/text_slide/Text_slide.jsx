import logo from '../../imges/logo.webp'
import './text_slide.css'

const TextSlide = () => {
    return (
        <>
    <div style={{backgroundColor:'var(--bgColor)'}} className="text-container text-nowrap pt-3   d-flex overflow-hidden text-align-center  position-relative">
        <div  className="text-slide d-flex text-align-center  pb-2  fs-3">
          <p className="m-0">
        شركة مجرة السماء للتجارة 
          </p>

          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

          <p className="m-0" > يتوفر لدينا جميع انواع العوازل  (المائية - الحرارية - مواد حقن وإصلاح الخرسانة - فوم بوليرثان)</p>
          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

        </div> 
        <div  className="text-slide d-flex text-align-center  pb-2  fs-3">
          <p className="m-0">
        شركة مجرة السماء للتجارة 
          </p>

          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

          <p className="m-0" > يتوفر لدينا جميع انواع العوازل  (المائية - الحرارية - مواد حقن وإصلاح الخرسانة - فوم بوليرثان)</p>
          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

        </div>

    </div>
    <div className="text-container d-flex text-align-center pt-2  overflow-hidden text-nowrap position-relative">
        <div  className="text-slide-revese d-flex text-align-center  pb-2 pt-md-3  fs-3">
        <p className="m-0">
        Galaxy Sky Trading Company
          </p>
        <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />
      

          <p className="m-0">

         We usually have all kinds of waterproof - thermal - regular materials concrete - polyurethane     foam </p>
          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

        </div>
      
        <div  className="text-slide-revese d-flex text-align-center  pb-2 pt-md-3  fs-3">
        <p className="m-0">
        Galaxy Sky Trading Company
          </p>
        <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />
      

          <p className="m-0">

         We usually have all kinds of waterproof - thermal - regular materials concrete - polyurethane     foam </p>
          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

        </div>
    </div>
   </> );
}

export default TextSlide;
