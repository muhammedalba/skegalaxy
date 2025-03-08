import { Helmet } from "react-helmet-async";
import Carousel from "../components/carousel/Carousel";
import Products from "./products/Products";
import { Link } from "react-router-dom";
import imge from "../imges/brand.jpg";
import imge1 from "../imges/brand1.jpg";
import imge2 from "../imges/brand2.jpg";
import imge3 from "../imges/brand3.png";
import imge4 from "../imges/brand4.jpg";
import imge5 from "../imges/brand5.jpg";
import imge6 from "../imges/brand6.jpg";

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
