import { useGetCarQuery } from "../../redux/api/cars-api";
import {  useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/api/categories-api";
import { Carousel, Image, Modal, Skeleton, message } from "antd";
import Container from "../container/Container.jsx";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addToLiked } from "../../redux/slices/like-slice.jsx";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import useSearchParamsHook from "../../hooks/UseQueryParams.jsx";
import OrderForm from "../order/order-fom/OrderForm.jsx";

const CarDetails = () => {
  const { carId } = useParams();
  const { data, isLoading } = useGetCarQuery(carId);
  const { data: categories } = useGetCategoriesQuery();
  const { likedCars } = useSelector((state) => state.like);
  const [openModal , setOpenModal] = useState(false)
  const [carData, setCarData] = useState(null)
  const { setParam ,removeParam, getParam } = useSearchParamsHook()
  const carRentPrice = data?.payload?.rent_price
  const token = localStorage.getItem("token");
 

  useEffect(() => {
    if (getParam("order")) {
        setOpenModal(true)
    }
    else{
        setOpenModal(false)
    }
    
  }, [getParam])

  const handleOrderCreate = (car) => {
    if(!token){
        message.error("Please login first")
    }
    else{
      setCarData(car)
      setOpenModal(true)
      setParam("order", car._id)
    }
  }

  const handleModalClose = () => {
    setOpenModal(false)
    removeParam("order")
  }


  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  AOS.init({
    duration: 1000

  });

  const car = data?.payload

  const isProductLiked = (carId) => {
    return likedCars?.some((car) => car._id === carId);
  };

  const handleLike = (car) => {
    dispatch(addToLiked(car));
  };

  const contentStyle = {
    margin: 0,
    color: "#fff",
    textAlign: "center",
    
  };

  return (
    <Container>
      <div className=" mt-[100px] flex flex-col items-center justify-center gap-8">
        <div className="flex w-full max-w-[1020px] flex-col gap-5">
          <div data-aos="zoom-in" className="flex justify-between gap-5">
            <div  className="flex shrink-0 flex-col gap-5">
              <div className="w-[500px]">
                {car && car.images.length ? (
                  <Carousel autoplay arrows infinite={false}>
                    {car.images?.map((car) => (
                      <div  key={car} style={contentStyle}>
                        <Image
                          preview={false}
                          className="mix-blend-multiply"
                          style={{
                            width: 500,
                            height: 300,
                            objectFit: "contain",
                          }}
                          src={car}
                          alt="Main"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <Skeleton.Image style={{ width: 500, height: 300 }} active />
                )}
              </div>

              <div className="flex w-full items-center  justify-center gap-5  overflow-hidden max-w-[500px] ">
                {car && car.images.length ? (
                  car.images.slice(0, 4).map((car) => (
                    <div key={car} style={contentStyle}>
                      <Image
                        className="mix-blend-multiply"
                        style={{
                          width: 110,
                          height: 110,
                          objectFit: "contain",
                        }}
                        src={car}
                        alt="Main"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-between w-full ">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Skeleton.Image
                        style={{ width: 110, height: 110 }}
                        key={index}
                        active
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {isLoading ? (
              <div className="flex w-full flex-col  gap-2 rounded-[10px] bg-white p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <Skeleton.Input active style={{ width: 300, height: 50 }} />
                  <Skeleton.Button active style={{ width: 50, height: 50 }} />
                </div>
                <Skeleton.Input active style={{ width: 100, marginTop: 10 }} />
                <div className="flex items-center gap-4 my-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton.Button active key={index} style={{ width: 50, height: 50 }} />
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Skeleton.Input active style={{ width: 100, height: 25 }} />
                    <Skeleton.Input active style={{ width: 100, height: 25 }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton.Input active style={{ width: 100, height: 25 }} />
                    <Skeleton.Input active style={{ width: 100, height: 25 }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton.Input active style={{ width: 100, height: 25 }} />
                    <Skeleton.Input active style={{ width: 100, height: 25 }} />
                  </div>
                </div>
                <div className="flex items-start justify-between mt-4">
                  <div className="flex flex-col gap-2">
                    <Skeleton.Input active style={{ width: 250, height: 50 }} />
                    <Skeleton.Input active style={{ width: 100, height: 25 }} />
                  </div>
                  <Skeleton.Button style={{ width: 150, height: 70 }} />
                </div>
              </div>
            ):(<div   className="flex w-full flex-col justify-between gap-8 rounded-[10px] bg-white p-5 shadow-lg">
                <div className="flex flex-col gap-5">
                  <div className="flex w-full items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-[32px] font-bold text-[#1a202c]">
                        {car?.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-medium text-[#596780]">
                          {car?.model}
                        </span>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleLike(car)}
                    >
                      {isProductLiked(car?._id) ? (
                        <AiFillHeart className="text-red-500 text-2xl" />
                      ) : (
                        <AiOutlineHeart className="text-red-500 text-2xl" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      className="h-10 w-10 rounded border border-slate-300 shadow-md"
                      style={{ backgroundColor: car?.color }}
                      title={car?.color}
                    ></button>
                    {car?.colors.map((color) => (
                      <button
                        className="h-10 w-10 rounded border border-slate-300 shadow-md"
                        style={{ backgroundColor: color }}
                        title={color}
                        key={color}
                      ></button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-base font-normal text-[#90a3bf]">
                        Type Car
                      </span>
                      <span className="text-base font-semibold capitalize text-[#596780]">
                        {categories?.payload?.length > 0 ? (
                          categories.payload.map((category) => {
                            if (category._id === car?.category) {
                              return (
                                <span key={category._id}>{category.name}</span>
                              );
                            }
                          })
                        ) : (
                          <span> </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-base font-normal text-[#90a3bf]">
                        Steering
                      </span>
                      <span className="text-base font-semibold capitalize text-[#596780]">
                        {car?.transmission}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-base font-normal text-[#90a3bf]">
                        Capacity
                      </span>
                      <span className="text-base font-semibold text-[#596780]">
                        {car?.seats} Person
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-base font-normal text-[#90a3bf]">
                        Gasoline
                      </span>
                      <span className="text-base font-semibold text-[#596780]">
                        {car?.capacity_fuel} L
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-[32px] font-bold text-[#1a202c]">
                        $
                        {(car?.rent_price * (1 - car?.discount / 100)).toFixed(
                          2
                        )}
                        /
                      </span>
                      <span className="text-base font-bold text-[#90a3bf]">
                        days
                      </span>
                    </div>
                    <span className="text-base font-bold text-[#90a3bf]">
                      ${car?.price}
                    </span>
                  </div>

                  <button onClick={() => handleOrderCreate(car)} className="flex items-center justify-center rounded-[10px] bg-slate-700 px-8 py-4 text-base font-bold text-white">
                    Rent Now
                  </button>
                </div>
              </div>
                
            )}
          </div>

          <div data-aos="fade-up" className="flex flex-col gap-5 rounded-lg bg-white p-8 mt-8 shadow-lg">
            {isLoading ? (
              <Skeleton
                className="w-full"
                count={5}
                duration={2}
                baseColor="#E2E8F0"
                highlightColor="#CBD5E0"
              />
            ) : (
              
            <div>
              <h3 className="text-xl font-bold text-[#596780] mb-4">
                Description
              </h3>
              <p className="text-base font-medium text-[#596780]">
                <div dangerouslySetInnerHTML={{__html: car?.description}}></div>
              </p>
            </div>
            )}
          </div>
        </div>
      </div>
      <Modal
      centered
      maskClosable={false}
      footer={null}
      onCancel={handleModalClose}
      open={openModal}
    >
        <OrderForm carRentPrice={carRentPrice} openModal={openModal} setOpenModal={setOpenModal}  />
    </Modal>
    </Container>
  );
};

export default CarDetails;
