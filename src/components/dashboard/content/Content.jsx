import {  Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const DashboardContent = () => {
  return (
    <Content
      style={{
        margin: '0 16px 20px 16px ',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 7px 15px',
        padding: 24,
        background: '#fff',
        borderRadius: '15px',
      }}
    >
        <Outlet />
    </Content>
  );
};

export default DashboardContent;
