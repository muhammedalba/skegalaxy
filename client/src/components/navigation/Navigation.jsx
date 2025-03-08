import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { PlusAction ,minusAction,currentPage} from "../../redux/features/Slice/NavigationSlice";

// icon
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
// eslint-disable-next-line react-refresh/only-export-components
const Navigation = ({
  isLoading,
  isSuccess,
  status,

  
 
}) => {
const dispatch = useDispatch()

 

  const handelPlusPagination = useCallback(() => {
    dispatch(PlusAction(+1));

  },[dispatch]);
  // prev page

  const minusActions = useCallback(() => {
    dispatch(minusAction(+1));
  },[dispatch]);

  // prev page
  const handelcurrentPage = useCallback((e) => {
    dispatch(currentPage(e));
  },[dispatch]);

  // Create page Pagination buttons
  const pages = useCallback(() => {
    return (
      isSuccess &&
      Array.from({ length: status?.numperOfPages }).map((_, index) => (
        <li key={index} className="page-item">
          <span
            style={{
              background: status?.currentPage === index + 1 ? "var(--bgColor)" : "transparent",
             color:'var(--btn-bg-color)!important' 
            }}
            onClick={() => handelcurrentPage(index + 1)}
            className="page-link pointer border-0"
          >
            {isLoading ? <span className="spinner-border"></span> : index + 1}
          </span>
        </li>
      ))
    );
  }, [isSuccess, status?.numperOfPages, status?.currentPage, isLoading, handelcurrentPage]);

  return (
    <div aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {isSuccess && status?.prevPage && (
          <li
           
            onClick={minusActions}
            className="page-item"
          >
            <span className="page-link pointer border-0">
              <MdOutlineNavigateNext fontSize={'1.3rem'} />
              <MdOutlineNavigateNext fontSize={'1.3rem'} />
            </span>
          </li>
        )}

        {status?.numperOfPages > 5 ? (
          <>
            <li className="page-item mx-1" 
>
              
              <span 
              style={{ background: "var(--bgColor) !important",color:'var(--btn-bg-color)!important' }} 
              
              className="page-link border-0"
              >
                {isLoading ? (
                  <span className="spinner-border"></span>
                ) : (
                  status?.currentPage
                )}
              </span>
            </li>
            <li className="page-item mx-2 " >
              <span className="page-link border-0 ">
                {isLoading ? (
                  <span  className="spinner-border"></span>
                ) : (
                  `عدد الصفحات (${status?.numperOfPages})`
                )}
              </span>
            </li>
          </>
        ) : (
          pages()
        )}

        {isSuccess && status?.nextPage && (
          <li
           
            onClick={handelPlusPagination}
            className="page-item"
          >
            <span className="page-link pointer border-0">
              <MdOutlineNavigateBefore fontSize={'1.3rem'} />
              <MdOutlineNavigateBefore fontSize={'1.3rem'} />
              </span>
          </li>
        )}
      </ul>
    </div>
  );
};

Navigation.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  status: PropTypes.shape({
    numperOfPages: PropTypes.number,
    currentPage: PropTypes.number,
    prevPage: PropTypes.number,
    nextPage: PropTypes.number,
  }).isRequired,
 
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Navigation);
