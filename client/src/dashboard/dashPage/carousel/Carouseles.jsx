import { useEffect } from "react";
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
import { errorNotify, successNotify } from "../../../utils/Toast";
// icons

import { FilterData } from "../../../utils/filterSearh";

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
  } = useGetDataQuery(`carousel?limit=${limit}&page=${Pagination}`);

  // delete carousel from the database
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();

console.log(errorDelet);




  
console.log(error);

  
  //handel error our  success message 

  useEffect(() => {
    if (!LoadingDelet && SuccessDelet) {
      successNotify("تم الحذف بنجاح");
    }

    if (errorDelet || error) {
      errorNotify("خطأ في الخادم الداخلي");
    }
  }, [ SuccessDelet, LoadingDelet, errorDelet, error]);

  // handel delet one
    const handelDelet = (id) => {
      const delet = confirm("هل انت متاكد بانك تريد حذف هذا العنصر");
      // if (confirm) true delet user from database
      delet && deletOne(`/carousel/${id}`);
    };

  
 

  //// search Carouseles based on the search input  by name,&& sorted (a,b)
  const filtereCategories =FilterData(Carouseles?.data,'name',search)

  // if sucsses and data is not empty  show the Carouseles
  const showData =
    isSuccess &&
    !isLoading &&filtereCategories.length > 0 ?
    filtereCategories.map((carousel, index) => {
      return (
        <tr key={index}>
          <td className="d-none d-sm-table-cell" scope="row">
          <Fade delay={0} direction='right' triggerOnce={true}   >
            {index + 1}
            </Fade>
          </td>
          <td  >
          <Fade delay={0} direction='up' triggerOnce={true}   >
            <span className="">{carousel.name}</span>
            </Fade>
            </td>

          <td className="d-none d-md-table-cell">
          <Fade delay={0} direction='up' triggerOnce={true}   >

            { carousel.carouselImage?<img
              style={{ width: "5rem", height: "5rem", }}
              src={`${Carouseles.imageUrl}/${carousel.carouselImage}`}
              alt="avatar"
            />:'لا يوجد صورة'}
         </Fade> </td>
          <td>
          <Fade delay={0} direction='up' triggerOnce={true}   >

            <Link to={carousel._id} className="btn btn-success">
              تعديل
            </Link>
            </Fade>
          </td>
          <td>
          <Fade delay={0} direction='left' triggerOnce={true}   >

            <button
              disabled={LoadingDelet ? true : false}
                onClick={() => handelDelet(carousel._id)}
              className="btn btn-danger"
            >
              {LoadingDelet ? <span className="spinner-border"></span> : "حذف"}
            </button>
            </Fade>
          </td>
        </tr>
      );
    }): (<tr><td className="text-center p-3 fs-5 text-primary"colSpan={7} scope="row">العنصر المراد البحث عنه غير موجود في هذه الصفحه</td></tr>);

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
        dataLength={filtereCategories?.length}
      />

      {/* data table */}
      <table className="table table-striped  pt-5 mt-3">
        <thead>
          <tr>
            <th              className="d-none  d-sm-table-cell"
              scope="col"
            >
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

      {/*navigation start  */}
      <Navigation
        isLoading={isLoading}
        isSuccess={isSuccess}
        status={Carouseles?.poginationResult || {}}
       
      />
    </div>
  );
};

export default Carouseles
