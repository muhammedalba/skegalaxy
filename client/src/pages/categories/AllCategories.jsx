import { useCallback, useEffect, useMemo, useState } from "react"; 
import { useSelector } from "react-redux";
import logo from '../../imges/logo.webp'
import { ToastContainer } from "react-toastify";


import { useGetDataQuery } from "../../redux/features/api/apiSlice";
import Navigation from "../../components/navigation/Navigation";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { SkeletonProduct } from "../../utils/skeleton";

import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { errorNotify } from "../../utils/Toast";
import { Helmet } from "react-helmet-async";

const AllCategories = () => {

    

      // Get the lookup value from the store
      const limit = useSelector((state) => state.QuantityResult);
      const Pagination = useSelector((state) => state.Pagination);
      const search = useSelector((state) => state.serch);
      // states
 
      const [sortFilter, setsortFilter] = useState("");
  
    
      
    
      // get category from the database
      const {
        data: categories,
        error,
        isLoading,
        isSuccess,
      } = useGetDataQuery(`categories?limit=${limit}&page=${Pagination}${sortFilter}&keywords=${search}&fields=name,image`);
    
    
    
    
      useEffect(() => {
        if(error){
          errorNotify('حدثت مشكلة في الخادم')
        }
        
          }, [error]);
      
    
      
  // hanle sort products
  const handleSortProducts = useCallback((e) => {
    const selectedValue = e.target.value;
    setsortFilter(selectedValue);
  }, []);
    
     // handel reset filter
  const resetFilter = useCallback(() => {

   setsortFilter('')

  },[]);
   




        const showData = useMemo(() => {
          if (isLoading) {
            return (
              <>
                {SkeletonProduct}
                <LoadingPage />
              </>
            );
          }
      
          if (isSuccess && categories?.data?.length > 0) {
            const sortedcategories = [...categories.data];
         
      
            return sortedcategories?.map((product, index) => (
              <Link to={`/category/${product._id}`}
              style={{ width: "300px" }}
            
              className=" btn d-block m-auto "
              key={index}
            >
                  <Fade direction="up" triggerOnce={true} cascade>

              <div
                style={{ height: "17.2rem" }}
               
                inert="true"
                className=" border pt-1  d-flex flex-column
                align-items-center justify-content-between  m-auto pointer overflow-hidden"
              >
                <img
                loading="lazy"
                decoding="async"
                  width={200}
                  height={200}
                  src={product.image ? `${categories?.imageUrl}/${product?.image}` : logo}
                  className=" d-block w-100 m-auto p-1"
                  alt="product"
                  style={{objectFit:"fill"}}
                  
                />
                   <Fade className="w-100" direction="up" triggerOnce={true} cascade>
                <span
                  style={{
                    height: "4.2rem",
                    backgroundColor: "var(--bgColor)!important",
                  }}
                  className="fs-5 border  p-2  w-100 text-center  d-flex flex-column"
                >
                  <span>{product?.name.split("_")[0]}</span>
                  <span>{product?.name.split("_")[1]}</span>
                </span></Fade>
              </div>
          </Fade>  </Link>
            ));
          }
      
          return (
            <div className="text-center w-100 pt-5 fs-5 text-primary">
              لا يوجد بيانات
            </div>
          );
        }, [isLoading, isSuccess, categories?.data, categories?.imageUrl]);
    
      return (<>
<Helmet>
        <meta name="description"
            content="Sky Galaxy || مجرة السماء للتجارة يتوفر لدينا جميع انواع العوازل  (المائية - الحرارية - مواد حقن وإصلاح الخرسانة - فوم بوليرثان) " />
        <meta name="keywords" content="   العوازل المائية , العوازل الحرارية , مواد حقن وإصلاح الخرسانة , فوم بوليرثان" />
        <title>Sky Galaxy | أفضل المواد للبناء والعزل وإصلاح الخرسانات | مجرة السماء للتجارة الالكترونيه </title>
</Helmet>

        <div className="w-100 pt-4 ">
          {/* tosat compunenet */}
          <ToastContainer/>
    
     
    <div className="container">
    <div className=" my-3">
    <Fade direction="up" triggerOnce={true} >

        <p
          // ref={section1Ref}
          style={{ backgroundColor: "var(--bgColor)" }}
          className="w-100 text-center fs-2 border-top py-2"
        >
          الاقسام
        </p>
</Fade>
        <div className=" d-flex justify-content-center flex-column border-top pt-2 gap-2">
          {/* filtter start */}
          <div className="w-100 flex-wrap align-items-center overflow-hidden p-1 d-flex">
          
        
      
            {/* sortFilter */}
            <Fade direction="up" triggerOnce={true} >

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
                  تصفيه
                </option>
                <option value={"&sort=-updatedAt"}>جديدنا</option>
                <option value={"&sort=-name"}>
                  ترتيب حسب الاسم من a الى z
                </option>
                <option value={"&sort=name"}>
                  ترتيب حسب الاسم من z الى a
                </option>
              </select>
            </div>
</Fade>
            {/* reset data button */}
            <Fade direction="up" triggerOnce={true} >

            <button
              onClick={resetFilter}
              type="button"
              className="btn btn-outline-danger h-50 mx-2"
            >
               اعادة تعيين
            </button>
          </Fade>
          </div>

          {/* products data */}
          <div className=" AllCategories row  justify-content-center row-gap-4 gap-2">
            {showData}
          </div>
        </div>
      </div>
    </div>
    
     
          {/*navigation start  */}
          <Navigation
            isLoading={isLoading}
            isSuccess={isSuccess}
            status={categories?.poginationResult || {}}
           
          />
        </div>
     </> );
    };
  
    


export default AllCategories;
