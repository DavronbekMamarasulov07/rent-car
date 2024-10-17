import Cars from '../../components/cars/Cars'
import Hero from '../../components/hero/Hero'
import Categories from '../../components/categories/Categories'
import { useGetAllCarsQuery } from '../../redux/api/cars-api'
import { useEffect } from 'react'
import Hearder from '../../components/header/Hearder'
import Footer from '../../components/footer/Footer'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError, isFetching } = useGetAllCarsQuery()

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isError) {
      message.error("Something went wrong");
    }
    
  }, [isError]);

  

  return (
      <>
      <Hearder />
      <Hero />
      <Categories />
      <div className="my-24">
        <Cars data={data} loading={isLoading} title="Popular cars" className="grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4" link="/categories" slice={4} />
      </div>
      <div className='my-24'>
        <Cars data={data} loading={isLoading} title="Recommended cars" className="grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4" link="/categories" />
      </div>
      <Footer />
      </>

  )
}

export default Home
