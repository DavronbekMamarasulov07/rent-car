import React from "react";

import { Card, Typography, Spin, Statistic } from "antd";
import {
  LoadingOutlined,
  CarOutlined,
  TagOutlined,
 
} from "@ant-design/icons";
import { useGetAllCarsQuery } from "../../../redux/api/cars-api";
import { useGetAllUsersQuery } from "../../../redux/api/all-users-api";
import { useGetAllOrdersQuery } from "../../../redux/api/order-api";
import { useGetCategoriesQuery } from "../../../redux/api/categories-api";
import { useNavigate } from "react-router-dom";
import { GiCarKey } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";

const { Title } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const DashboardContent = () => {
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const { data: cars, isLoading: isLoadingCars } = useGetAllCarsQuery();
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery();
  const { data: orders, isLoading: isLoadingOrders } = useGetAllOrdersQuery();
  const navigate = useNavigate()

  if (
    isLoadingCategories ,
    isLoadingCars ,
    isLoadingUsers ,
    isLoadingOrders
  ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  const categoryCount = categories?.payload.length  
  const carCount = cars?.payload.length  
  const userCount = users?.payload.length  
  const ordersCount = orders?.payload.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Title level={2} className="mb-6 text-center text-indigo-600">
        Dashboard Overview
      </Title>
      <div className="flex items-center justify-start gap-5">
        <Card
          onClick={() => navigate("/dashboard/categories-crud")}
          className="flex-1 transform shadow-lg transition-transform hover:scale-105"
          bordered={false}
          style={{ backgroundColor: "#f0f5ff" }}
        >
          <Statistic
            title="Categories"
            value={categoryCount}
            prefix={<TagOutlined />}
            valueStyle={{
              color: "#3f51b5",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          />
        </Card>
        <Card
          onClick={() => navigate("/dashboard/cars")}
          className="flex-1 transform shadow-lg transition-transform hover:scale-105"
          bordered={false}
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <Statistic
            title="Cars"
            value={carCount}
            prefix={<CarOutlined />}
            valueStyle={{
              color: "#0288d1",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          />
        </Card>
        <Card
          onClick={() => navigate("/dashboard/users")}
          className="flex-1 transform shadow-lg transition-transform hover:scale-105"
          bordered={false}
          style={{ backgroundColor: "#f1f8e9" }}
        >
          <Statistic
            title="Users"
            value={userCount}
            prefix={<FaUserFriends />}
            valueStyle={{
              color: "#4caf50",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          />
        </Card>
        <Card
          onClick={() => navigate("/dashboard/orders")}
          className="flex-1 transform shadow-lg transition-transform hover:scale-105"
          bordered={false}
          style={{ backgroundColor: "#fff8e1" }}
        >
          <Statistic
            title="Active Orders"
            value={ordersCount}
            prefix={<GiCarKey />}
            valueStyle={{
              color: "#ffb300",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
