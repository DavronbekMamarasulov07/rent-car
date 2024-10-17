import CategorySidebar from "../../components/category-page/CategoriesPage"
import Cars from "../../components/cars/Cars"
import  Container from "../../components/container/Container"
import { useGetAllCarsQuery } from "../../redux/api/cars-api";
import { useSearchParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Hearder from "../../components/header/Hearder";
import { useEffect } from "react";


const Categories = () => {
    const [searchParams] = useSearchParams();
    const { data, isLoading } = useGetAllCarsQuery({ categories: searchParams.getAll("categories")});
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Hearder />
            <div className=" mt-[150px]">
                <Container>
                    <div className="flex gap-5 items-start">
                        <CategorySidebar />
                        <Cars data={data}  className="grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"  />
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Categories