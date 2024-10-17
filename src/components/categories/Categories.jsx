import { useGetCategoriesQuery } from "../../redux/api/categories-api";
import { Loading } from "../../utils";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import { Skeleton } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";

const Categories = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();


  AOS.init({
    duration: 500,
  });

  const dataLength = data?.payload.length;
  return (
    <div className="my-24">
      <Container>
        <h2 className="text-3xl font-bold mb-5">Categories</h2>
        {
          isError && isLoading 
           ? 
            <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-8 gap-5">
              {Array.from({ length: dataLength }).map((_, index) => (
                <Skeleton.Image
                  key={index}
                  active
                  style={{ width: 150, height: 150, borderRadius: "50%" }}
                />
              ))}
            </div>
           : 
            <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-8 gap-5">
              {data?.payload.map((category) => (
                <Link
                  to={`/categories?categories=${category._id}`}
                  key={category._id}
                  className="flex flex-col items-center gap-4"
                >
                  <div
                    data-aos="zoom-in"
                    className="rounded-full overflow-hidden p-3 w-[150px] h-[150px] bg-white shadow-lg transition hover:shadow-2xl"
                  >
                    <img
                      src={category.image}
                      className="rounded-full object-contain  select-none"
                      alt=""
                    />
                  </div>
                  <p className="text-center font-bold">
                    {category.name.toUpperCase()}
                  </p>
                </Link>
              ))}
            </div>
          
        }
      </Container>
    </div>
  );
};

export default Categories;
