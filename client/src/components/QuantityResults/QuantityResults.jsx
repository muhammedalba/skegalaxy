import { Link } from "react-router-dom";
import { RiAddCircleLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {  Results } from "../../redux/features/Slice/QuantityResultSlice";

import { infoNotify } from "../../utils/Toast";



const QuantityResults = ({

  path,
  isSuccess,
  dataLength,
  isLoading,
  dBtn=true ,
}) => {
  const dispatch= useDispatch();


const limit = useSelector((state) => state.QuantityResult) || 15;

  
  /* heade create buttun  && length data && limit data */




 // The number of items to be displayed
 const handelLimetData = (limitData) => {
  console.log(limitData.target.value);
  
   if (limitData.target.value > 0 && limitData.target.value <= 50) {
    
     dispatch(Results(limitData.target.value));
   } else {
     infoNotify("   يجب ان تكون القيمه اقل من 50 واكبر من 0");
   }
 };


  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between px-2 border-bottom pb-2 my-2">
{ dBtn &&    <button
        disabled={!isSuccess}
        className={
          !isLoading
            ? " btn btn-primary d-flex flex-wrap align-items-center gap-2 "
            : " btn btn-primary d-flex flex-wrap align-items-center gap-2 skeleton-loading w-auto"
        }
      >
        <RiAddCircleLine />
        <Link to={isSuccess && path} className="text-white">
          اضف عنصر
        </Link>
      </button>}

      <div className="w-25 d-none d-sm-flex aligm-items-center  py-2">
        <label
          className="p-1 fs-5 d-flex align-items-center gap-1 text-nowrap"
          htmlFor="image"
        >  اختر عدد النتايج :
        </label>
        <select
                    required
                    id="category"
                    name="category"
                    onChange={handelLimetData}
                    className="form-select  py-2"
                    value={+limit}
                    aria-label="Default select example"
                  >
                
                    <option disabled > </option>
                    <option value="15"> 15</option>
                    <option value="5"> 5</option>
                    <option value="10"> 10</option>
                    <option  value="20"> 20</option>
                    <option value="50"> 50</option>
                  </select>
      
      </div>
      {/*  */}
      {!isLoading ? (
        <span className="fs-3 ">عدد النتايج ({dataLength})</span>
      ) : (
        <span className="  d-flex align-items-center skeleton-loading fs-3 w-auto p-3">
          عدد النتايج{" "}
        </span>
      )}
    </div>
  );
};


QuantityResults.propTypes = {
  path: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dBtn: PropTypes.bool,
  dataLength: PropTypes.number,

};
export default QuantityResults;
