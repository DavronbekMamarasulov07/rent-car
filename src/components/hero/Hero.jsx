import { Carousel } from 'antd';

import bmwx6 from "../../assets/bmwx6.png"
import bmw from "../../assets/bmw.png"
import audi from "../../assets/audi.png"
import lambo from "../../assets/lambo.png"

const cars = [
  {
    id: 1,
    name: "BMW",
    image: bmwx6,
    model: "X6",
    color1: "#C24B18",
    color2: "#F4B79B"
  },
  {
    id: 2,
    name: "BMW",
    image: bmw,
    model: "M5 F90",
    color1: "#1A3A7F",
    color2: "#87A0CD"
  },
  {
    id: 3,
    name: "AUDI",
    image: audi,
    model: "RS8",
    color1: "#000000",
    color2: "#9EA3A6"
  },
  {
    id: 4,
    name: "LAMBORGHINI",
    image: lambo,
    model: "A.SVJ",
    color1: "#041A44",
    color2: "#2995D6"
  }
]



const Hero = () => {




  return (
    <div className='w-full mx-auto bg-slate-200  mt-[94px]' style={{ maxHeight: 'calc(100vh - 94px)' }}>
      <Carousel autoplay arrows infinite={true}>
        {
          cars.map(car => (
            <div className='w-full h-full !flex items-center justify-center relative' key={car.id}>
              <div className='absolute  z-[-1] top-[20px] left-[100px] overflow-hidden'>
                <h3 style={{ background: `linear-gradient(to bottom, ${car.color1} 0%, ${car.color2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} className='text-[300px] font-bold leading-none'>{car.model}</h3>
                <p className='text-[80px] ml-4 font-medium text-slate-700'>{car.name}</p>
              </div>
              <div className=' flex items-center justify-center'>
                <img className='w-[100%] h-[100%]' src={car.image} alt="" />
              </div>
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}

export default Hero
