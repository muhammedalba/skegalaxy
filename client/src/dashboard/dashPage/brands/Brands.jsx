import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useGetDataQuery,
  useDeletOneMutation,
} from "../../../redux/features/api/apiSlice";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

import Navigation from "../../../components/navigation/Navigation";
import { useSelector } from "react-redux";
import QuantityResults from "../../../components/QuantityResults/QuantityResults";
import { errorNotify, successNotify, warnNotify } from "../../../utils/Toast";
import { Fade } from "react-awesome-reveal";
import { SkeletonTeble } from "../../../utils/skeleton";
import DeleteModal from "../../../components/deletModal/DeleteModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const Brands = () => {
  // Get the lookup value from the store
  const limit = useSelector((state) => state.QuantityResult);
  const Pagination = useSelector((state) => state.Pagination);
  const search = useSelector((state) => state.serch);


  // get brands from the database
  const {
    data: brands,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(
    `brands?limit=${limit}&page=${Pagination}&keywords=${search}`
  );
  console.log(brands?.data);
  // delete brands from the database
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();

  // states
  const [sorted, setsorted] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (error?.status === 401) {
      warnNotify("انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا");
    }
  }, [error?.status]);
  //handel error our  success message

  useEffect(() => {
    if (!LoadingDelet && SuccessDelet) {
      successNotify("تم الحذف بنجاح");
    }

    if (errorDelet || error) {
      errorNotify("خطأ في الخادم الداخلي");
    }
  }, [SuccessDelet, LoadingDelet, errorDelet, error]);




  // handel open modale and seve item id in selectedBrandId
  const openModal = useCallback((id) => {
  
      setSelectedBrandId(id);
      setShowModal(true); // فتح الـ modal
    
  },[])
  // delet item from database
  const handleDelete =useCallback((id) => {

    if(id){
      deletOne(`/brands/${id}`);
      setShowModal(false); // إغلاق الـ modal بعد الحذف

    }
  }
  ,[deletOne]);


  // handel sort
  const handleSort =useCallback( () => {
    
    setsorted(!sorted);
   
  },[sorted]);

  const showData = useMemo(() => {
    if (isSuccess && brands?.data?.length === 0 && search.length > 0) {
      return (
        <tr>
          <td
            className="text-center p-3 fs-5 text-primary"
            colSpan={7}
            scope="row"
          >
            <Fade delay={0} direction="up" triggerOnce={true}>
              العنصر المراد البحث عنه غير موجود
            </Fade>
          </td>
        </tr>
      );
    }

    if (isSuccess && brands?.data?.length > 0) {
      const filterBrands = [...brands.data]?.sort((a, b) =>
        sorted ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
      );

      return filterBrands.map((brand, index) => {
        return (
          <tr key={index}>
            <td className="d-none d-sm-table-cell" scope="row">
              <Fade delay={0} direction="up" triggerOnce={true}>
                {index + 1}
              </Fade>
            </td>
            <td>
              <Fade delay={0} direction="up" triggerOnce={true} cascade>
                <span className="">{brand.name.split("_")[0]}</span>
                <span>{brand.name.split("_")[1]}</span>
              </Fade>
            </td>

            <td className="d-none d-md-table-cell">
              <Fade delay={0} direction="up" triggerOnce={true}>
                {brand.image ? (
                  <img
                    style={{ width: "5rem", height: "5rem" }}
                    src={`${brands.imageUrl}/${brand.image}`}
                    alt="avatar"
                  />
                ) : (
                  "لا يوجد صورة"
                )}
              </Fade>
            </td>
            <td>
              <Fade delay={0} direction="up" triggerOnce={true}>
                <Link
                  to={!LoadingDelet && brand._id}
                  className="btn btn-outline-primary"
                >
                   <CiEdit   />  
                </Link>
              </Fade>
            </td>
            <td>
              <Fade delay={0} direction="up" triggerOnce={true}>
  
                  <button
            disabled={LoadingDelet ? true : false}
            type="button"
            className="btn btn-outline-danger "
            onClick={() => openModal(brand._id)}
          >
         <RiDeleteBin6Line/>
          </button>
              </Fade>
            </td>
          </tr>
        );
      });
    }
  }, [LoadingDelet, brands?.data, brands?.imageUrl, isSuccess, openModal, search.length, sorted]);
  

  return (
    <div className="w-100 pt-5 ">
      {/* tosat compunenet start*/}
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
      {/* tosat compunenet end*/}
      {/*  create buttun  && length data && limit data */}
      <QuantityResults
        isSuccess={isSuccess}
        isLoading={isLoading}
        dataLength={brands?.data?.length}
        path={"createbrand"}
      />
      {/* data table start*/}
      <table className="table table-striped  pt-5 mt-3">
        <thead>
          <tr>
            <th
              onClick={handleSort}
              className="d-none  d-sm-table-cell"
              scope="col"
            >
              {sorted ? <TiArrowSortedUp /> : <TiArrowSortedDown />}ترتيب
            </th>
            <th scope="col">الاسم </th>
            <th className="d-none d-md-table-cell" scope="col">
              الصورة
            </th>
            <th scope="col">عرض</th>
            <th scope="col">الحذف</th>
          </tr>
        </thead>
        <tbody className="">{isLoading ? SkeletonTeble : showData}</tbody>
      </table>
      {/* data table end*/}



  {/*Modal */}
  <DeleteModal
        show={showModal}
        onClose={useCallback(() =>{ setShowModal(false)},[])}
        onDelete={handleDelete}
        itemId={selectedBrandId}
      />

      {/*navigation start  */}
      <Navigation
        isLoading={isLoading}
        isSuccess={isSuccess}
        status={brands?.poginationResult || {}}
      />
      {/*navigation end  */}


    </div>
  );
};

export default Brands;
