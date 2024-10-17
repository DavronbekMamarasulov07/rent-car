import { MdOutlineModeEdit } from "react-icons/md"; 
import React, { useEffect, useState } from 'react'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '../../../redux/api/categories-api'
import { Button, Image, Modal, Space, message } from 'antd'
import TableComponent from '../../table/Table'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from "react-redux";
import useSearchParamsHook from "../../../hooks/UseQueryParams";
import CategoryForm from "../category-form/CategoryForm";


const CategoryData = () => {
  const [ deleteCategory, { isLoading, isSuccess, isError, data: deleteCar }] = useDeleteCategoryMutation()
  const {setParam , getParam, removeParam} = useSearchParamsHook()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data} = useGetCategoriesQuery()
  const categorisData = data?.payload 
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const dispatch = useDispatch();
  const [carData , setCarData] = useState(null)


    const handleDelete = (id) => {
        setOpenDeleteModal(true);
        setCategoryId(id);
    }

  const handleOk = () => {
    setOpenDeleteModal(false);
    deleteCategory(categoryId);
  };
  const handleCancel = () => {
    setOpenDeleteModal(false);
  };
  useEffect(() => {
    if (isSuccess) {
      message.success(deleteCar?.message);
      setOpenDeleteModal(false)
    }
    if (isError) {
      message.error(deleteCar?.message);
    }
  }, [isSuccess, isError]);

  const handleEdit = (category) => {
    setCarData(category)
    setIsModalOpen(true)
    setParam("category", "edit")
    
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    removeParam("category")
    setCarData(null)
  }

  const handleCreateCategory = () => {
    setIsModalOpen(true)
    setParam("category", "create")
    setCarData(null)
  }

  useEffect(() => {
    if (getParam("category")) {
      setIsModalOpen(true)
    }
  }, [getParam("category")])



    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
        width: "10%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => `${status}`,
        width: "10%",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        render: (createdAt) => (
          <span>
            {new Date(createdAt).toLocaleDateString("uz-UZ", {
              timeZone: "Asia/Tashkent",
            })}
          </span>
        ),
        key: "createdAt",
        width: "10%",
      },

      {
        title: "Updated",
        key: "updated",
        dataIndex: "updatedAt",
        render: (updatedAt) => <span>{new Date(updatedAt).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' })}</span>,
        width: "10%",
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (image) => <Image width={50} src={image} alt="category" />,
        width: '5%'
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <div className="flex gap-4">
            <Button
              onClick={() => handleEdit(record)}
              icon={<MdOutlineModeEdit />}
              className="!border-slate-600 !text-slate-600 !bg-white hover:!bg-slate-600 hover:!text-white"
            >
              Edit 
            </Button>
            <Button
              onClick={() => handleDelete(record._id)}
              danger

              icon={<MdDelete />}
              className="!border-red-600 !text-red-600 !bg-white hover:!bg-red-600 hover:!text-white"
            >
              Delete
            </Button>
            
          </div>
        ),
        width: "10%",
      },
    ]

    const pageSize = 7

  return (

    
    <div>
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Users </h2>
      <div className="w-full m-auto ">
        <Button className="!border-slate-700 !text-slate-700 !bg-white hover:!bg-slate-700 hover:!text-white " onClick={() => handleCreateCategory()} >Create new category</Button>
      </div>
      <TableComponent pageSize={pageSize} data={categorisData} columns={columns} title="Categories" />
      <Modal 
        title={carData ? "Update category" : "Create new category"}
        open={isModalOpen || Boolean(carData)}
        onCancel={handleCloseModal}
        maskClosable={false}
        footer={null}
      >
        <CategoryForm carData={carData} setCarData={setCarData} setIsModal={setIsModalOpen} isModal={isModalOpen} />
      </Modal>
      <Modal
        title="Delete User"
        open={openDeleteModal}
        onCancel={handleCancel}
        onOk={handleOk}
        maskClosable={false}
        footer={null}
      >
       <div>
          <p className="text-center my-10 text-xl font-semibold text-slate-700">
            Are you sure you want to delete this category ?
          </p>
          <Space className="flex justify-end">
            <Button
              className="!border-slate-700 hover:!text-white hover:!bg-slate-700 hover:!border-slate-700 !text-slate-700"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              loading={isLoading}
              disabled={isLoading}
              danger
              className="!border-red-600 !text-red-600 !bg-white hover:!bg-red-600 hover:!text-white"
              onClick={handleOk}
            >
              {" "}
              Delete
            </Button>
          </Space>
       </div>
      </Modal>
    </div>
  )
}

export default CategoryData
