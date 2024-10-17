import { Breadcrumb, Button, Layout, Modal, message } from "antd";
import {  useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Content from "../../components//dashboard/content/Content";
import Sider from "../../components/dashboard/sider/Sider";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { signOut } from "../../redux/slices/auth-slice";



const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(signOut());
    setIsModalOpen(false);
    navigate("/?auth=signIn");
    message.success("Logout successfully , Please login again to continue");

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
 

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }} >
        <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="w-full flex flex-col ">
          <div className="flex items-center gap-7 justify-between">
            <Button
              className="w-full p-3"
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="w-full flex items-center justify-between pr-12">
              <Breadcrumb
                style={{
                  fontSize: "18px",
                  color: "#424a59",
                }}
                items={[{ title: "Home", href: "/" }, { title: "Dashboard" }]}
              />
              <Button
                className="mt-auto mx-2 whitespace-normal !border-[#173257]  hover:!bg-[#173257] hover:!text-[#fff]"
                onClick={showModal}
              >
                <BsFillDoorOpenFill /> 
                  
              </Button>
            </div>
          </div>
          <Content  />
        </div>
      </Layout>
      <Modal
        title="Sign Out"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            className="!text-[#173257] !border-[#173257] !hover:text-[#173257] !hover:border-[#173257]"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={handleOk}
            className="!border-[#173257] hover:!bg-[#173257] hover:!text-[#fff] "
          >
            Sign Out <BsFillDoorOpenFill /> 
          </Button>
        ]}
      >
        <p className="text-[#173257] text-base">Are you sure you want to sign out?</p>
      </Modal>
    </div>
  );
};

export default Dashboard;
