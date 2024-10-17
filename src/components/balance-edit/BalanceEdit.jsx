import { BsWallet } from "react-icons/bs"; 
import { Button,  Form,  Modal} from "antd";
import {
  useGetAllUsersQuery,
  useGetUserQuery,
} from "../../redux/api/all-users-api";
import TableComponent from "../table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setEditBalanceModal } from "../../redux/slices/modal-slice";
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useEffect, useState } from "react";

import BalanceEditForm from "./BalanceEditForm";
const BalanceEdit = () => {
  
  const { getParam, removeParam, setParam } = useSearchParamsHook();
  const [form] = Form.useForm();
  const { data } = useGetAllUsersQuery();
  const { editBalanceModal } = useSelector((state) => state.modal);
  const [userId, setUserId] = useState(null);
  const { data: userAllData } = useGetUserQuery(`${userId}`);
  const dispatch = useDispatch();


  const userData = userAllData?.payload;
  const handleEdit = (record) => {
    dispatch(setEditBalanceModal(true));
    setParam("editBalance", record._id);
    setUserId(record._id);
  };
    
  

  const handleCancel = () => {
    dispatch(setEditBalanceModal(false));
    removeParam("editBalance");
    form.resetFields();
  };

  useEffect(() => {
    if (getParam("editBalance")) {
      dispatch(setEditBalanceModal(true));
    } else {
      dispatch(setEditBalanceModal(false));
    }
  }, [getParam("editBalance")]);

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
      key: "role",
      render: (text) => `${text}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => handleEdit(record)}
          className="!border-slate-600 !text-slate-600 !bg-white hover:!bg-slate-600 hover:!text-white"
        >
          Fill
        </Button>
      ),
      width: "10%",
    },
  ];

  const usersData = 12;
  return (
    <div>
      <TableComponent
        data={data?.payload}
        columns={columns}
        pageSize={usersData}
      />
      <Modal
        
        footer={null}
        open={editBalanceModal}
        maskClosable={false}
        onCancel={handleCancel}
      >
      <BalanceEditForm  userData={userData}/>
      </Modal>
    </div>
  );
};

export default BalanceEdit;
