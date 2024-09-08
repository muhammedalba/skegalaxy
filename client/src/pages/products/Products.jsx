// import {  ToastContainer } from "react-toastify";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetDataQuery } from "../../redux/features/api/apiSlice";
import Carousel from "react-multi-carousel";
import { Fade } from "react-awesome-reveal";
import { SkeletonCard } from "../../utils/skeleton";
import { Fragment,  } from 'react';
import { SkeletonProduct } from "../../utils/skeleton";
import Navigation from "../../components/navigation/Navigation";
import './products.css'
// icons

import logo from "../../imges/logo.webp";
import Card from "../../components/card/Card";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { errorNotify } from "../../utils/Toast";
import TextSlide from "../../components/text_slide/Text_slide";

const Products = () => {
  //
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);
  const limit = useSelector((state) => state.QuantityResult);
  const Pagination = useSelector((state) => state.Pagination);

  // brand our category filter
  const [filterCategorirs, setfilterCategorirs] = useState("");
  const [sortFilter, setsortFilter] = useState("");
  const [filterDrands, setfilterDrands] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");



  // get products from the database
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(
    `products?limit=${limit}&page=${Pagination}${filterDrands}${filterCategorirs}${sortFilter}&keywords=${search}&fields=price,title,imageCover,priceAfterDiscount,quantity,ratingsAverage`
  );
  

  // get brands from the database
  const {
    data: brands,
    isLoading: LoadingBrand,
    isSuccess: successbrands,
  } = useGetDataQuery("brands?fields=name,image&limit=500");
  // get brands from the database
  const {
    data: categories,
    // error: errorcategories,
    isLoading: loadingcategories,
    isSuccess: successcategories,
  } = useGetDataQuery("categories?fields=name,image&limit=500");

  const section1Ref = useRef(null);


  // Go to products and filter
  const scrollToSection =useCallback( (ref, id) => {
    setfilterCategorirs(id);
  
    
    const selectedcategory = categories?.data.find(
      (cate) => cate._id === id.split('=')[1]
    );
    setSelectedCategory(selectedcategory ? selectedcategory.name : "");
    const selectedBrand = brands.data.find(
      (brand) => brand._id === id.split('=')[1]
    );
    setSelectedBrand(selectedBrand ? selectedBrand.name : "");
  
    ref.current.scrollIntoView({ behavior: "smooth" });
  },[brands?.data, categories?.data]);

  useEffect(() => {
    if (error) {
      errorNotify("حدث خطا في السيرفر");
    }
  }, [error]);

  // if sucsses and data is not empty  show the products
  const showData = useMemo(() => {
    if (isLoading) {
      return (
        <>
          {SkeletonProduct}
          <LoadingPage />
        </>
      );
    }

    if (isSuccess && products?.data?.length > 0) {
      const sortedproducts = [...products.data];
   

      return sortedproducts?.map((product, index) => (
        <Card key={index} product={product} imgePath={products?.imageUrl} />
      ));
    }

    return (
      <div className="text-center w-100 pt-5 fs-5 text-primary">
        لا يوجد بيانات
      </div>
    );
  }, [isLoading, isSuccess, products?.data, products?.imageUrl]);

  // view brands select
  const showbrands = useMemo(() => {
    if (successbrands && brands?.data?.length === 0) {
      return <option value="">لايوجد معلومات</option>;
    }
  if (LoadingBrand ) {
      return <option value=""> جاري جلب البيانات</option>;
    }

    if (successbrands && brands?.data?.length > 0) {
      const sortedBrands = [...brands.data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      return sortedBrands.map((brand, index) => (
     <Fragment key={index}>
        <option   value={brand._id}>
          {brand?.name}
        </option>
          
     
     </Fragment>
      ));
    }
  }, [LoadingBrand, brands?.data, successbrands]);
  // selct brand
  // handleCategoryChange
  const handleBrandChange = useCallback(
    (e) => {
    
      const value=e.target.value
      setfilterDrands(`&brand=${e.target.value}`);

      // العثور على العلامة التجارية التي تطابق القيمة المحددة
      const selectedBrand = brands.data.find(
        (brand) => brand._id === value
      );
      setSelectedBrand(selectedBrand ? selectedBrand.name : "");
    },
    [brands?.data]
  );
    // view categories select loadingcategories
    const showCategorie = useMemo(() => {
      if (loadingcategories ) {
        return <option value=""> جاري جلب البيانات</option>;
      }
      if (isSuccess && categories?.data?.length === 0) {
        return <option value="">لايوجد بيانات</option>;
      }
  
      if (isSuccess && categories?.data?.length > 0) {
        const sortedcategories = [...categories.data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
  
        return sortedcategories.map((category, index) => (
          <Fragment key={index}>
            
          <option  value={category._id}>
            {category?.name}
          </option>
          
       
       </Fragment>
        ));
      }
    }, [categories?.data, isSuccess, loadingcategories]);
  // // handleCategoryChange
  const handleCategoryChange = useCallback(
    (e) => {
   
       const value=e.target.value
      setfilterCategorirs(`&category=${e.target.value}`);

      const selectedcategory = categories?.data.find(
        (cate) => cate._id === value
      );
      setSelectedCategory(selectedcategory ? selectedcategory.name : "");
    },
    [categories?.data]
  );

  // hanle sort products
  const handleSortProducts = useCallback((e) => {
    const selectedValue = e.target.value;
    setsortFilter(selectedValue);
  }, []);

  // handel reset filter
  const resetFilter = () => {
    setfilterCategorirs("");
    setfilterDrands("");
    setSelectedBrand("");
    setSelectedCategory("");
   setsortFilter('')

  };


  // if sucsses and data is not empty  show the categories slide
  const showCategoriesData = useMemo(() => {
    if (isSuccess && categories?.data?.length > 0) {
      return categories?.data?.map((category, index) => (
        <button
          style={{ minWidth: "315px  ",height: "270px"}}
          onClick={() =>
            scrollToSection(section1Ref, `&category=${category._id}`)
          }
          className=" btn d-block m-auto caroselcategory "
          key={index}
        >
          <div
            // style={{ height: "275px" }}
            // style={{  width: "305px !important",
            //   height: "275px  !important"}}
            inert="true"
            className=" border w-100 h-100  d-flex flex-column
            align-items-center justify-content-between  m-auto pointer overflow-hidden"
          >
            <img
            loading="lazy"
            decoding="async"
              width={250}
              height={150}
              src={
                category.image
                  ? `${categories?.imageUrl}/${category?.image}`
                  : logo
              }
              className=" w-100  h-75 d-sm-block p-1"
              alt="brand" style={{objectFit: 'fill'}}
            />

            <span
              style={{
                // height: "4.8rem",
                backgroundColor: "var(--bgColor)!important",
              }}
              className="fs-5 border h-25 pb-2 w-100  text-center d-flex flex-column"
            >
              <span>{category?.name.split("_")[0]}</span>
              <span>{category?.name.split("_")[1]}</span>
            </span>
          </div>
        </button>
      ));
    }
  }, [categories?.data, categories?.imageUrl, isSuccess, scrollToSection]);

  // show Brands Slide
  const showBrandsSlide = useMemo(() => {
    if (isLoading) {
      return SkeletonProduct;
    }

    if (brands?.data?.length > 0) {
      return brands?.data.map((brand, index) => (
        <button
          style={{ minWidth: "75%" }}
          onClick={() => scrollToSection(section1Ref, `&brand=${brand._id}`)}
          className=" btn d-block m-auto w-100 caroselBrand"
          key={index}
        >
          <div
            style={{ height: "16.5rem" }}
           
            inert="true"
            className=" border pt-1  d-flex flex-column
            align-items-center justify-content-between  m-auto pointer overflow-hidden"
          >
            <img
            loading="lazy"
            decoding="async"
              width={150}
              height={150}
              src={brand.image ? `${brands?.imageUrl}/${brand?.image}` : logo}
              className=" d-block "
              alt="brand"
              style={{objectFit:"fill"}}
              
            />
            <span
              style={{
                height: "4.2rem",
                backgroundColor: "var(--bgColor)!important",
              }}
              className="fs-5 border  p-2  w-100 text-center  d-flex flex-column"
            >
              <span>{brand?.name.split("_")[0]}</span>
              <span>{brand?.name.split("_")[1]}</span>
            </span>
          </div>
        </button>
      ));
    }
  }, [brands?.data, brands?.imageUrl, isLoading, scrollToSection]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1024, min: 700 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 700, min: 420 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 420, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  // slide settings
  const responsivecategory = {
    superLargeDesktop: {
      breakpoint: { max: 1600, min: 1200 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1200, min: 960 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 960, min: 615 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 615, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="container-fluid ">
      {/*animation */}
   

<TextSlide/>


  
 
      
      {/* categories */}
  
        <div className="">
          <p
            style={{ backgroundColor: "var(--bgColor)" }}
            className="p-2 mb-3  fs-3 border border-end-0 border-start-0 text-center"
          >
            
            الاقسام
          </p>
          <Carousel
            responsive={responsivecategory}
            // autoPlay={true}
            // infinite={false}
            // rewind={true}
            // rewindWithAnimation={true}
            transitionDuration={1000}
            // customTransition={"transform 3000ms ease-in-out"}
            // showDots={false}
            arrows={true}
            focusOnSelect={false}
            ssr={true}
            lazyLoad={true} // تحسين الأداء باستخدام التحميل المؤجل
          >
            {showCategoriesData || SkeletonCard}
          </Carousel>
        </div>
     
      {/* brands */}

        <div className="">
          <p
            style={{ backgroundColor: "var(--bgColor)" }}
            className="p-2 mb-3  fs-3 border border-end-0 border-start-0 text-center"
          >
            شركاء النجاح
          </p>
          <Carousel
            responsive={responsive}
            autoPlay={true}
            infinite={false}
            rewind={true}
            rewindWithAnimation={true}
            transitionDuration={1000}
            customTransition={"transform 3000ms ease-in-out"}
            focusOnSelect={false}
            
            ssr={true}
            rtl={true}
            // centerMode={true}
            lazyLoad={true} // تحسين الأداء باستخدام التحميل المؤجل
          >
            {showBrandsSlide || SkeletonCard}
          </Carousel>
        </div>
      

      {/* products */}
      <div className=" my-3">
        <p
          ref={section1Ref}
          style={{ backgroundColor: "var(--bgColor)" }}
          className="w-100 text-center fs-2 border-top py-2"
        >
          المنتجات
        </p>

        <div className=" d-flex justify-content-center flex-column border-top pt-2 gap-2">
          <div className="w-100 flex-wrap align-items-center overflow-hidden p-1 d-flex">
            {/*gategory  */}
            <div className=" p-2">
              <select
                className="form-select py-2"
                disabled={isLoading}
                id="gategory"
                name="gategory"
                aria-label="Default select example"
                onChange={handleCategoryChange}
                value={
                  categories?.data?.find((gategory) => gategory.name === selectedCategory )?._id || ""
                }
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
                className="form-select py-2"
                disabled={isLoading}
                id="brand"
                name="brand"
                aria-label="Default select example"
                onChange={handleBrandChange}
                value={
                  brands?.data?.find((brand) => brand.name === selectedBrand)
                    ?._id || ""
                }
              >
                <option disabled value="">
                  شركاء النجاح
                </option>
                {showbrands}
              </select>
            </div>
            {/* sortFilter */}
            <div className=" p-2">
              <select
                className="form-select py-2"
                disabled={isLoading}
                id="sortFilter"
                name="sortFilter"
                aria-label="Default select example"
                onChange={handleSortProducts}
                value={sortFilter}
              >
                <option disabled value="">
                  فلتره
                </option>
                <option value={"&sort=-updatedAt"}>جديدنا</option>
                <option value={"&sort=-sold"}>ترتيب حسب الاكثر مبيعا</option>
                <option value={"&sort=-ratingsAverage"}>
                  ترتيب حسب الاعلى تقييما
                </option>
                <option value="&sort=price">    ترتيب حسب السعر من الأقل للاعلى</option>
                <option value="&sort=-price">ترتيب حسب السعر من  الأعلى للاقل </option>
                <option value={"&sort=-title"}>
                  ترتيب حسب الاسم من a الى z
                </option>
                <option value={"&sort=title"}>
                  ترتيب حسب الاسم من z الى a
                </option>
              </select>
            </div>

            {/* reset data button */}
            <button
              onClick={resetFilter}
              type="button"
              className="btn btn-outline-danger h-50 mx-2"
            >
               اعادة تعيين
            </button>
          
          </div>

          {/* products data */}
          <div className="row w-100 justify-content-center row-gap-4 gap-2">
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
