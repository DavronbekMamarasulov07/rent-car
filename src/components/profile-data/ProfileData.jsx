import { BsWallet2 } from "react-icons/bs"; 
import Container from "../container/Container";
import { Card, Button, Image, Modal } from "antd";
import {
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEditProfModal } from "../../redux/slices/modal-slice";
import ProfileForm from "./ProfileForm";
import { Loading } from "../../utils";
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useGetMeQuery } from "../../redux/api/all-users-api";
import { useState } from "react";
import { signOut } from "../../redux/slices/auth-slice";
import { AiOutlineLogin } from "react-icons/ai";

const ProfileData = () => {
  const { setParam, removeParam } = useSearchParamsHook();
  const { data, isLoading, isError } = useGetMeQuery();
  const { editProfModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const[userDataForModal, setUserDataForModal] = useState()


  if (isLoading) {
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center mt-[200px]">Error loading profile data.</div>
    );
  }

  const handleEditProf = (data) => {
    dispatch(setEditProfModal(true));
    setParam("edit", "open");
    setUserDataForModal(data);
  };

  const handleCancel = () => {
    dispatch(setEditProfModal(false));
    removeParam("edit");
  };

  const handleLogOut = () => {
    dispatch(signOut());
  };

  const userData = data?.payload;

  return (
    <div className="mt-[200px]">
      <Container>
        <div className=" flex justify-center items-center ">
          <Card className="max-w-sm w-full shadow-lg items-center rounded-lg ">
            <div className="flex flex-col items-center overflow-hidden ">
              <div className="overflow-hidden rounded-full w-64 h-64 border-1 mb-7">
                {userData?.avatar ? (
                  <Image
                    className="rounded-full object-cover"
                    src={userData.avatar}
                    alt="Profile"
                    height={"100%"} 
                  />  
                ) : (
                  <Image
                    className="bg-slate-900 border border-gray-200 rounded-full object-cover"
                    src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                    alt="Default Profile"
                    height={"100%"} 
                  />
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {userData?.first_name} {userData?.last_name}
              </h2>
              <p className="text-sm text-gray-500 flex items-center mb-2">
                <UserOutlined className="mr-2" /> {userData?.role}
              </p>
              <Link to={`mailto:${userData?.email}`}>
                <p className="text-sm text-gray-500 flex items-center mb-4">
                  <MailOutlined className="mr-2" /> {userData?.email}
                </p>
              </Link>
              <p className="text-sm text-gray-500 flex items-center mb-4">
                <CalendarOutlined className="mr-2" /> Joined{" "}
                {moment(userData?.createdAt).format("MMMM Do, YYYY")}
              </p>
              <strong className="text-base text-gray-500 flex items-center mb-4 ">
                <BsWallet2  className="mr-2" />  Balance: <span className="underline mx-1" style={userData?.balance > 0 ? { color: "green" } : { color: "red" }}>{userData?.balance} </span> $
              </strong>
             <div className="flex gap-2 items-center justify-items-center">
                <Button
                  onClick={() => handleEditProf(userData)}
                  className="!bg-slate-700 mt-5"
                  type="primary"
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={() => handleLogOut()}
                  className="!bg-red-500 mt-5"
                  type="primary"
                >
                  Log Out  
                </Button>
             </div>
            </div>
          </Card>
        </div>
      </Container>
      <Modal
        title={"Edit Profile"}
        open={editProfModal}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <ProfileForm  userDataForModal={userDataForModal}/>
      </Modal>
    </div>
  );
};

export default ProfileData;
