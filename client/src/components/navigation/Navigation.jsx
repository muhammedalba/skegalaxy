import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { PlusAction ,minusAction,currentPage} from "../../redux/features/Slice/NavigationSlice";


// eslint-disable-next-line react-refresh/only-export-components
const Navigation = ({
  isLoading,
  isSuccess,
  status,

  
 
}) => {
const dispatch = useDispatch()
  const handelPlusPagination = () => {
   
   dispatch(PlusAction(+1));
  };
  // prev page
  const minusActions = () => {
    // Pagination >1 && Pagination--
    dispatch(minusAction(+1));
  };

  // prev page
  const handelcurrentPage = (e) => {
    dispatch(currentPage(e));
  };

  // Create page Pagination buttons
  const pages = useCallback(() => {
    return (
      isSuccess &&
      Array.from({ length: status?.numperOfPages }).map((_, index) => (
        <li key={index} className="page-item">
          <span
            style={{
              background: status?.currentPage === index + 1 ? "#cacae2" : "transparent",
              cursor: "pointer",
            }}
            onClick={() => handelcurrentPage(index + 1)}
            className="page-link"
          >
            {isLoading ? <span className="spinner-border"></span> : index + 1}
          </span>
        </li>
      ))
    );
  }, [isSuccess, status?.numperOfPages, status?.currentPage, isLoading]);

  return (
    <div aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {isSuccess && status?.prevPage && (
          <li
            style={{ cursor: "pointer" }}
            onClick={minusActions}
            className="page-item"
          >
            <span className="page-link">السابق</span>
          </li>
        )}

        {status?.numperOfPages > 5 ? (
          <>
            <li className="page-item mx-1">
              <span style={{ background: "#cacae2" }} className="page-link">
                {isLoading ? (
                  <span className="spinner-border"></span>
                ) : (
                  status?.currentPage
                )}
              </span>
            </li>
            <li className="page-item mx-2">
              <span className="page-link">
                {isLoading ? (
                  <span className="spinner-border"></span>
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
            style={{ cursor: "pointer" }}
            onClick={handelPlusPagination}
            className="page-item"
          >
            <span className="page-link">التالي</span>
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
