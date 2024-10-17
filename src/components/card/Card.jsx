import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai"; 
import {
    CarCardGasoline,
    CarCardManuals,
    CarCardPeople,
} from "../../assets/svgs.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToLiked } from "../../redux/slices/like-slice.jsx";
import { Skeleton, message } from "antd";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Card = ({ car,loading }) => {
    AOS.init({
        duration: 1000

    });
    
    const { likedCars } = useSelector((state) => state.like);
    const dispatch = useDispatch();

    const isProductLiked = (carId) => {
        return likedCars?.some((car) => car._id === carId);
    };

    const handleLike = () => {
        dispatch(addToLiked(car));
    }
    // console.log(loading)

    // const loading = true
    return (
        loading ? 
        <div className="rounded-[10px] bg-white p-6 shadow-lg transition hover:shadow-2xl">
               <div className="flex flex-col  gap-2">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col items-start gap-2">
                            <Skeleton.Input active style={{ width: 150, height: 25 }} />
                            <Skeleton.Button style={{ width: 100, height: 25 }} active />
                        </div>
                        <Skeleton.Button active style={{ width: 50, height: 25 }} />
                    </div>
                    <Skeleton.Image style={{ width: 280, height: 200 }} active  className="my-2"/>
                    <Skeleton.Input active style={{ width: 280, height: 25 }} />
                    <div className="flex items-center justify-between ">
                        <Skeleton.Button active  style={{ width: 100, height: 25 }} />
                        <Skeleton.Button active style={{ width: 100, height: 25 }} />
                    </div>
               </div>
        </div>
        :
            <div data-aos="flip-left" className="rounded-[10px] bg-white p-6 shadow-lg transition hover:shadow-2xl">
                <div className="flex w-full items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xl font-bold">{car.name}</span>
                        <span className="text-sm font-bold text-[#90a3bf]">{car.model}</span>
                    </div>
                    <button className="flex items-center gap-1" onClick={() => handleLike(car)}>
                        {
                            isProductLiked(car._id) ? (<AiFillHeart className="text-red-500 text-2xl" />) : (<AiOutlineHeart className="text-red-500 text-2xl" />)
                        }
                    </button>
                </div>

                <div className="flex h-[190px]  w-full items-center justify-center">
                    <img    
                        width={300}
                        className="object-contain"
                        src={car.thumbnail}
                        alt="Car"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                        <CarCardGasoline />
                        <span className="text-sm font-medium text-[#90a3bf]">
                            {car.capacity_fuel}L
                        </span>
                    </span>
                    <span className="flex items-center gap-1">
                        <CarCardManuals />
                        <span className="text-sm font-medium text-[#90a3bf] capitalize">
                            {car.transmission}
                        </span>
                    </span>
                    <span className="flex items-center gap-1">
                        <CarCardPeople />
                        <span className="text-sm font-medium text-[#90a3bf]">
                            {car.seats} People
                        </span>
                    </span>
                </div>

                <div className="mt-6 flex w-full items-center justify-between">
                    <div className="flex items-end gap-1">
                        <span className="text-xl font-bold text-[#1a202c]">${car.rent_price}</span>
                        <span className="text-xl font-bold text-[#1a202c]">/</span>
                        <span className="text-sm font-bold text-[#90a3bf]">day</span>
                    </div>
                    <Link
                        to={`/car-details-page/${car._id}`}
                        className="mt-2 flex max-w-max rounded bg-slate-700 px-5 py-[10px] text-center text-base font-semibold leading-normal text-white"
                    >
                        Car Details
                    </Link>
                </div>
            </div>
    );
};

export default Card;
