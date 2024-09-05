import logo from '../../imges/logo.webp'
import './text_slide.css'

const TextSlide = () => {
    return (
        <>
    <div style={{backgroundColor:'var(--bgColor)'}} className="text-container text-nowrap pt-3   d-flex overflow-hidden text-align-center  position-relative">
        <div  className="text-slide d-flex text-align-center  pb-2  fs-3">
          <p className="m-0">
        شركة مجرة السماء للتجارة . يتوفر لدينا جميع انواع العوازل مائية - حرارية - مواد حقن وإصلاح خرسانة - فوم بوليرثان
          </p>
          <img className="me-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />
        </div>
      
        <div  className="text-slide  pb-2 fs-3">
      
          <p className="m-0">
        شركة مجرة السماء للتجارة . يتوفر لدينا جميع انواع العوازل مائية - حرارية - مواد حقن وإصلاح خرسانة - فوم بوليرثان
          </p>
        </div>
    </div>
    <div className="text-container d-flex text-align-center pt-2  overflow-hidden text-nowrap position-relative">
        <div  className="text-slide-revese d-flex text-align-center  pb-2 pt-md-3  fs-3">
          <p className="m-0">
          Galaxy Sky Trading Company. We usually have all kinds of waterproof - thermal - regular materials concrete - polyurethane     foam                   </p>
          <img className="me-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />
        </div>
      
        <div  className="text-slide-revese  pb-2 pt-md-3  fs-3">
      
          <p className="m-0">
          Galaxy Sky Trading Company. We usually have all kinds of waterproof - thermal - regular materials concrete - polyurethane    foam </p>
        </div>
    </div>
   </> );
}

export default TextSlide;
