import { useCallback, useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useSelector } from "react-redux";

import { useGetDataQuery } from "../../redux/features/api/apiSlice";

import Card from "../../components/card/Card";
import { SkeletonProduct } from "../../utils/skeleton";
import { Fade } from "react-awesome-reveal";
import { errorNotify } from "../../utils/Toast";

const ProductsCategory = () => {
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);

  const [sortFilter, setsortFilter] = useState("");
  // Bring the product
  const { CategoryId } = useParams();
  //

  // get category from the database
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(
    `products?category=${CategoryId}${sortFilter}&keywords=${search}&fields=price,title,imageCover,priceAfterDiscount,quantity,ratingsAverage`
  );

  //handel error our  success message

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
  const resetFilter = () => {
    setsortFilter("");
  };

  // if sucsses and data is not empty  show the products
  const showData = useMemo(() => {
    if (isLoading) {
      return <>{SkeletonProduct}</>;
    }

    if (isSuccess && products?.data?.length > 0) {
      const sortedproducts = [...products.data];

      return sortedproducts?.map((product, index) => (
        <Fade key={index}direction="up" triggerOnce={true} className="m-auto">

        <Card  product={product} imgePath={products?.imageUrl} /></Fade>
      ));
    }

    return (
      <div className="text-center w-100 pt-5 fs-5 text-primary">
        لا يوجد منتجات
      </div>
    );
  }, [isLoading, isSuccess, products?.data, products?.imageUrl]);

  return (
    <div className="w-100 pt-5 position-relative ">
      {/* tosat compunenet */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container pt-4">
      <Fade direction="up" triggerOnce={true}>
        <p
          style={{ backgroundColor: "var(--bgColor)" }}
          className="p-2 mb-3 w-100 d-block  fs-4 border border-end-0 border-start-0 text-center"
        >
          المنتجات الخاصة بالفئة المطلوبة
        </p></Fade>
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
              <option value={"&sort=-sold"}>ترتيب حسب الاكثر مبيعا</option>
              <option value={"&sort=-ratingsAverage"}>
                ترتيب حسب الاعلى تقييما
              </option>
              <option value="&sort=price">
                {" "}
                ترتيب حسب السعر من الأقل للاعلى
              </option>
              <option value="&sort=-price">
                ترتيب حسب السعر من الأعلى للاقل{" "}
              </option>
              <option value={"&sort=-title"}>ترتيب حسب الاسم من a الى z</option>
              <option value={"&sort=title"}>ترتيب حسب الاسم من z الى a</option>
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
        <div className="w-100 d-flex row-gap-3 mt-3  gap-2 flex-wrap align-items-center justify-content-between">
          {/*product card */}
          {showData}
        </div>
      </div>
    </div>
  );
};

export default ProductsCategory;
