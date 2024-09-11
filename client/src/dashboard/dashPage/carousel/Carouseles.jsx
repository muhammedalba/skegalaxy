import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useGetDataQuery,
  useDeletOneMutation,
} from "../../../redux/features/api/apiSlice";

import { useSelector } from "react-redux";
import { Fade } from "react-awesome-reveal";
import { SkeletonTeble } from "../../../utils/skeleton";

import { Link } from "react-router-dom";
import Navigation from "../../../components/navigation/Navigation";
import QuantityResults from "../../../components/QuantityResults/QuantityResults";

import { ToastContainer } from "react-toastify";
import { errorNotify, successNotify, warnNotify } from "../../../utils/Toast";
// icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import DeleteModal from "../../../components/deletModal/DeleteModal";

const Carouseles = () => {
  // Get the lookup value from the store
  const limit = useSelector((state) => state.QuantityResult);
  const Pagination = useSelector((state) => state.Pagination);
  const search = useSelector((state) => state.serch);

  // get carousel from the database
  const {
    data: Carouseles,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(
    `carousel?limit=${limit}&page=${Pagination}&keywords=${search}`
  );

  // delete carousel from the database
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();

 console.log(Carouseles?.data);
 

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
  }, []);
  // delet item from database
  const handleDelete = useCallback(
    (id) => {
      if (id) {
        deletOne(`/carousel/${id}`);
        setShowModal(false); // إغلاق الـ modal بعد الحذف
      }
    },
    [deletOne]
  );

  const showData = useMemo(() => {
    if (isSuccess && Carouseles?.data?.length === 0 && search.length > 0) {
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

    if (isSuccess && Carouseles?.data?.length > 0) {
      const filterCarouseles = [...Carouseles.data];
      return filterCarouseles.map((carousel, index) => {
        return (
          <tr key={index}>
            <td className="d-none d-sm-table-cell" scope="row">
              <Fade delay={0} direction="right" triggerOnce={true}>
                {index + 1}
              </Fade>
            </td>
            <td>
              <Fade delay={0} direction="up" triggerOnce={true}>
                <span className="">{carousel.name}</span>
              </Fade>
            </td>

            <td className="d-none d-md-table-cell">
              <Fade delay={0} direction="up" triggerOnce={true}>
                {carousel.carouselImage ? (
                  <img
                    style={{ width: "5rem", height: "5rem" }}
                    src={`${Carouseles.imageUrl}/${carousel.carouselImage}`}
                    alt="avatar"
                  />
                ) : (
                  "لا يوجد صورة"
                )}
              </Fade>{" "}
            </td>
            <td>
              <Fade delay={0} direction="up" triggerOnce={true}>
                <Link to={carousel?._id} className="btn btn-outline-primary">
                  <CiEdit />
                </Link>
              </Fade>
            </td>
            <td>
              <Fade delay={0} direction="up" triggerOnce={true}>
                <button
                  disabled={LoadingDelet ? true : false}
                  onClick={() => openModal(carousel?._id)}
                  className="btn btn-outline-danger"
                >
                  <RiDeleteBin6Line />
                </button>
              </Fade>
            </td>
          </tr>
        );
      });
    }
  }, [
    LoadingDelet,
    Carouseles?.data,
    Carouseles?.imageUrl,
    isSuccess,
    openModal,
    search.length,
  ]);

  return (
    <div className="w-100 pt-5 ">
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
        isSuccess={isSuccess}
        isLoading={isLoading}
        path={"createcarousel"}
        dataLength={Carouseles?.data?.length}
      />

      {/* data table */}
      <table className="table table-striped  pt-5 mt-3">
        <thead>
          <tr>
            <th className="d-none  d-sm-table-cell" scope="col">
              ترتيب
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
      {/*Modal */}
      <DeleteModal
        show={showModal}
        onClose={useCallback(() => {
          setShowModal(false);
        }, [])}
        onDelete={handleDelete}
        itemId={selectedBrandId}
      />

      {/*navigation start  */}
      <Navigation
        isLoading={isLoading}
        isSuccess={isSuccess}
        status={Carouseles?.poginationResult || {}}
      />
    </div>
  );
};

export default Carouseles;
