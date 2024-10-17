import { useNavigate } from "react-router-dom";
import Cars from "../../components/cars/Cars";
import Hearder from "../../components/header/Hearder"
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useSearchCarsQuery } from "../../redux/api/cars-api";
import { useEffect } from "react";
import { message } from "antd";


const Search = () => {
    const {getParam} = useSearchParamsHook();
    const {data} = useSearchCarsQuery({q:getParam("q")})
    console.log(data)
    const navigate = useNavigate()
    useEffect(() => {
      if (!data?.payload?.length) {
        navigate("/")
        message.error("No cars found")
      }
    },[getParam("q")])
  return (
    <div>
       <Hearder/>
        <div className=" mt-[150px]">
        <Cars data={data} loading={false} className="grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" title="Search cars" />
        </div>
    </div>
  )
}

export default Search