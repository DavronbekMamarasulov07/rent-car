import { useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Hearder'
import LikedCars from '../../components/liked-cars/LikedCars'

const Liked = () => {
  const { likedCars } = useSelector((state) => state.like)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow mt-24" >
        <LikedCars  carData={likedCars}/>
      </div>

      <Footer />
    </div>
  )
}

export default Liked
