import logo from '../../imges/logo.webp'
import './text_slide.css'

const TextSlide = () => {
    return (
        <>
    <div  className="text-container text-nowrap pt-3 w-100 g-1   d-flex overflow-hidden text-align-center  position-relative">
        <div  className="text-slide d-flex text-align-center   p-2  fs-4">
          <p className="m-0">
        شركة مجرة السماء للتجارة 
          </p>

          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

          <p className="m-0" > يتوفر لدينا جميع انواع العوازل  (المائية - الحرارية - مواد حقن وإصلاح الخرسانة - فوم بوليرثان)</p>
          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

        </div> 
        <div  className="text-slide d-flex text-align-center  p-2  fs-4">
          <p className="m-0">
        شركة مجرة السماء للتجارة 
          </p>

          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

          <p className="m-0" > يتوفر لدينا جميع انواع العوازل  (المائية - الحرارية - مواد حقن وإصلاح الخرسانة - فوم بوليرثان)</p>
          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

        </div>
       <div  className="text-slide d-flex text-align-center  p-2  fs-4">
          <p className="m-0">
        شركة مجرة السماء للتجارة 
          </p>

          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

          <p className="m-0" > يتوفر لدينا جميع انواع العوازل  (المائية - الحرارية - مواد حقن وإصلاح الخرسانة - فوم بوليرثان)</p>
          <img className="mx-3"  loading="lazy" width={50} height={50} src={logo} alt="logo" />

        </div>

    </div>
   </> );
}

export default TextSlide;
