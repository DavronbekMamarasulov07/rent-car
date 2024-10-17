import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Button, Image, Modal, Space } from "antd";
import TableComponent from "../table/Table";
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useEffect, useState } from "react";
import { useDeleteCarMutation } from "../../redux/api/cars-api";
import AddNewCar2 from "./AddNewCar";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreateCarModal,
  setUpdateCarModal,
} from "../../redux/slices/modal-slice";
import { clearForm } from "../../redux/slices/form-slice";

const CarCRUD = ({ data, isLoading }) => {
  const [isDeleteCarModalOpen, setIsDeleteCarModalOpen] = useState(false);

  const [deleteCar] = useDeleteCarMutation();
  const { createCarModal, updateCarModal } = useSelector((state) => state.modal);
  const { setParam, getParam, removeParam } = useSearchParamsHook();
  const dispatch = useDispatch();

  const [carData, setCarData] = useState(null);

  const [carId, setCarId] = useState(null);

  useEffect(() => {
    if (getParam("car")) {
      dispatch(setCreateCarModal(true));
    } else {
      dispatch(setCreateCarModal(false));
    }
  }, [getParam("car")]);

  useEffect(() => {
    if (getParam("carUpdate")) {
      dispatch(setUpdateCarModal(true));
    } else {
      dispatch(setUpdateCarModal(false));
    }
  }, [getParam("carUpdate")]);

  const type = getParam("carUpdate") ? "update" : "create";

  const handleCancel = () => {
    dispatch(setCreateCarModal(false));
    removeParam("car");
    dispatch(clearForm())
  };

  const handleAddNewCar = () => {
    dispatch(setCreateCarModal(true));
    setParam("car", "step1");
  };

  const handleUpdate = (i) => {
    setCarData(i);
    dispatch(setUpdateCarModal(true));
    setParam("carUpdate", "step1");
    setParam("carId", i);
  };

  const handleDelete = (id) => {
    setCarId(id);
    setIsDeleteCarModalOpen(true);
  };

  const handleDeleteCarOK = () => {
    setIsDeleteCarModalOpen(false);
    deleteCar(carId);
  };

  const handleDeleteCarCancel = () => {
    setIsDeleteCarModalOpen(false);
  };

  const handleUpdateCarCancel = () => {
    dispatch(setUpdateCarModal(false));
    removeParam("carUpdate");
    removeParam("carId");
    dispatch(clearForm())
    // setCarData(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `$${price}`,
      key: "price",
    },
    {
      title: "Rent Price",
      dataIndex: "rent_price",
      render: (price) => `$${price}`,
      key: "rent_price",
    },
    {
      title: "Capacity Fuel",
      dataIndex: "capacity_fuel",
      render: (fuel) => `${fuel}L`,
      key: "capacity_fuel",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seats",
    },
    {
      title: "Car Image",
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <Image
          width={100}
          style={{ height: "100px", objectFit: "contain" }}
          className="mix-blend-multiply"
          src={thumbnail}
          alt="car"
        />
      ),
      key: "seats",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleUpdate(record._id)}
            icon={<FiEdit />}
            className="!border-[#173257] !text-[#173257] !bg-white hover:!bg-[#173257] hover:!text-white"
          >
            Update
          </Button>
          <Button
            onClick={() => handleDelete(record._id)}
            danger
            className="!border-red-600 !text-red-border-red-600 !bg-white hover:!bg-red-600 hover:!text-white"
            icon={<MdDelete />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const carPageSize = 4;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Cars </h2>
      <Button
        type="primary"
        className="!border-slate-700 !text-slate-700 !bg-white hover:!bg-slate-700 hover:!text-white "
        onClick={() => handleAddNewCar()}
      >
        Add New Car
      </Button>
      <TableComponent pageSize={carPageSize}  data={data} loading={isLoading} columns={columns} />
      <Modal
        centered
        open={updateCarModal}
        onCancel={handleUpdateCarCancel}
        footer={null}
        maskClosable={false}
        width={1000}
      >
        <AddNewCar2 type={type} removeParam={setCarId} carData={carData} />
      </Modal>
      <Modal
        centered
        open={createCarModal}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        width={1000}
      >
        <AddNewCar2 type={type} removeParam={removeParam} carData={carData} />
      </Modal>
      <Modal
        centered
        open={isDeleteCarModalOpen}
        onOk={handleDeleteCarOK}
        onCancel={handleDeleteCarCancel}
        maskClosable={false}
        closable={false}
        okButtonProps={{ loading: isLoading }}
        okText="Delete"
        cancelText="Cancel"
        okType="danger"
      >
        <p className="text-[#173257] text-base">
          Are you sure you want to delete this car?
        </p>
      </Modal>
    </div>
  );
};

export default CarCRUD;
