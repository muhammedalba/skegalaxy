// import {  ToastContainer } from "react-toastify";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import {
  useGetDataQuery,
 
} from "../../redux/features/api/apiSlice";
import Carousel from 'react-multi-carousel';
import { Fade } from "react-awesome-reveal";
import { SkeletonCard } from "../../utils/skeleton";


import { SkeletonProduct } from "../../utils/skeleton";
import Navigation from "../../components/navigation/Navigation";

// icons


import logo from "../../imges/logo.webp";
import Card from "../../components/card/Card";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { errorNotify } from "../../utils/Toast";


const Products = () => {


// 
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);
  const limit = useSelector((state) => state.QuantityResult);
  const Pagination = useSelector((state) => state.Pagination);





  // brand our category filter
  const [filter, setFilter] = useState("");


 
  // get products from the database
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(`products?limit=${limit}&page=${Pagination}&${filter}&keywords=${search}`);


 

  // get brands from the database
  const {
    data: brands,
   
    isSuccess: successbrands,
  } = useGetDataQuery(`brands`);
  // get brands from the database
  const {
    data: categories,
    // error: errorcategories,
    isLoading: loadingcategories,
    isSuccess: successcategories,
  } = useGetDataQuery(`categories`);




  const section1Ref = useRef(null);
  

  const scrollToSection = (ref,id) => {
    setFilter(id)
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(()=>{
    if(error){
      errorNotify('حدث خطا في السيرفر')
    }

  },[ error])
  
  



  let filteredProducts = [];

  if (isSuccess && products?.data?.length > 0) {
    filteredProducts = [...products.data]
  }


  

  // if sucsses and data is not empty  show the products
  const showData = useMemo(() => {
    if (isLoading) {
     
      return(<>
       {SkeletonProduct}
       <LoadingPage/>
      </>)
    }

    if (isSuccess && filteredProducts?.length > 0) {
      return products?.data.map((product, index) => (
        <Card key={index} product={product} imgePath={products?.imageUrl}  />
      ));
    }

    return (
      <div className="text-center w-100 pt-5 fs-5 text-primary">
        لا يوجد بيانات
      </div>
    );
  }, [filteredProducts?.length, isLoading, isSuccess, products?.data, products?.imageUrl]);

  // view brands
  const showbrands = useMemo(() => {
    if (successbrands&& brands?.data?.length === 0) {return <option value="">لايوجد معلومات</option>;}
    if (successbrands&& brands?.data?.length > 0){
    return brands?.data?.map((brand, index) => (
      <option  key={index} value={brand._id}>
        {brand.name}
      </option>
    ));}
  }, [brands?.data, successbrands]);


  // view categories
  const showCategorie = useMemo(() => {
    if (isSuccess && categories?.data?.length === 0){
       return <option value="">لايوجد بيانات</option>}

    if (isSuccess && categories?.data?.length > 0){
    return categories?.data?.map((category, index) => (
      <option disabled={loadingcategories} key={index} value={category._id}>
        {category.name}
      </option>
    ));}
  }, [categories?.data, isSuccess, loadingcategories]);
  
  
  // if sucsses and data is not empty  show the categories
  const showCategoriesData = useMemo(() => {
    if (isSuccess && categories?.data?.length === 0){
       return <option value="">لايوجد بيانات</option>}

    if (isSuccess && categories?.data?.length > 0){
    return categories?.data?.map((category, index) => (
            // <button  onClick={() => scrollToSection(section1Ref,`category=${category._id}`)}
            //   key={index}
            //   type="button"
            //   className=" btn col-12 col-sm-6 col-md-4 p-2 col-lg-3 col-xl-2 "
            //   style={{ cursor: "pointer" }}
            // >
            //   <Fade
            //     style={{ margin: "auto" }}
            //     duration={500}
            //     delay={0}
            //     direction="up"
            //     triggerOnce={true}
            //     cascade
            //   >
            //     <div
                  
            //       className="d-flex rounded-3 border align-items-center accordion-body overflow-hidden"
            //     >
            //       <img
            //         style={{ height: "100px", width: "100px" }}
            //         src={
            //           category.image
            //             ? `${categories?.imageUrl}/${category.image}`
            //             : logo
            //         }
            //         className="d-sm-block"
            //         alt="category"
            //       />
            //       <div style={{ height: "3rem" }} className="card-body w-100 h-100">
            //         <h5 className="text-dark m-0">{category.name} </h5>
            //       </div>
            //     </div>
            //   </Fade>
            // </button>
            <button onClick={() => scrollToSection(section1Ref,`category=${category._id}`)} 
     className=" btn d-block m-auto " key={index}>
        <div style={{height:'250px'}} inert="true" 
                className=" border p-2 d-flex flex-column
            align-items-center justify-content-between  m-auto pointer overflow-hidden">
          <img
            
            width={150} height={150}
            src={
              category.image
               ? `${categories?.imageUrl}/${category?.image}`
                : logo
            }
            className=" d-sm-block w"
            alt="brand"
          />

        <span style={{width:'10rem',backgroundColor:'var(--bgColor)!important'}} className="fs-3 border m-1 p-2 rounded  text-center  d-block">{category?.name} </span>
        </div>
      
     </button> 
          
    ));}
  }, [categories?.data, categories?.imageUrl, isSuccess]);
  
 


// show Brands Slide
const showBrandsSlide= useMemo(() => {
  if (isLoading) {
    return SkeletonProduct;
  }

  if (brands?.data?.length > 0) {
    return brands?.data.map((brand, index) => (
     <button onClick={() => scrollToSection(section1Ref,`brand=${brand._id}`)}   
     className=" btn d-block m-auto " key={index}>
        <div style={{height:'250px'}} inert="true" 
                className=" border p-2 d-flex flex-column
            align-items-center justify-content-between  m-auto pointer overflow-hidden">
          <img
            
            width={150} height={150}
            src={
              brand.image
               ? `${brands?.imageUrl}/${brand?.image}`
                : logo
            }
            className=" d-sm-block w"
            alt="brand"
          />
        <span style={{width:'10rem',backgroundColor:'var(--bgColor)!important'}} className="fs-3 border m-1 p-2 rounded  text-center  d-block">{brand?.name} </span>

        </div>
      
     </button> 

    ));
  }

}, [brands?.data, brands?.imageUrl, isLoading]);






     // slide settings
     const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1 // optional, default to 1.
      },
      desktop: {
        breakpoint: { max: 1024, min: 700 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 700, min: 420 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 420, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };  
  return (
    
    <div className="container-fluid ">

      {/* categgories */}

{/* {  successcategories&&    <div className=" d-none text-center d-sm-block mt-4 p-1">
        <span style={{ backgroundColor: 'var(--bgColor)'}} className=" fs-4 w-100 m-auto  mb-2 d-block py-3 border border-end-0 border-start-0 ">الاقسام</span>
        <div className="d-flex  flex-wrap justify-content-around ">
          { showCategoriesData}
        </div>
      </div>} */}
            {/* brands */}
  { successcategories &&     <div className="">
      <p style={{ backgroundColor: 'var(--bgColor)'}} className="pb-2 mb-3  fs-3 border border-end-0 border-start-0 text-center">     الاقسام  </p>
   <Carousel
  responsive={responsive}

  autoPlay={true}
  infinite={false}
 
  rewind={true}
  rewindWithAnimation={true}
  transitionDuration={1000}
  customTransition={"transform 3000ms ease-in-out"}
  // showDots={false}
  arrows={true}
  focusOnSelect={false}
  ssr={true}
  


  lazyLoad={true} // تحسين الأداء باستخدام التحميل المؤجل
>
{ showCategoriesData ||SkeletonCard}
      </Carousel>
    </div>} 
      {/* brands */}
  { successbrands &&     <div className="">
      <p style={{ backgroundColor: 'var(--bgColor)'}} className="pb-2 mb-3  fs-3 border border-end-0 border-start-0 text-center">    شركاء النجاح  </p>
   <Carousel
  responsive={responsive}

  autoPlay={true}
  infinite={false}
 
  rewind={true}
  rewindWithAnimation={true}
  transitionDuration={1000}
  customTransition={"transform 3000ms ease-in-out"}
  // showDots={false}
  arrows={false}
  focusOnSelect={false}
  ssr={true}
  rtl={true}

  // centerMode={true}
  lazyLoad={true} // تحسين الأداء باستخدام التحميل المؤجل
>
  {showBrandsSlide}
      </Carousel>
    </div>} 
      

      {/* products */}
      <div className="container-fluid my-3">
        <div ref={section1Ref} style={{ backgroundColor: 'var(--bgColor)'}} className="w-100 text-center pb-2 fs-2 border-top py-2">المنتجات</div>

        <div className=" d-flex justify-content-center flex-column border-top pt-2 gap-2">
    
          <div className="w-100 flex-wrap align-items-center overflow-hidden p-1 d-flex">
            {/*gategory  */}
            <div className=" p-2">
              <select 
                disabled={isLoading}
                className="form-select  py-2"
                onChange={useCallback((e) => {
                  setFilter(`category=${e.target.value}`);
                }, [])}
                id="category"
                value={""}
                aria-label="Default select example"
              >
                <option value="" disabled>
                  
                  الاقسام
                </option>
                {showCategorie}
              </select>
            </div>
            {/* brand */}
            <div className=" p-2">
              <select
                className="form-select  py-2"
                disabled={isLoading}
                id="brand"
                name="brand"
                aria-label="Default select example"
                onChange={useCallback(
                  (e) => setFilter(`brand=${e.target.value}`),
                  []
                )}
                value=""
              >
                <option disabled value="">
                
                  شركائنا
                </option>
                {showbrands}
              </select>
            </div>
                {/* reset data button */}
            {/* <div className="col-sm-4 d-flex align-items-end justify-center my-2"> */}
                      <button
                        onClick={() => setFilter("")}
                        type="button"
                        className="btn btn-primary h-50"
                      >
                        كل المنتجات
                      </button>
                {/* </div> */}
          </div>
            
              
      {/* products data */}
          <div className="row w-100 justify-content-center gap-2">
            {showData}
          </div>
          
        </div>
      </div>

      {/*navigation start  */}
      <Navigation
        isLoading={isLoading}
        isSuccess={isSuccess}
        status={products?.poginationResult || {}}
      />
    </div>
  
  );
};

export default Products;
