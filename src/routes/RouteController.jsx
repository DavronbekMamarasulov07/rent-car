import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Suspense from "../utils";
import { useSelector } from "react-redux";


const Home = lazy(() => import("./home/Home"));
const Verify = lazy(() => import("./verify/Verify"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Liked = lazy(() => import("./liked/Liked"));
const Notification = lazy(() => import("./notification/Notification"));
const Categories = lazy(() => import("./categories/Categories"));
const Profile = lazy(() => import("./profile/Profile"));
const CarCardDetails = lazy(() => import("./car-details-page/CarDetailsPage"));
const NotFound = lazy(() => import("./not-found/NotFound"));
const Private = lazy(() => import("./Private/Private"));
const Search = lazy(() => import("./search/Search"));



const CarRent = lazy(() => import("./dashboard/car-rent/CarRent"));
const DashboardContent = lazy(() => import("./dashboard/content/Content"));
const Users = lazy(() => import("./dashboard/users/Users"));
const CategoriesCrud = lazy(() => import("./dashboard/categories-crud/CategoriesCrud"))
const Orders = lazy(() => import("./dashboard/orders/Orders"))
const Balance = lazy(() => import("./dashboard/balance/Balance"))
const Calendar = lazy(() => import("./dashboard/calendar/Calendar"))

const RouteController = () => {
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role






  return (
    <>

      <Routes>
        <Route path="/" element={<Suspense><Home /></Suspense>} />
        <Route path="liked" element={<Suspense><Liked /></Suspense>} />
        <Route path="notification" element={<Suspense><Notification /></Suspense>} />
        <Route path="car-details-page/:carId" element={<Suspense><CarCardDetails /></Suspense>} />
        <Route path="search" element={<Suspense><Search /></Suspense>} />
        <Route path="profile" element={<Suspense><Private /></Suspense>}>
          <Route path="" element={<Suspense><Profile /></Suspense>} />
        </Route>
        <Route path="verify" element={<Suspense><Verify /></Suspense>} />
        <Route path="dashboard" element={userRole !== "user" ? <Suspense><Private /></Suspense> : <Navigate to="/not-found" />}>
          <Route path="" element={<Suspense><Dashboard /></Suspense>} >
            <Route path="cars" element={<Suspense><CarRent /></Suspense>} />
            <Route path="content" element={<Suspense><DashboardContent /></Suspense>} />
            <Route path="categories-crud" element={<Suspense><CategoriesCrud /></Suspense>} />
            <Route path="users" element={<Suspense><Users /></Suspense>} />
            <Route path="orders" element={<Suspense><Orders /></Suspense>} />
            <Route path="balance" element={<Suspense><Balance /></Suspense>} />
            <Route path="calendar" element={<Suspense><Calendar /></Suspense>} />
          </Route>
        </Route>
        <Route path="categories" element={<Suspense><Categories /></Suspense>} />
        <Route path="verify/:email" element={<Suspense><Verify /></Suspense>} />
        <Route path="not-found" element={<Suspense><NotFound /></Suspense>} />
        <Route path="*" element={<Navigate to="not-found" />} />
      </Routes>

    </>
  );
};

export default RouteController;
