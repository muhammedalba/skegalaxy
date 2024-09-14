import { useParams } from "react-router";
import {
  useCreateOneMutation,
  useGetOneQuery,
} from "../../redux/features/api/apiSlice";
import Rating from "../../components/Rating/Rating";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SkeletonInfoProduct } from "../../utils/skeleton";
import { Fade } from "react-awesome-reveal";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { cartitems } from "../../redux/features/Slice/CartSlice";
import { errorNotify, successNotify, warnNotify } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";

import "react-multi-carousel/lib/styles.css";
import Card from "../../components/card/Card";
import { SlSocialInstagram } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { MdAddShoppingCart } from "react-icons/md";
import { RiDownloadCloud2Line } from "react-icons/ri";

import {
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";




const InfoProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
 

  // Fetch product data
  const {
    data: product,
    error,
    isLoading,
    isSuccess,
  } = useGetOneQuery(`products/${productId}?&fields=price,title,imageCover,priceAfterDiscount,quantity,ratingsAverage,description`);

  // Fetch category data for related products
  const { isSuccess: categorySuccess, data: categoryData } = useGetOneQuery(
    `products?category=${product?.data?.category?._id}`,
    { skip: !product?.data?.category?._id }
  );

  // Create one mutation (add to cart)
  const [
    createOne,
    { error: createError, isLoading: createLoading, data: createData },
  ] = useCreateOneMutation();

  // Update the product image on hover
  const handleMouseEnter = useCallback((src) => {
    setSelectedImage(src);
  }, []);
  console.log(product);

  //   sare
  const shareUrl = window.location.href;    
  const title = "شركه مجرة السماء للتجارة ";   

  // Reset product image
  const resetProductImage = useCallback(() => {
    setSelectedImage("");
  }, []);
console.log(createData?.status);

const scrollToTop = useCallback(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [])

  useEffect(() => {
    document
      .querySelectorAll(
        ".react-multi-carousel-track .react-multi-carousel-item--active"
      )
      .forEach((element) => {
        element.addEventListener("click", () => scrollToTop);
      });
    
    if (createData?.status === 201) {
      // Update the number of items in the shopping cart
      dispatch(cartitems(createData?.resnumOfCartItems));
      successNotify("تم إضافة المنتج بنجاح");
    }
    if ( createData?.status ==='success') {
      // Update the number of items in the shopping cart
 
      successNotify("تم إضافة المنتج بنجاح");
    }
    if (error) {
      warnNotify("خطأ في التحقق من المنتج");
    }

    if (createError?.status === 401) {
      warnNotify("يجب عليك تسجيل دخول ");
    }
    return   
  }, [createData?.resnumOfCartItems, createData?.status, dispatch, error, createError?.status, resetProductImage, scrollToTop]);
// add to cart our wish list
const addproducToCartOurWishlist = useCallback((productId,route) => {
 
    
  // تحقق من أن المستخدم مسجل الدخول وأن معرف المنتج صالح
  if (token && typeof(productId) !== "undefined"
  // && !displed
) {
    
    
    createOne({
      url: `${route}`,
      method: "POST",
      body: { productId },
    })
    // setdispled(true)
  } else {
    warnNotify("يجب عليك تسجيل دخول اولا");
   
  }
}, [createOne, token]);
 

  // Download PDF handler
  const downloadPdf =useCallback( async () => {
    const baseUrl = import.meta.env.VITE_API;

    try {
      const response = await fetch(
        `${baseUrl}/products/${productId}?download=pdf`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
          credentials: 'include',
        }
      );

      // تحقق من حالة الاستجابة
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // تحقق من نوع المحتوى
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("pdf")) {
        // أنشئ رابط لتحميل الـ PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "document.pdf"); // اسم الملف الذي سيتم تنزيله
        document.body.appendChild(link);
        link.click();
        link.remove();
        successNotify("تم تنزيل الملف بنجاح");
      } else {
        console.error("Error: Response is not a PDF file");
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
      errorNotify("حثة مشكلة اثناء تنزيل الملف");
    }
  },[productId]);

  // Generate product image list
  const imageList = useMemo(() => {
    if (isSuccess) {
      return product?.data?.images.map((img, i) => (
        <li
          key={i}
          onMouseEnter={() => handleMouseEnter(`${product?.imageUrl}/${img}`)}
          className="list-group-item p-2 pointer"
          style={{ height: "5rem" }}
        >
          <img
            src={`${product?.imageUrl}/${img}`}
            alt={`Product image ${i + 1}`}
            className="d-block h-100 rounded w-100"
          />
        </li>
      ));
    }
    return null;
  }, [product?.data?.images, product?.imageUrl, isSuccess, handleMouseEnter]);

  // Generate product details section
  const productDetails = useMemo(() => {
    if (isSuccess) {
      const showDownloadBtn = product?.data?.infoProductPdf
        ? "d-block"
        : "d-none";
      const showQuantity =
        product?.data?.quantity <= 100 && product?.data?.quantity > 0
          ? "d-block"
          : "d-none";
      const showQuantityMsg =
        product?.data?.quantity <= 0 ? "d-block" : "d-none";
      const description = product?.data?.description?.split("_") || [];

      return (
        <section  className="container  my-5 pt-5 px-3">
          <div className="row ">
            {/*product  imges */}
            <div className="col-lg-4 col-md-6 d-xl-flex gap-2">
              <ul
                className="list-group gap-2 d-none d-xl-flex   
                    justify-content-start  "
              >
                <Fade delay={0} direction="up" triggerOnce={true}>
                  <li
                    className="list-group-item  w-100  col-md-4 pointer"
                    style={{ height: "4.5rem" }}
                  >
                    <img
                       loading="lazy"
                       decoding="async"
                     width={250} 
                      className="d-block h-100 rounded w-100 "
                      src={`${product?.imageUrl}/${product?.data?.imageCover}`}
                      alt="productImge"
                      onMouseEnter={() =>
                        handleMouseEnter(
                          `   ${product?.imageUrl}/${product?.data.imageCover}`
                        )
                      }
                    />
                  </li>
                  {isSuccess && imageList}
                </Fade>
              </ul>

              {/* img caver */}
              <Fade delay={0} direction="up" triggerOnce={true} cascade>
                <div
                  style={{ height: "22rem", width: "15.5rem" }}
                  className="border m-auto  "
                >
                  <img
                    style={{ height: "calc(100% - 2.5rem)" }}
                    src={
                      selectedImage ||
                      ` ${product?.imageUrl}/${product?.data?.imageCover}`
                    }
                    className="d-sm-block m-auto m-xxl-0 w-100 rounded"
                    alt="product"
                  />

                  <Rating ratingsAverage={product?.data?.ratingsAverage || 3} />
                  <div className="d-none d-xl-flex align-items-center justify-content-center gap-3 pt-5 mt-5 mt-xl-2 pt-xl-2 ">
                  {/* زر المشاركة على Twitter */}
                  <TwitterShareButton url={shareUrl} title={title}>
                    <TwitterIcon size={28} round={true} />
                  </TwitterShareButton>

                  {/* زر المشاركة على WhatsApp */}
                  <WhatsappShareButton url={shareUrl} title={title}>
                    <WhatsappIcon size={28} round={true} />
                  </WhatsappShareButton>

                  {/* زر المشاركة على Telegram */}
                  <TelegramShareButton url={shareUrl} title={title}>
                    <TelegramIcon size={28} round={true} />
                  </TelegramShareButton>

                  {/* زر نسخ الرابط للمشاركة على Instagram (مشاركة يدوية) */}
                  <span
                    // style={{ backgroundColor: "#df0073", padding: "0.4rem" }}
                    className="border rounded-circle border-1 pointer"
                  >
                    <SlSocialInstagram
                      color="#df0073"
                      fontSize={"1.5rem"}
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        successNotify(
                          "تم نسخ الرابط! يمكنك الآن لصقه في Instagram"
                        );
                      }}
                    />
                  </span>
                  </div>
                </div>
              </Fade>
              
              {/* alt emges */}
              <ul
                className="list-group mt-2 w-100 d-flex align-items-center d-xl-none
                         flex-row  gap-2  flex-wrap    justify-content-center "
              >
                <Fade delay={0} direction="up" triggerOnce={true}>
                  <li
                    className="list-group-item p-2  col-md-4 pointer"
                    style={{ maxWidth: "75px", height: "75px" }}
                  >
                    <img
                      src={`${product?.imageUrl}/${product?.data?.imageCover}`}
                      className="d-block h-100 rounded w-100 m-auto"
                      alt="product"
                      onMouseEnter={() =>
                        handleMouseEnter(
                          ` ${product?.imageUrl}/${product?.data.imageCover}`
                        )
                      }
                    />
                  </li>
                  {isSuccess && imageList}
                </Fade>
                <div className="d-flex d-xl-none align-items-center justify-content-center gap-3 pt-1 w-100 ">
                  {/* زر المشاركة على Twitter */}
                  <TwitterShareButton url={shareUrl} title={title}>
                    <TwitterIcon size={28} round={true} />
                  </TwitterShareButton>

                  {/* زر المشاركة على WhatsApp */}
                  <WhatsappShareButton url={shareUrl} title={title}>
                    <WhatsappIcon size={28} round={true} />
                  </WhatsappShareButton>

                  {/* زر المشاركة على Telegram */}
                  <TelegramShareButton url={shareUrl} title={title}>
                    <TelegramIcon size={28} round={true} />
                  </TelegramShareButton>

                  {/* زر نسخ الرابط للمشاركة على Instagram (مشاركة يدوية) */}
                  <span
                    // style={{ backgroundColor: "#df0073", padding: "0.3rem" }}
                    className="border rounded-circle border-1 pointer"
                  >
                    <SlSocialInstagram
                      color="#df0073"
                      fontSize={"1.5rem"}
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        successNotify(
                          "تم نسخ الرابط! يمكنك الآن لصقه في Instagram"
                        );
                      }}
                    />
                  </span>
                  </div>
              </ul>
            </div> 
            

            {/* info Product */}
            <div className="col-lg-7 col-md-6  mx-auto ">
              <div className="w-100">
                <div className="card-body text-end p-2">
                  <Fade delay={0} direction="up" triggerOnce={true}>
                    <h4
                      style={{ backgroundColor: "rgb(243, 244, 246)" }}
                      className="card-title p-2 mb-3   border-bottom border-start-0"
                    >
                     <span className=" ps-2  w-100 d-block">
                        {product?.data?.title.split("_")[1]}
                       
                        
                      </span>
                      <span className=" ps-2 pt-1 w-100 d-block">
                        
                       
                        {product?.data?.title.split("_")[0]}
                      </span>
                    </h4>

                    <div
                      className={
                        product?.data.brand?.name
                          ? "fw-bold p-1 fs-6 d-flex  border-bottom"
                          : "d-none"
                      }
                    >
                      <span className="card-title fs-5 ps-3">الشركة :</span>
                      <span className="text-secondary ps-2">
                        {product?.data?.brand?.name.split("_")[0]}
                        <br />
                        {product?.data?.brand?.name.split("_")[1]}
                      </span>
                    </div>
                    <div
                      className={
                        product?.data.category?.name
                          ? "fw-bold  border-bottom p-1  fs-6 pt-2 d-flex"
                          : "d-none"
                      }
                    >
                      <span className="card-title fs-5 ps-3 h-100">
                        {" "}
                        القسم :{" "}
                      </span>
                      <span className="text-secondary ps-2">
                        {product?.data?.category?.name.split("_")[0]}
                        <br />
                        {product?.data?.category?.name.split("_")[1]}
                      </span>
                    </div>
                    <div
                      className={`fw-bold fs-5 pt-2 d-flex align-items-center  show`}
                    >
                      <span
                        className={`card-title ps-1 d-${
                          product?.data?.quantity === 0 ? "none" : ""
                        } `}
                      >
                        الكمية :
                      </span>
                      <span className="text-secondary d-flex align-items-center">
                        {+product?.data?.quantity > 0
                          ? `( ${product?.data?.quantity.toFixed(0)})`
                          : ""}

                        <span className={`text-danger  fs-6 ${showQuantity}`}>
                          {" "}
                          كميه محدودة{" "}
                        </span>
                        <span
                          className={`text-danger  fs-6 ${showQuantityMsg}`}
                        >
                          {" "}
                          يتوفر عند الطلب
                        </span>
                      </span>
                    </div>
                    <div className="fw-bold fs-4 pt-2 d-flex align-items-center">
                      <span className="card-title fs-5 px-1"> سعر المنتج   :  </span>

                      <span className="text-secondary PX-1">
                        <span className="text-success PX-1"> SAR </span>
                        <i
                          className={
                            product?.data?.priceAfterDiscount
                              ? "text-decoration-line-through px-2"
                              : " "
                          }
                        >
                          ({product?.data.price.toFixed(2)})
                        </i>
                      </span>
                    </div>
                    <div
                      className={
                        product?.data?.priceAfterDiscount
                          ? "fw-bold fs-4 d-flex align-items-center"
                          : "d-none"
                      }
                    >
                      <span className="card-title fs-5 ps-1">
                        {" "}
                        السعر بعد الخصم :{" "}
                      </span>

                      <spain className="text-secondary p-1">
                        ({product?.data?.priceAfterDiscount.toFixed(2)})
                        <span className="text-success"> SAR</span>
                      </spain>
                    </div>

                    <span className="text-danger">
                      (شامل ضريبة القيمة المضافة 15%)
                    </span>
                  </Fade>
                </div>

                <div className="fs-6 ">
                  <Fade delay={0} direction="up" triggerOnce={true}>
                    <span className="card-title fs-4 ps-3 d-block  border-top p-1">
                      {" "}
                      مواصفات المنتج :{" "}
                    </span>
                    {description.map((ele) => (
                      <p key={ele} className="card-title fs-6 px-2">
                        * {ele}
                      </p>
                    ))}
                  </Fade>
                </div>
                <Fade delay={0} direction="up" triggerOnce={true}>
                  <div className=" d-flex align-items-center pt-4 justify-content-start flex-wrap gap-2">
                    <button
                      disabled={isLoading || createLoading}
                      type="button"
                      onClick={() => addproducToCartOurWishlist(product?.data._id,'cart')}
                      className=" btn btn-outline-primary  p-1"
                    >
                      <MdAddShoppingCart fontSize={'1.5rem'} className="mx-1" />
                     إضافة المنتج إلى السلة 
                    </button>
                    <button
                      disabled={isLoading || createLoading}
                      type="button"
                      onClick={() => addproducToCartOurWishlist(product?.data._id,'wishlist')}
                      className=" btn btn-outline-danger  p-1"
                    >
                      <CiHeart fontSize={'1.5rem'} className="mx-1"/>
                                        إضافة المنتج إلى المفضلة 

                    </button>
                    <button
                      disabled={isLoading || createLoading}
                      type="button"
                      onClick={downloadPdf}
                      className={`${showDownloadBtn} btn btn-outline-success`}
                    >
                      <RiDownloadCloud2Line  fontSize={'1.5rem'} className="mx-1"/>
                      تحميل  المواصفات الفنية للمنتج
                    </button>
                  </div>
                </Fade>
                {/* share to social media */}
            
              </div>
            </div>
          </div>
        </section>
      );
    }
    return null;
  }, [addproducToCartOurWishlist, createLoading, downloadPdf, handleMouseEnter, imageList, isLoading, isSuccess, product?.data?._id, product?.data?.brand?.name, product?.data.category?.name, product?.data?.description, product?.data?.imageCover, product?.data?.infoProductPdf, product?.data?.price, product?.data?.priceAfterDiscount, product?.data?.quantity, product?.data?.ratingsAverage, product?.data?.title, product?.imageUrl, selectedImage, shareUrl]);

  // Related Products Carousel
  const responsive = useMemo(() => {
    return {
      superLargeDesktop: {
        // الشاشات الكبيرة جداً مثل 1440px فما فوق
        breakpoint: { max: 4000, min: 1440 },
        items: 4,
      },
      desktop: {
        // الشاشات المكتبية
        breakpoint: { max: 1440, min: 1024 },
        items: 3,
      },
      tablet: {
        // الشاشات اللوحية
        breakpoint: { max: 1024, min: 768 },
        items: 2,
      },
      mobile: {
        // الشاشات الهواتف
        breakpoint: { max: 768, min: 0 },
        items: 1,
      },
    };
  }, []);
  // Related Products Carousel
  const relatedProducts = useMemo(() => {
    if (categorySuccess && categoryData.data.length > 0) {
      const filteredProducts = categoryData?.data
        ?.filter((p) => p._id !== product?.data?._id)
        ?.map((prod) => (
          <Card
            key={prod._id}
            product={prod}
          
            imgePath={categoryData?.imageUrl}
          />
        ));
      return (
        <div className="container">
          <div  className="w-100 px-2 portion d-flex align-items-center justify-content-between py-3 mt-4 border-bottom bo">
          <span
           
           
            className=" fs-4   "
          >
              منتجات مشابه

          </span>
         <span style={{
          height:"1px",
          backgroundColor: "var(--bgColor) !important" ,
          flex:'auto'
         }} className="bg-dark mx-3"></span>

          <Link  to={"/categories"}
          style={{ color: "var( --btn-bg-color) !important" }}
          >عرض الكل </Link>
        </div>  
           <Carousel
          responsive={responsive}
          showDots={true}
          ssr={true}
          arrows={true}    
           rtl={true}
          focusOnSelect={false}
          // centerMode={true}
          lazyLoad={true}
        >
          {filteredProducts}
        </Carousel>
        </div>

      );
    }

    return null;
  }, [categorySuccess, categoryData?.data, categoryData?.imageUrl, responsive, product?.data?._id]);

  //
  if (isLoading) return SkeletonInfoProduct;

  return (
    <div>
      {productDetails}
      {relatedProducts}
      <ToastContainer />
    </div>
  );
};

export default InfoProduct;
