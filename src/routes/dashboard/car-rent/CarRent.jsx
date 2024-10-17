import CarCRUD from "../../../components/car-crud/CarCRUD";
import { useGetAllCarsQuery } from "../../../redux/api/cars-api";

const CarRent = () => {
  const { data, isLoading } = useGetAllCarsQuery();

  return (
    <div>
      <CarCRUD data={data?.payload} isLoading={isLoading} />
    </div>
  )
}

export default CarRent