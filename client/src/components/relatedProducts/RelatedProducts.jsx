import  { useMemo } from 'react';
import Card from '../card/Card';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { useGetDataQuery } from '../../redux/features/api/apiSlice';

const RelatedProducts = ({product}) => {

 // Fetch category data for related products
 const { isSuccess: categorySuccess, data: categoryData } = useGetDataQuery(
    `products?category=${product?.data?.category?._id}`,
    { skip: !product?.data?.category?._id }
  );




    const responsive = useMemo(() => {
        return {
          superLargeDesktop: {
            // الشاشات الكبيرة جداً مثل 1440px فما فوق
            breakpoint: { max: 4000, min: 1440 },
            items: 4,
          },
          desktop: {
            // الشاشات المكتبية
            breakpoint: { max: 1440, min: 1024 },
            items: 3,
          },
          tablet: {
            // الشاشات اللوحية
            breakpoint: { max: 1024, min: 768 },
            items: 2,
          },
          mobile: {
            // الشاشات الهواتف
            breakpoint: { max: 768, min: 0 },
            items: 1,
          },
        };
      }, []);

      // Related Products Carousel
  const relatedProducts = useMemo(() => {
    if (categorySuccess && categoryData.data.length > 0) {
      const filteredProducts = categoryData?.data
        ?.filter((p) => p._id !== product?.data?._id)
        ?.map((prod) => (
          <Card
            key={prod._id}
            product={prod}
          
            imgePath={categoryData?.imageUrl}
          />
        ));
      return (
        <div className={filteredProducts?"container d-block":'d-none'}>
          <div  className="w-100 px-2 portion d-flex align-items-center justify-content-between py-3 mt-4 border-bottom bo">
          <span
           
           
            className=" fs-4   "
          >
              منتجات مشابه

          </span>
         <span style={{
          height:"1px",
          backgroundColor: "var(--bgColor) !important" ,
          flex:'auto'
         }} className="bg-dark mx-3"></span>

          <Link  to={"/categories"}
          style={{ color: "var( --btn-bg-color) !important" }}
          >عرض الكل </Link>
        </div>  
           <Carousel
          responsive={responsive}
          showDots={true}
          ssr={true}
          arrows={true}    
           rtl={true}
          focusOnSelect={false}
          // centerMode={true}
          lazyLoad={true}
        >
          {filteredProducts}
        </Carousel>
        </div>

      );
    }

    return null;
  }, [categorySuccess, categoryData?.data, categoryData?.imageUrl, responsive, product?.data?._id]);
    return (
        relatedProducts
    );
}

export default RelatedProducts;
