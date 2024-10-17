import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  usePromoteUserMutation,
} from "../../../redux/api/all-users-api";
import TableComponent from "../../table/Table";
import { Button, Image, Modal, Space, message } from "antd";
import { MdDelete } from "react-icons/md";

const UsersData = () => {
  const { data } = useGetAllUsersQuery();
  const [deleteUser, { isLoading, isSuccess, isError }] = useDeleteUserMutation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPromoteModal, setOpenPromoteModal] = useState(false);
  const [userData , setUserData] = useState(null)
  const [userId, setUserId] = useState(null);
  const [promoteUser, { isLoading: isLoadingPromote, isSuccess: isSuccessPromote , isError: isErrorPromote}] = usePromoteUserMutation();

  
  

  

  const handleOk = () => {
    setOpenDeleteModal(false);
    deleteUser(userId);
  };
  const handleCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleOkPromote = () => {
      setOpenPromoteModal(false)
      promoteUser(userData?._id)

  };

  const handleCancelPromote = () => {
      setOpenPromoteModal(false)
  };

 

  const handleDelete = (userData) => {
    if (userData?.role !== "admin") {
      setOpenDeleteModal(true);
      setUserId(userData?._id);
    }
    else{
      message.error(`You can't delete ${userData?.role}`)
    }
    
  };

  const handlePromote = (userData) => {
    
    if (userData?.role !== "admin") {
      setOpenPromoteModal(true);
      setUserData(userData)
    }
    else{
     
      message.error(`You can't promote ${userData?.role}`)
    }

  };

  useEffect(() => {
    if (isSuccess) {
      message.success("User deleted successfully");
    }
    if (isError) {
      message.error("Something went wrong");
    } 
  }, [isSuccess, isError]);

  useEffect(() => {
    
    
      if (isSuccessPromote) {
        message.success("User promoted successfully");
      }
      if (isErrorPromote) {
        message.error("Something went wrong");
      
    }
    
  }, [isSuccessPromote, isErrorPromote]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => `${text}`,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text) => (
        <span
          style={{
            color: text <= 1 ? "red" : "",
          }}
        >
          ${text}
        </span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (price) => `${price}`,
      key: "role",
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
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar) =>
        avatar ? (
          <Image
            width={55}
            className="mix-blend-multiply"
            src={avatar}
            alt="user"
          />
        ) : (
          <div className="flex ">
              <Image
                width={55}
                // style={{ height: "55px" }}
                className=" bg-slate-900   border border-gray-200 rounded-full mb-5"
                src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
              />
          </div>
        ),
      key: "seats",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
       <div className="flex gap-4">
          <Button
            onClick={() => handlePromote(record)}

            className="!border-slate-600 !text-slate-600 !bg-white hover:!bg-slate-600 hover:!text-white"
          >
            Promote
          </Button>
          <Button
            onClick={() => handleDelete(record)}
            danger
            
            icon={<MdDelete />}
            className="!border-red-600 !text-red-600 !bg-white hover:!bg-red-600 hover:!text-white"
          >
            Delete
          </Button>
         
       </div>
      ),
    },
  ];

  const userPageSize = 6;
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700">Users </h2>
      <TableComponent data={data?.payload} columns={columns} pageSize={userPageSize} />
      <Modal
        title="Delete User"
        open={openDeleteModal}
        onCancel={handleCancel}
        onOk={handleOk}
        maskClosable={false}
        footer={null}
      >
        <p className="text-center my-10 text-xl font-semibold text-slate-700">
          Are you sure you want to delete this profile ?
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
      </Modal>
      <Modal 
        title="Promote User"
        open={openPromoteModal}
        onCancel={handleCancelPromote}
        onOk={handleOkPromote}
        maskClosable={false}
        footer={null}
      >
        <p className="text-center my-10 text-xl font-semibold text-slate-700">
          Are you sure you want to promote this profile ?
        </p>
        <Space className="flex justify-end">
          <Button
            className="!border-slate-700 hover:!text-white hover:!bg-slate-700 hover:!border-slate-700 !text-slate-700"
            onClick={handleCancelPromote}
          >
            Cancel
          </Button>
          <Button
            loading={isLoadingPromote}
            disabled={isLoadingPromote}
            danger
            className="!border-slate-600 !text-slate-600 !bg-white hover:!bg-slate-600 hover:!text-white"
            onClick={handleOkPromote}
          >
            {" "}
            Promote
          </Button>
        </Space>
      </Modal>
    </div>
  );
};

export default UsersData;
