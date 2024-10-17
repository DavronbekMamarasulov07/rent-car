
import CarDetails from '../../components/car-details/CarDetails'
import Hearder from '../../components/header/Hearder'
import Footer from '../../components/footer/Footer'

const CarDetailsPage = () => {
  return (
   
    <div className="flex flex-col min-h-screen">
      <Hearder />

      <div className="flex-grow mt-24" >
        <CarDetails />
      </div>

      <Footer />
    </div>
  )
}

export default CarDetailsPage
