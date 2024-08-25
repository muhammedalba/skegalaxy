import { useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { Fade } from "react-awesome-reveal";
import { useGetDataQuery } from "../../redux/features/api/apiSlice";
import { errorNotify } from "../../utils/Toast";
import './categories.css';



const Carousel = () => {
  // Get categories from the database
  const { data: carouseles, error, isLoading, isSuccess } = useGetDataQuery('carousel');

  useEffect(() => {
    if (error) {
      errorNotify("خطأ في الخادم الداخلي");
    }
  }, [error]);

  // Preload images to improve performance
  useEffect(() => {
    if (isSuccess && carouseles?.data) {
      carouseles.data.forEach(preview => {
        const img = new Image();
        img.src = `${carouseles?.imageUrl}/${preview?.carouselImage}`;
      });
    }
  }, [isSuccess, carouseles]);



  // Memoize the carousel images to avoid unnecessary re-renders
  const imagesShow = useMemo(() => {

  // Loading and error handling
  if (isLoading) {
    return 
  }

    return isSuccess && carouseles?.data?.map((preview, index) => (
      <div
        key={index}
        className={`carousel-item ${index === 0 ? "active" : ""} h-100 w-100 rounded`}
        data-bs-interval={`${index * 500}`}
      >
        <img
          className="d-block h-100 rounded w-100"
          src={`${carouseles?.imageUrl}/${preview?.carouselImage}`}
          alt={`Preview${index}`}
          loading="lazy" // Lazy load carouselImages
        />
      </div>
    ));
  }, [isLoading, isSuccess, carouseles?.data, carouseles?.imageUrl]);

  return (
    <div className="w-100 pt-3 carouseles">
      {/* Toast Container */}
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

      <div className="my-2">
        {/* Carousel */}
        <Fade delay={0} direction='up' triggerOnce={true} cascade>
          <div
            style={{ width: "100%", height: "45vh" }}
            id="carouselExampleInterval"
            className="carousel slide m-auto mt-4"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner h-100 w-100">
              {imagesShow}
            </div>
            <button
              className="carousel-control-prev h-100"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next h-100"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Carousel;
