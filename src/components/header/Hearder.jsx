import { AiOutlineLogin } from "react-icons/ai";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { AutoComplete, Avatar, Badge, Dropdown, Form, Image, Modal, Space } from "antd";

import Container from "../container/Container";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../Auth/Auth";
import {  signOut } from "../../redux/slices/auth-slice";
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useGetMeQuery } from "../../redux/api/all-users-api";
import { useSearchCarsQuery } from "../../redux/api/cars-api";
import { setModal } from "../../redux/slices/modal-slice";

const Hearder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { data: searchData } = useSearchCarsQuery({ q: search })
  const { modalVisibilable } = useSelector((state) => state.modal);
  const { token } = useSelector((state) => state.auth);
  const { setParam, getParam, removeParam } = useSearchParamsHook();
  const { likedCars } = useSelector((state) => state.like);
  const likeCount = likedCars?.length
  const { data, isLoading, isError } = useGetMeQuery();
  const [form] = Form.useForm();

  const userData = data?.payload;

  const user = useSelector((state) => state.auth.user);

  const userRole = user?.role



  


  const handleLogOut = () => {
    dispatch(signOut());
  };

  const items = [
    {
      key: "1",
      icon: (
        <RiAccountPinBoxFill style={{ fontSize: "1rem", color: "#596780" }} />
      ),
      label: (
        <Link to="/profile">
          <strong style={{ color: "#596780", fontSize: "1rem" }}>Profile</strong>
        </Link>
      ),
    },
    userRole !== "user" && {
      key: "2",
      icon: (
        <MdDashboard style={{ fontSize: "1rem", color: "#596780" }} />
      ),
      label: (
        <Link to={"/dashboard/content"}>
          <strong style={{ color: "#596780", fontSize: "1rem" }}>
            Dashboard
          </strong>
        </Link>
      ),
    },
    {
      key: "3",
      icon: <AiOutlineLogin style={{ fontSize: "1rem", color: "red" }} />,
      label: (
        <strong onClick={handleLogOut} style={{ color: "red", fontSize: "1rem" }}>
          Log Out
        </strong>
      ),
    },
  ];

  useEffect(() => {
    if (getParam("auth")) {
      dispatch(setModal(true));
    } else {
      dispatch(setModal(false));
    }
  }, [getParam("auth")]);

  const loadData =  (searchText) => {
    try {
      setSearch(searchText);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    dispatch(setModal(false));
    removeParam("auth");
    form.resetFields();
  };
  const handleModalVisible = () => {
    setParam("auth", "signIn");
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const handleSearchSubmit = (value) => {
      
    navigate(`/search?q=${value.search}`);
  };

  return (
    <>
      <div className="bg-white fixed top-0 z-10  w-full  boxShadow border-b  mx-auto">
        <Container>
          <div className="flex items-center justify-between py-4 ">
            <div className="flex items-center gap-16">
              <Link to={"/"}>
                <h2 className="text-[40px] font-bold text-[#596780]">
                  DM-Rent
                </h2>
              </Link>
              <Form initialValues={{ search: getParam("q") }} onFinish={handleSearchSubmit} className="flex items-center  gap-3 bg-[#fefefe]  w-[500px] py-1 px-4 rounded-[62px] border border-gray-300 hover:border-[#1677FF]">
                <BiSearch className="text-[#0000005f] text-2xl" />
                <Form.Item
                  name="search"
                  className="w-full !mb-0"
                  rules={[{ required: false }]}
                  
                >
                  <AutoComplete
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        navigate(`/search?q=${search}`);
                      }
                    }}
                    
                   
                    options={searchData?.payload?.map((item) => ({
                      label: (
                        <Link
                          className="block"
                          key={item._id}
                          to={`/car-details-page/${item._id}`}
                        >
                          {item.name}
                        </Link>
                      ),
                    }))}
                    className="search_input "
                    onSelect={onSelect}
                    onSearch={(text) =>
                      text ? loadData(text) : loadData({ payload: [] })
                    }
                    placeholder="Search..."
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="flex items-center gap-3 ">
              <Link to={"/liked"}>
                <Badge size="large" overflowCount={10} count={likeCount}>
                  <span className="block p-2 border border-gray-200 rounded-full">
                    <AiFillHeart className="text-[#596780] text-2xl" />
                  </span>
                </Badge>
              </Link>

              {/* <Link to={"/notification"}>
                <Badge count={5}>
                <div className="p-2 border border-gray-200 rounded-full">
                  <IoIosNotifications className="text-[#596780] text-2xl" />
                </div>
                </Badge>
              </Link> */}
              {token ? <></> : (
                <div
                  onClick={() => handleModalVisible()}
                  className="p-2 border border-gray-200 rounded-full "
                >
                  <BiLogInCircle className="text-[#596780] text-2xl" />
                </div>
              )}
              {token && (

                <Dropdown
                  placement="bottom"
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                     {
                       userData?.avatar ? 
                       <Avatar
                         className=" w-10 h-10  border border-gray-200 rounded-full"
                         src={userData?.avatar}
                       /> 
                       : 
                       <Avatar
                         className=" bg-slate-900 w-10 h-10  border border-gray-200 rounded-full"
                         src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                       />
                     }
                     

                    </Space>
                  </a>
                </Dropdown>
              )}
            </div>
          </div>
        </Container>
      </div>
      <Modal
        centered
        open={modalVisibilable}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
        <AuthForm />
      </Modal>
    </>
  );
};

export default Hearder;
