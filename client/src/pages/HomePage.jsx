import { Helmet } from "react-helmet-async";
import Carousel from "../components/carousel/Carousel";
import Products from "./products/Products";

const HomePage = () => {
  return (
    <>
      <Helmet>
        {" "}
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

      <div className=" homePage pt-3 ">
        <Carousel />

        <Products />
      </div>
    </>
  );
};

export default HomePage;
