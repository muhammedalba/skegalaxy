import { useCallback, useEffect, useMemo, useState } from "react";


import { Fade } from "react-awesome-reveal";
import logo from '../../imges/logo.webp'

    
    import { ToastContainer } from "react-toastify";

import { useGetDataQuery } from "../../redux/features/api/apiSlice";
import Navigation from "../../components/navigation/Navigation";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { SkeletonProduct } from "../../utils/skeleton";


import { Link } from "react-router-dom";
import { errorNotify } from "../../utils/Toast";
import { useSelector } from "react-redux";

const AllBrands = () => {

    

      // Get the lookup value from the store
      const limit = useSelector((state) => state.QuantityResult);
      const Pagination = useSelector((state) => state.Pagination);
      const search = useSelector((state) => state.serch);
      // states
      const [sortFilter, setsortFilter] = useState("");

    
      
    
      // get category from the database
      const {
        data: brands,
        error,
        isLoading,
        isSuccess,
      } = useGetDataQuery(`brands?limit=${limit}&page=${Pagination}${sortFilter}&keywords=${search}&fields=name,image`);
      console.log(brands);
    
    
    
    
    
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
    

  const resetFilter =useCallback( () => {

   setsortFilter('')

  },[]);
   



     
    
      // if sucsses and data is not empty  show the brands 
    
        // const showData = useMemo(() => {
        //   if (isSuccess && brands?.data?.length === 0 && search.length > 0) {
        //     return (
        //       <tr>
        //         <td
        //           className="text-center p-3 fs-5 text-primary"
        //           colSpan={7}
        //           scope="row"
        //         >
        //           <Fade delay={0} direction="up" triggerOnce={true}>
        //             العنصر المراد البحث عنه غير موجود
        //           </Fade>
        //         </td>
        //       </tr>
        //     );
        //   }
      
        //   if (isSuccess && brands?.data?.length > 0) {
        //     const filterBrands = [...brands.data]?.sort((a, b) =>
        //       sorted ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
        //     );
      
        //     return filterBrands.map((brand, index) => {
        //       return (
        //         <tr key={index}>
        //           <td className="d-none d-sm-table-cell" scope="row">
        //             <Fade delay={0} direction="up" triggerOnce={true}>
        //               {index + 1}
        //             </Fade>
        //           </td>
        //           <td>
        //             <Fade delay={0} direction="up" triggerOnce={true} cascade>
        //               <span className="">{brand.name.split("_")[0]}</span>
        //               <span>{brand.name.split("_")[1]}</span>
        //             </Fade>
        //           </td>
      
        //           <td className="d-none d-md-table-cell">
        //             <Fade delay={0} direction="up" triggerOnce={true}>
        //               {brand.image ? (
        //                 <img
        //                   style={{ width: "5rem", height: "5rem" }}
        //                   src={`${brands.imageUrl}/${brand.image}`}
        //                   alt="avatar"
        //                 />
        //               ) : (
        //                 "لا يوجد صورة"
        //               )}
        //             </Fade>
        //           </td>
                 
                  
        //         </tr>
        //       );
        //     });
        //   }
        // }, [brands?.data, brands?.imageUrl, isSuccess, search.length, sorted]);


        const showData = useMemo(() => {
          if (isLoading) {
            return (
              <>
                {SkeletonProduct}
                <LoadingPage />
              </>
            );
          }
      
          if (isSuccess && brands?.data?.length > 0) {
            const sortedbrands = [...brands.data];
         
      
            return sortedbrands?.map((product, index) => (
              
              <Link to={`/brand/${product._id}`}
              style={{ width: "300px" }}
              
              className=" btn d-block m-auto "
              key={index}
              >
              <Fade direction="up" triggerOnce={true} cascade>
              <div
                style={{ height: "16.5rem" }}
               
                inert="true"
                className=" border pt-1  d-flex flex-column
                align-items-center justify-content-between  m-auto pointer overflow-hidden"
              >
                <img
                loading="lazy"
                decoding="async"
                  width={200}
                  height={175}
                  src={product.image ? `${brands?.imageUrl}/${product?.image}` : logo}
                  className=" d-block m-auto w-100 p-1"
                  alt="product"
                  style={{objectFit:"fill"}}
                  
                />
               <Fade direction="up" className="w-100" triggerOnce={true} cascade>    
                <span
                  style={{
                    height: "4.2rem",
                    backgroundColor: "var(--bgColor)!important",
                  }}
                  className="fs-5 border  p-2  w-100 text-center  d-flex flex-column"
                >
                  <span>{product?.name.split("_")[0]}</span>
                  <span>{product?.name.split("_")[1]}</span>
                </span>
                </Fade>
              </div>
              </Fade>
            </Link>
            ));
          }
      
          return (
            <div className="text-center w-100 pt-5 fs-5 text-primary">
              لا يوجد منتجات 
            </div>
          );
        }, [isLoading, isSuccess, brands?.data, brands?.imageUrl]);
    
      return (
        <div className="w-100 pt-4 ">
          {/* tosat compunenet */}
          <ToastContainer/>
    
     
    <div className="container">
    <div className=" my-3">
    <Fade direction="up" triggerOnce={true} cascade>
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
        <Fade direction="up" triggerOnce={true}>

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
            <Fade direction="up" triggerOnce={true}>
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
          <div className=" AllBrands row  justify-content-center row-gap-4 gap-2">
            
            {showData}
          </div>
        </div>
      </div>
    </div>
    
     
          {/*navigation start  */}
          <Navigation
            isLoading={isLoading}
            isSuccess={isSuccess}
            status={brands?.poginationResult || {}}
           
          />
        </div>
      );
    };
  
    


export default AllBrands;
