import { useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";

import { useGetDataQuery } from "../../redux/features/api/apiSlice";
import { errorNotify } from "../../utils/Toast";
import { SkeletonCarousel } from "../../utils/skeleton";
import "./carousel.css";

const Carousel = () => {
  // Get categories from the database
  const {
    data: carouseles,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery("carousel?fields=carouselImage,carouselImageMd");

  useEffect(() => {
    if (error) {
      errorNotify("خطأ في الخادم الداخلي");
    }
  }, [error]);

  // Preload images to improve performance
  useEffect(() => {
    if (isSuccess && carouseles?.data) {
      carouseles.data.forEach((preview) => {
        const img = new Image();
        img.src = `${carouseles?.imageUrl}/${preview?.carouselImage}`;
      });
    }
  }, [isSuccess, carouseles]);

  // Memoize the carousel images to avoid unnecessary re-renders
  const imagesShow = useMemo(() => {
    // Loading and error handling
    if (isLoading) {
      return SkeletonCarousel;
    }

    return (
      isSuccess &&
      carouseles?.data?.map((preview, index) => (
        <div
          key={index}
          className={`carousel-item ${
            index === 0 ? "active" : ""
          } h-100 w-100  `}
          data-bs-interval={`${index * 1500}`}
        >
          <img
            style={{ objectFit: "fill" }}
            decoding="async"
            width={700}
            height={200}
            className="d-sm-none h-100 w-100 "
            src={`${carouseles?.imageUrl}/${preview?.carouselImage}`}
            alt={`Preview ${index}`}
            loading="eager"
          />
          <img
            style={{ objectFit: "fill" }}
            decoding="async"
            width={1024}
            className="d-none d-sm-block h-100  w-100 "
            src={`${carouseles?.imageUrl}/${preview?.carouselImageMd}`}
            alt={`Preview ${index}`}
            loading="eager"
          />
        </div>
      ))
    );
  }, [isLoading, isSuccess, carouseles?.data, carouseles?.imageUrl]);

  return (
    <div className="container-fluid carouseles">
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

      <div id="carousel" className="my-2 w-100 " style={{ height: "45vh" }}>
        {/* Carousel */}

        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade m-auto mt-2 w-100  h-100"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner h-100 w-100">{imagesShow}</div>
          <div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
