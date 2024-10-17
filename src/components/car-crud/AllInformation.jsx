import { SiSpeedtest } from "react-icons/si";
import {
    FaCar,
    FaBuilding,
    FaTags,
    FaCalendarAlt,
    FaPalette,
    FaDollarSign,
    FaGasPump,
    FaCogs,
    FaChair,
} from "react-icons/fa";
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useEffect } from "react";
import { Button, Skeleton, message, Form } from "antd";
import { useCreateCarMutation, useGetCarQuery, useUpdateCarMutation } from "../../redux/api/cars-api";
import { useDispatch, useSelector } from "react-redux";
import {  setUpdateCarModal } from "../../redux/slices/modal-slice";
import { clearForm } from "../../redux/slices/form-slice";

const AllInformation = ({  type }) => {
    const { setParam,getParam, removeParam } = useSearchParamsHook();
    const carDataID = getParam("carId");
    const { data: getData } = useGetCarQuery(carDataID);
    const [createCar, {data: dataCreate, isLoading: isLoadingCreate, isSuccess: isSuccessCreate, isError: isErrorCreate }] = useCreateCarMutation();
    const [updateCar, {data: dataUpdate, isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate }] = useUpdateCarMutation()
    const dispatch = useDispatch();
    const formValues = useSelector((state) => state.form);
    const [form] = Form.useForm();


    


   

     useEffect(() => {
        form.setFieldsValue(getData?.payload);
    }, [getData?.payload]) 


    const handlePrevious = () => {
        if (type === "update") {
            setParam("carUpdate", "step3");
        }
        if (type === "create") {
            setParam("car", "step3");
        }
    };

    const handleSubmit = () => {
        try {
            if (type === "create") {
                createCar(formValues);
                
            }
            if (type === "update") {
                updateCar({ body: formValues, id: carDataID });
            }
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    console.log(formValues)

    useEffect(() => {
        if (isSuccessUpdate) {
            removeParam("carUpdate");
            dispatch(setUpdateCarModal(false));
            message.success(dataUpdate?.message);
            removeParam("carId");
            dispatch(clearForm())
            form.resetFields();
        }
        if (isErrorUpdate) {
            message.error("Something went wrong");
        }
    }, [isSuccessUpdate, isErrorUpdate]);

    useEffect(() => {
        if (isSuccessCreate) {
            removeParam("car");
            dispatch(setUpdateCarModal(false));
            message.success(dataCreate?.message);
            dispatch(clearForm())
            form.resetFields();
        }
        if (isErrorCreate) {
            message.error("Something went wrong");
        }
    }, [isSuccessCreate, isErrorCreate]);

    console.log(dataCreate, dataUpdate)



    return (
        <>
            <div className="flex-1 rounded-xl bg-slate-300 p-8 my-7 shadow-inner">
                <h1 className="mb-6 text-xl font-semibold text-gray-700">
                    All Information
                </h1>
                <ul className="font-base space-y-4 flex items-center justify-between text-gray-600">
                    <div className="flex flex-col gap-2">
                        <li className="flex items-center gap-2">
                            <FaCar />
                            <span className="font-bold text-lg">Model:</span> {  formValues?.model ? formValues?.model : <Skeleton.Input width={80} style={{ height: "15px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <FaBuilding />
                            <span className="font-bold text-lg">Company:</span> {formValues?.name ? formValues?.name : <Skeleton.Input width={80} style={{ height: "15px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <FaTags />
                            <span className="font-bold text-lg">Category:</span> {formValues?.category ? formValues?.category : <Skeleton.Input width={80} style={{ height: "15px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <span className="font-bold text-lg">Year:</span> {formValues?.year ? formValues?.year + " year" : <Skeleton.Input width={80} style={{ height: "15px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPalette />
                            <span className="font-bold text-lg">Primary Color:</span>
                            <span className="flex h-6 w-6 rounded " style={formValues?.color ? { backgroundColor: formValues?.color } : null}></span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPalette />
                            <span className="font-bold text-lg">Secondary Color:

                            </span>
                            <span className="flex gap-1">
                                {formValues?.colors?.map((color, index) => (
                                    <span className="flex h-6 w-6 rounded  " style={{ backgroundColor: color }} key={index}></span>
                                ))}
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaDollarSign />
                            <span className="font-bold text-lg">Purchase Price:</span> {formValues?.price ? "$" + formValues?.price : <Skeleton.Input width={80} style={{ height: "20px" }} active />}
                        </li>
                    </div>
                    <div className="flex flex-col gap-2">
                        <li className="flex items-center gap-2">
                            <FaDollarSign />
                            <span className="font-bold text-lg">Rent Price:</span> {formValues?.rent_price ? "$" + formValues?.rent_price : <Skeleton.Input width={80} style={{ height: "20px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <FaDollarSign />
                            <span className="font-bold text-lg">Discount:</span> {formValues?.discount ? "% " + formValues?.discount : <Skeleton.Input width={80} style={{ height: "20px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <FaGasPump />
                            <span className="font-bold text-lg">Fuel Type:</span> {formValues?.fuel ? formValues?.fuel : <Skeleton.Input width={80} style={{ height: "20px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <FaCogs />
                            <span className="font-bold text-lg">Transmission Type:</span> {formValues?.transmission ? formValues?.transmission : <Skeleton.Input width={80} style={{ height: "20px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <FaChair />
                            <span className="font-bold text-lg">Number of Seats:</span> {formValues?.seats ? formValues?.seats + "seats" : <Skeleton.Input width={80} style={{ height: "20px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <FaGasPump />
                            <span className="font-bold text-lg">Fuel Tank Capacity:</span> {formValues?.capacity_fuel ? formValues?.capacity_fuel + "L" : <Skeleton.Input width={80} style={{ height: "20px" }} active />}
                        </li>
                        <li className="flex items-center gap-2">
                            <SiSpeedtest />
                            <span className="font-bold text-lg">Usage_per_km:</span> {formValues?.usage_per_km ? formValues?.usage_per_km + "L" : <Skeleton.Input width={80} style={{ height: "20px" }} active />}
                        </li>

                    </div>
                </ul>
            </div>
            <div className="w-full flex items-center  justify-end gap-5  ">
                    <Button
                        className="!border-[#173257] max-w-[150px] hover:!text-[#173257]"
                        onClick={() => handlePrevious()}
                    >
                        Previous
                    </Button>
                    <Button onClick={() => handleSubmit()} className="!bg-[#173257] !border-none !text-[#fff]  max-w-[150px]"  htmlType="submit">
                        {
                            type === "update" ? "Update Car" : "Create Car"
                        }
                    </Button>
            </div>
        </>
    )
}

export default AllInformation
