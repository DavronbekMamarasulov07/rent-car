import { BsFillCalendarDateFill } from "react-icons/bs"; 
import { AiFillTags } from "react-icons/ai"; 
import { BsWallet2 } from "react-icons/bs"; 
import { MdDashboard } from "react-icons/md"; 
import { GiCarKey } from "react-icons/gi"; 
import { BiCategory } from "react-icons/bi"; 
import { FaUserFriends } from "react-icons/fa"; 
import { BiCar } from "react-icons/bi"; 
import {  Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { ContentText  } from '../../../utils';
import "./Sider.css"


const { Sider } = Layout;

const SiderComponent = ({ collapsed }) => {

    

    return (
        <Sider theme='light' trigger={null} collapsed={collapsed} className='py-7'>
            <div className="flex flex-col justify-between flex-1 h-auto">
                <div className="w-full">
                   {
                        !collapsed && <ContentText className='text-[#94A7CB66] ml-7 mb-5 block'>M A I N  M E N </ContentText>
                   }
                    <Menu

                        selectable={false}
                        mode="inline"
                        theme="light"
                        style={{ color: "#94A7CB66" }}
                        inlineCollapsed={collapsed}
                        items={[
                            {
                                key: "1",
                                icon: <MdDashboard />,
                                label: <NavLink end to="content">Dashboard</NavLink>,
                            },
                            {
                                key: "2",
                                icon: <BiCar />,
                                label: <NavLink to="cars">Car  </NavLink>,
                            },
                            {
                                key: "3",
                                icon: <FaUserFriends />,
                                label: <NavLink to="users">Users</NavLink>,
                            },
                            {
                                key: "5",
                                icon: <AiFillTags />,
                                label: <NavLink to='categories-crud'>Categories</NavLink>,
                            },
                            {
                                key: "6",
                                icon: <GiCarKey />,
                                label: <NavLink to="orders">Orders</NavLink>,
                            },
                            {
                                key: "7",
                                icon: <BsWallet2 />,
                                label: <NavLink to="balance">Balance</NavLink>,
                            },
                            {
                                key: "8",
                                icon: <BsFillCalendarDateFill />,
                                label: <NavLink to="calendar">Calendar</NavLink>,
                            }
                        ]}
                    >

                    </Menu>

                </div>
               
            </div>
           
        </Sider>
    )
}

export default SiderComponent
