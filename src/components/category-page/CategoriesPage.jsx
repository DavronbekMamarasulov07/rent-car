import  { useEffect, useState } from "react";
import { Checkbox, Skeleton, Slider } from "antd";
import { Loading } from "../../utils";
import { useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/api/categories-api";



const CategorySidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading } = useGetCategoriesQuery();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);

    const dataCount = data?.payload.length

    

    const onChangeCarType = (values) => {
        setSearchParams({ categories: values });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const onChangeCarPerson = (value) => {
        // console.log("Persons: ", value);
    };

    const onChangeSliderPrice = (value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
        // console.log("onChange: ", minPrice, maxPrice);
    };

    const onChangeCompleteSliderPrice = (value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
        // console.log("onChangeComplete: ", minPrice, maxPrice);
    };

    const carPersonOptions = [
        {
            label: "2 Person",
            value: "2 Person",
        },
        {
            label: "5 Person",
            value: "5 Person",
        },
        {
            label: "7 Person",
            value: "7 Person",
        },
        {
            label: "9 or More",
            value: "9 or More",
        },
    ];

   

    return (
       <>
            <div className="flex w-[320px] shrink-0 flex-col gap-14 rounded-[10px] bg-white p-5 shadow-lg ">
                <div className="flex flex-col gap-7">
                    <span className="text-xs font-semibold capitalize text-[#90a3bf]">
                        TYPE
                    </span>
                    {
                        isLoading ?
                        <div className="flex flex-col gap-4">
                            {
                                Array.from({ length: dataCount }).map((_, index) =>
                                    <div key={index} className="flex items-center gap-4">
                                        <Skeleton.Button style={{ width: 50, height: 25 }} active />
                                        <Skeleton.Input active style={{ width: 180, height: 25 }} />
                                    </div>
                                )
                            }
                        </div>
                         :
                            <Checkbox.Group
                                defaultValue={searchParams.getAll("categories")}
                                className="flex flex-col gap-2 font-semibold capitalize text-[#596780]"

                                onChange={onChangeCarType}
                            >
                                <>
                                    {
                                        data?.payload.map(category =>
                                            <Checkbox key={category._id} value={category._id} >{category.name}</Checkbox>
                                        )
                                    }
                                </>
                            </Checkbox.Group>
                    }
                </div>

                <div className="flex flex-col gap-7">
                    <span className="text-xs font-semibold capitalize text-[#90a3bf]">
                        CAPACITY
                    </span>
                    <Checkbox.Group
                        className="flex flex-col gap-2 font-semibold capitalize text-[#596780]"
                        options={carPersonOptions}
                        onChange={onChangeCarPerson}
                    />
                </div>

                <div className="flex flex-col gap-7">
                    <span className="text-xs font-semibold capitalize text-[#90a3bf]">
                        PRICE
                    </span>
                    <Slider
                        range
                        step={10}
                        defaultValue={[minPrice, maxPrice]}
                        onChange={onChangeSliderPrice}
                        onChangeComplete={onChangeCompleteSliderPrice}
                    />
                    <div className="flex flex-col">
                        <span className="">Min: ${minPrice}</span>
                        <span className="">Max: ${maxPrice}</span>
                    </div>
                </div>
            </div>
       </>
    );
};

export default CategorySidebar;
