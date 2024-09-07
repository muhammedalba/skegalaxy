const arry = [1, 2, 3, 4, 5, 6, 7];

export const SkeletonCard = arry.map((index) => {
  return (
    <div
      key={index}
      className="card m-auto "
      style={{ height: "200px", width: "18rem" }}
    >
      <div className="w-100 " style={{ height: "150px" }}>
        <span className="skeleton-loading  h-100 w-100" />
      </div>
      <div style={{ height: "50px" }} className="card-body">
        <h5 className="card-title h-100 ">
          <span className="skeleton-loading w-50 h-100  col-6" />
        </h5>
      </div>
    </div>
  );
});
export const SkeletonCarousel = (
  <div className="carousel-inner skeleton-loading h-100 w-100"> </div>
);

export const SkeletonTeble = arry.map((index) => {
  return (
    <tr className="w-100" key={index}>
      <td className="d-none d-sm-table-cell" scope="row">
        <h5 className="skeleton-loading "></h5>
      </td>
      <td>
        <span className="skeleton-loading"></span>
      </td>
      <td className="d-none d-sm-table-cell">
        <span className="skeleton-loading"></span>
      </td>
      <td className="d-none d-sm-table-cell">
        <span className="skeleton-loading"></span>
      </td>

      <td className="d-none d-md-table-cell ">
        <span className="skeleton-loading "></span>
      </td>
      <td style={{ width: "50px" }}>
        <a className="btn btn-success  skeleton-loading">
          <span className="">تعديل</span>
        </a>
      </td>
      <td style={{ width: "50px" }}>
        <button className="btn btn-danger skeleton-loading ">
          <span className="">حذف</span>
        </button>
      </td>
    </tr>
  );
});
export const SkeletonProduct = arry.map((index) => {
  return (
    <div key={index} className="card-product ">
      <div className="imgBox pt-1 skeleton-loading h-100 "></div>
    </div>
  );
});
export const SkeletonInfoProduct = (
  <div className="row mt-5 pt-5">
    <div className="col-lg-4 col-md-6 d-xxl-flex ">
      <div style={{ height: "350px", width: "250px" }} className=" m-auto  ">
        <span className="d-sm-block m-auto m-xxl-0 w-100 skeleton-loading h-100"></span>
      </div>

      <ul
        className="list-group mt-2 w-100 skeleton-loading d-xxl-none
             "
      ></ul>
    </div>

    <div className="col-lg-5 col-md-6  ">
      <div className="card-body text-end skeleton-loading h-100 w-75 m-auto"></div>
    </div>
  </div>
);
export const SkeletonCustomerAndAdress = (
  <div className="row m-0 w-100 ">
    <span className="p-3   "> </span>
    <div className=" p-2  col-12 col-sm-6 ">
      <span className="skeleton-loading "></span>
    </div>
    <div className="  p-2  col-12 col-sm-6">
      <span className="skeleton-loading "> </span>
    </div>
    <div className=" p-2  col-12 ">
      <span className="skeleton-loading  "> </span>
    </div>
    <div className=" col-12 col-sm-6">
      <span className=" skeleton-loading "> </span>
    </div>
    {/*address data start  */}
    <div className="py-2  col-12 col-sm-6 ">
      <span className="skeleton-loading "> </span>
    </div>
    <div className=" py-2 text-primary   col-12 col-sm-6">
      <span className="skeleton-loading "> </span>
    </div>
    <div className=" py-2  col-12 col-sm-6">
      <span className="skeleton-loading "> </span>
    </div>
    <div className=" py-2 t  col-12 col-sm-6">
      <span className="skeleton-loading "> </span>
    </div>
    <div className=" py-2   col-12 col-sm-6">
      <span className="skeleton-loading "> </span>
    </div>
    <div className=" py-2   col-12 col-sm-6">
      <span className="skeleton-loading "> </span>
    </div>
    <div className=" py-2  col-12 col-sm-6">
      <span className="skeleton-loading "> </span>
    </div>
  </div>
);
