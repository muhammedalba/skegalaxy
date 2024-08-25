import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useGetDataQuery,
  useDeletOneMutation,
} from "../../../redux/features/api/apiSlice";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// icons
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { MdOutlineCategory } from "react-icons/md";



import Navigation from "../../../components/navigation/Navigation";
import { useSelector } from "react-redux";
import QuantityResults from "../../../components/QuantityResults/QuantityResults";
import { errorNotify, successNotify } from "../../../utils/Toast";
import { Fade } from "react-awesome-reveal";
import { FilterData } from "../../../utils/filterSearh";
import { SkeletonTeble } from "../../../utils/skeleton";

const Products = () => {
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
  } = useGetDataQuery(`products?limit=${limit}&page=${Pagination}&${filter}`);
  console.log(filter);
  console.log(error);
  // get brands from the database
  const {
    data: brands,
    // error: errorbrands,
    isLoading: loadingbrands,
    // isSuccess: successbrands,
  } = useGetDataQuery(`brands`);
  // get brands from the database
  const {
    data: categories,
    // error: errorcategories,
    isLoading: loadingcategories,
    // isSuccess: successcategories,
  } = useGetDataQuery(`categories`);
  // delete products from the database
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();

  // states
  const [sorted, setsorted] = useState(false);

// handle ERROR OUR SUCCESS PRODUCT
  useEffect(() => {
    if (!LoadingDelet && SuccessDelet) {
      successNotify("تم الحذف بنجاح");
    }

    if (errorDelet || error) {
      errorNotify("خطأ في الخادم الداخلي");
    }
  }, [SuccessDelet, LoadingDelet, errorDelet, error]);

  // handel delet one
  const handelDelet = useCallback(
    (id) => {
      // if (confirm) true delet product from database
      if (confirm("هل انت متاكد بانك تريد حذف هذا العنصر")) {
        deletOne(`/products/${id}`);
      }
    },
    [deletOne]
  );

  // handel sort
  const handleSort = useCallback(() => {
    setsorted(!sorted);
  }, [sorted]);

 

  const filteredProducts = FilterData(products?.data,'products',search)?.sort((a, b) => sorted ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)) 

  // if sucsses and data is not empty  show the products
  const showData = useMemo(() => {
    if (isLoading) {
  return SkeletonTeble
    }
    if (isSuccess && filteredProducts.length > 0) {
      return filteredProducts.map((product, index) => (
        <tr  key={index}>
          <td className="d-none d-sm-table-cell" scope="row">
          <Fade delay={0} direction='up' triggerOnce={true}    >

            {index + 1}
            </Fade>
          </td>
          <td>
          <Fade delay={0} direction='up' triggerOnce={true}     >

            {product.title?.slice(0, 20) }
            </Fade>
            </td>
          <td
            style={{ maxWidth: "140px", overflow: "hidden" }}
            className="d-none d-sm-table-cell"
          >
            <Fade delay={0} direction='up' triggerOnce={true}    >

            {product?.category ? product.category?.name : "غير محدد"}
            </Fade>
          </td>
          <td
            style={{ maxWidth: "140px", overflow: "hidden" }}
            className="d-none d-sm-table-cell"
          >
          <Fade delay={0} direction='up' triggerOnce={true}    >

            {product?.brand ? product.brand?.name : "غير محدد"}
            </Fade>
          </td>
          <td className="d-none d-md-table-cell">
          <Fade delay={0} direction='up' triggerOnce={true}    >

          <span>
                    {product?.price?.toFixed(2)}
                    <span className="ps-2 text-success">SAR</span>
                  </span>
            </Fade>
            </td>
          <td className="d-none d-md-table-cell">
          <Fade delay={0} direction='up' triggerOnce={true}    >

            <img
              style={{ width: "100px", height: "80px" }}
              src={`${products.imageUrl}/${product.imageCover}`}
              alt="avatar"
            />
            </Fade>
          </td>
          <td>
          <Fade delay={0} direction='up' triggerOnce={true}    >

            <Link to={!LoadingDelet && product._id} className="btn btn-success">
              {LoadingDelet ? (
                <span className="spinner-border"></span>
              ) : (
                "تعديل"
              )}
            </Link>
            </Fade>
          </td>
          <td>
          <Fade delay={0} direction='up' triggerOnce={true}    >

            <button
              disabled={LoadingDelet}
              onClick={() => handelDelet(product._id)}
              className="btn btn-danger"
            >
              {LoadingDelet ? <span className="spinner-border"></span> : "حذف"}
            </button>
            </Fade>
          </td>
        </tr>
      ));
    }
    return (
      <tr>
        <td
          className="text-center p-3 fs-5 text-primary"
          colSpan={7}
          scope="row"
        >
          لايوجد بيانات
        </td>
      </tr>
    );
  }, [
    isLoading,
    isSuccess,
    filteredProducts,
    products,
    LoadingDelet,
    handelDelet,
  ]);

  // view brands
  const showbrands = useMemo(() => {
    if (loadingbrands && brands?.data?.length ===0) return <option value="">لايوجد معلومات</option>;
    return brands?.data?.map((brand, index) => (
      <option key={index} value={brand._id}>
        {brand.name}
      </option>
    ));
  }, [brands, loadingbrands]);

  // view categories
  const showCategorie = useMemo(() => {
    if (loadingcategories && categories?.data?.length ===0 ) return <option value="">لايوجد بيانات</option>;
    return categories?.data?.map((category, index) => (
      <option key={index} value={category._id}>
        {category.name}
      </option>
    ));
  }, [categories, loadingcategories]);
  // loading styles st

  // loading styles end
  return (
    <div className="w-100 pt-5 px-2">
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
      {/*  create buttun  && length data && limit data */}
      <QuantityResults
      isLoading={isLoading}
        path={"createproduct"}
        isSuccess={isSuccess}
        dataLength={filteredProducts?.length}
      />
      {/* category   brand  and reset data button*/}
      <div className="col-sm-12">
        <div className="row">
          <div className="col-sm-4">
            <label
              className="pt-2  fs-5 d-flex align-items-center gap-2"
              htmlFor="category"
            >
              اختر القسم
              <MdOutlineCategory color="var(--spanColor)" fontSize="1rem" />
            </label>
            <select
              disabled={isLoading}
              className="form-select  py-2"
              onChange={ useCallback((e) => {
                setFilter(`category=${e.target.value}`)
              }, [])}
              id="category"
              value={''}
              aria-label="Default select example"
            >
              <option value='' disabled >  اختر القسم </option>
              {showCategorie}
            </select>
          </div>
          {/* brand */}
          <div className="col-sm-4">
            <label
              className="pt-2  fs-5 d-flex align-items-center gap-2"
              htmlFor="brand"
            >
              <MdOutlineCategory color="var(--spanColor)" fontSize="1rem" />
              اختر الشركه
            </label>
            <select
              className="form-select  py-2"
              disabled={isLoading}
              id="brand"
              name="brand"
              aria-label="Default select example"
              onChange={useCallback((e) => setFilter(`brand=${e.target.value}`), [])}
              value=''        >
              <option disabled value=''> اختر الشركه  </option>
              {showbrands}
            </select>
          </div>
          {/* reset data button */}
          <div className="col-sm-4 d-flex align-items-end justify-center my-2">
            <button
              onClick={() => setFilter("")}
              type="button"
              className="btn btn-primary"
            >
              كل المنتجات
            </button>
          </div>
        </div>
      </div>

      {/* data table */}
      <table className="table table-striped w-100 pt-5 mt-3">
        <thead >
          <tr >
            <th
              onClick={handleSort}
              className="d-none d-sm-table-cell"
              scope="col"
            >
              {sorted ? <TiArrowSortedUp /> : <TiArrowSortedDown />}ترتيب
            </th>
            <th scope="col">الاسم المنتج</th>
            <th className="d-none d-sm-table-cell" scope="col">
              اسم القسم
            </th>
            <th className="d-none d-sm-table-cell" scope="col">
              اسم الشركه
            </th>
            <th className="d-none d-md-table-cell" scope="col">
              السعر
            </th>
            <th className="d-none d-md-table-cell" scope="col">
              صورة المنتج
            </th>
            <th scope="col">عرض</th>
            <th scope="col">الحذف</th>
          </tr>
        </thead>
        <tbody className="">{showData}</tbody>
      </table>

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
