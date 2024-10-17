import Container from '../container/Container'
import Card from '../card/Card'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSearchParamsHook from '../../hooks/UseQueryParams';
import { useEffect } from 'react';

const LikedCars = ({ carData }) => {
  const {setParam } = useSearchParamsHook();
  const navigate = useNavigate();
  const { likedCars } = useSelector((state) => state.like);

  if (likedCars?.length === 0) {
    navigate("/");
  }
  

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);


  
  return (
    <Container>
      <h1 className='text-5xl font-bold text-center my-10 text-slate-700'>Liked Cars</h1>
      {
        likedCars?.length === 0 && <h1 className='text-2xl font-medium text-center my-15 text-slate-500'>No liked cars </h1>
      }
      <div className='grid grid-cols-3 gap-5'>
        {
          carData?.map((car) => (
            <Card key={car._id} car={car} />
          ))
        }
      </div>
    </Container>
  )
}

export default LikedCars

