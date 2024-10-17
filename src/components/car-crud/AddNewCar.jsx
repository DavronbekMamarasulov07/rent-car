import { useState } from 'react'
import BasicInformation from './BasicInformation'
import VisualInformation from './VisualInformation'
import TechnicalInformation from './TechnicalInformation'
import useSearchParamsHook from '../../hooks/UseQueryParams'
import AllInformation from './AllInformation'

const AddNewCar2 = ({ type, removeParam, carData }) => {
    const { setParam, getParam } = useSearchParamsHook();
    const [values, setValues] = useState({
        name: null,
        images: [],
        description: null,
        price: null,
        status: "active",
        rent_price: null,
        color: null,
        colors: [],
        model: null,
        category: null,
        year: null,
        fuel: null,
        transmission: null,
        seats: null,
        thumbnail: null,
        discount: null,
        capacity_fuel: null,
        usage_per_km: null,
    });






    return (
        <div className="w-full relative overflow-hidden p-8">
            <div className=" flex w-[400%] transition-all duration-700 ease-in-out" style={{ marginLeft: getParam("carUpdate") === "step1" || getParam("car") === "step1" ? '0%' : getParam("carUpdate") === "step2" || getParam("car") === "step2" ? '-100%' : getParam("carUpdate") === "step3" || getParam("car") === "step3" ? '-200%' : '-300%' }}>
                <div className="w-[25%] text-[35px] font-bold text-center text-slate-700" >Basic Information </div>
                <div className="w-[25%] text-[35px] font-bold text-center text-slate-700" >Visual Information </div>
                <div className="w-[25%] text-[35px] font-bold text-center text-slate-700" >Technical Information</div>
                <div className="w-[25%] text-[35px] font-bold text-center text-slate-700" >Technical Information</div>
            </div>
            <div className="flex justify-between items-center h-[50px] w-full overflow-hidden mt-8 mb-3 border border-light-gray rounded-[15px] relative">
                <input
                    className='hidden'
                    type="radio"
                    name="slide"
                    id="login"
                    checked={getParam("carUpdate") === "step1" || getParam("car") === "step1"}
                    readOnly
                />
                <input
                    className='hidden w-full'
                    type="radio"
                    name="slide"
                    id="visual"
                    checked={getParam("carUpdate") === "step2" || getParam("car") === "step2"}
                    readOnly
                />
                <input
                    className='hidden w-full'
                    type="radio"
                    name="slide"
                    id="technical"
                    checked={getParam("carUpdate") === "step3" || getParam("car") === "step3"}
                    readOnly
                />
                <input
                    className='hidden w-full'
                    type="radio"
                    name="slide"
                    id="technical"
                    checked={getParam("carUpdate") === "step4" || getParam("car") === "step4"}
                    readOnly
                />
                <label htmlFor="login" className="text-lg text-center font-medium hover:scale-110 transition-transform flex-1 text-slate-700">
                    Basic Information
                </label>
                <label htmlFor="visual" className="text-lg text-center font-medium hover:scale-110 transition-transform flex-1 text-slate-700">
                    Visual Information
                </label>
                <label htmlFor="technical" className="text-lg text-center font-medium hover:scale-110 transition-transform flex-1 text-slate-700">
                    Technical Information
                </label>
                <label htmlFor="technical" className="text-lg text-center font-medium hover:scale-110 transition-transform flex-1 text-slate-700">
                    All Information
                </label>
                <div
                    className="absolute h-full w-[25%] transition-left duration-500 ease-in-out bg-slate-600 rounded-2xl"
                    style={{
                        left: getParam("carUpdate") === "step1" || getParam("car") === "step1"
                            ? '0%'
                            : getParam("carUpdate") === "step2" || getParam("car") === "step2"
                                ? '25%'
                                : 
                                getParam("carUpdate") === "step3" || getParam("car") === "step3"
                                ? '50%' :'75%'
                    }}
                ></div>
            </div>

            <div className="w-full overflow-hidden">
                <div
                    className="w-[400%] flex transition-all duration-500 ease"
                    style={{ transform: `translateX(${getParam("carUpdate") === "step1" || getParam("car") === "step1" ? '0%' : getParam("carUpdate") === "step2" || getParam("car") === "step2" ? '-25%' : getParam("carUpdate") === "step3" || getParam("car") === "step3" ? '-50%' : '-75%'})` }}
                >
                    <div className="w-[25%] flex-shrink-0 p-4">
                        <BasicInformation values={values} setValues={setValues} type={type} carData={carData} />
                    </div>
                    <div className="w-[25%] flex-shrink-0 p-4">
                        <VisualInformation values={values} setValues={setValues} type={type} carData={carData} />
                    </div>
                    <div className="w-[25%] flex-shrink-0 p-4">
                        <TechnicalInformation values={values} setValues={setValues} removeParam={removeParam} type={type} carData={carData} />
                    </div>
                    <div className="w-[25%] flex-shrink-0 p-4">
                        <AllInformation values={values} setValues={setValues} type={type} carData={carData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewCar2
