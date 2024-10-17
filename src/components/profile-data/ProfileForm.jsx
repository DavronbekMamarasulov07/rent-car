

import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { setEditProfModal } from '../../redux/slices/modal-slice';
import { useDispatch } from 'react-redux';
import useSearchParamsHook from '../../hooks/UseQueryParams';
import { useUpdateUserMutation } from '../../redux/api/all-users-api';
import { useState, useEffect } from 'react';
import { useDeleteFileMutation } from '../../redux/api/file-api';
import { FaDollarSign } from 'react-icons/fa';

const ProfileForm = ({ userDataForModal }) => {
    const [avatar, setAvatar] = useState([]);
    const dispatch = useDispatch();
    const [updateUser] = useUpdateUserMutation();
    const [deleteFile] = useDeleteFileMutation();
    const { removeParam } = useSearchParamsHook();

    useEffect(() => {
        if (userDataForModal?.avatar) {
            setAvatar([{
                uid: '-1',
                name: 'avatar',
                status: 'done',
                url: userDataForModal?.avatar, 
            }]);
        }
    }, [userDataForModal]);

    const handleFileUploadChange = ({ file }) => {
        if (file.status !== "uploading") {
            const formData = new FormData();
            formData.append("file", file);

            fetch(import.meta.env.VITE_BASE_URL + "upload/single", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setAvatar([{
                        uid: file.uid,
                        name: file.name,
                        status: 'done',
                        url: data?.payload, 
                    }]);
                });
        }
    };

    const onFinish = (values) => {
        dispatch(setEditProfModal(false));
        removeParam("edit");
        removeParam("userId");
        updateUser({ body: { ...values, avatar: avatar[0]?.url }, id: userDataForModal?._id });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const deleteAvatar = (data) => {
        deleteFile({ name: data?.name });
        setAvatar([]);
    };

    return (
        <div className='w-full flex justify-center px-10 pt-10'>
            <Form
                name="basic"
                layout='vertical'
                className='w-full'
                initialValues={{
                    ...userDataForModal
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Avatar Image"
                    name="avatar"
                >
                    <div className="border border-dashed border-gray-300 px-4 py-2">
                        <Upload
                            maxCount={1}
                            onRemove={(data) => deleteAvatar(data)}
                            listType="picture-card"
                            beforeUpload={() => false}
                            onChange={handleFileUploadChange}
                            fileList={avatar}
                        >
                            <div>
                                <UploadOutlined />
                                <div className="mt-2">Upload</div>
                            </div>
                        </Upload>
                    </div>
                </Form.Item>
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last name"
                    name="last_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        className="!mb-4"
                        name="payment_method"
                        label="Payment Method"
                        rules={[{ required: true, message: 'Please select the payment method!' }]}
                    >
                        <Select
                            className="text-[16px] py-[16px] border rounded border-slate-400 hover:border-slate-500 w-full bg-white"
                            placeholder="Select payment method">
                            <Option value="cash">Cash</Option>
                            <Option value="card">Card</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Balance"
                        name="balance"
                        rules={[
                            {
                                required: true,
                                message: "Please input your balance!",
                            },
                        ]}
                    >
                        <InputNumber
                            prefix={<FaDollarSign className=" text-gray-300" />}
                            placeholder="Please input balance!"
                            min={0}
                            className="w-full"
                            formatter={(value) => `${value} $`}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    className='text-center mt-10'
                >
                    <Button className='!bg-slate-700' type="primary" htmlType="submit">
                        Edit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ProfileForm;
