import { BiPhone } from "react-icons/bi";
import { BiLockAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../../redux/api/auth-api";
import { useEffect, useState } from "react";
import { capitalPasswordValidation, numberPasswordValidation, symbolPasswordValidation } from "../../../validations/auth-validation";



const Register = () => {
  const [signUp, { data, isLoading, isSuccess , isError}] = useSignUpMutation()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [form] = Form.useForm();




  const onFinish = (values) => {
    signUp(values)
    setEmail(values.email)
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/verify?email=${btoa(email)}`)
      form.resetFields()
    }
    if(isError){
      message.error(data?.message)
    }
    
    
  }, [isSuccess,isError]);


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (<div className="w-full max-w-[500px]  mt-8">
    <Form
      form={form}
      name="basic"
      layout='vertical'
      className='w-full '
      wrapperCol={{
        span: 24,
      }}

      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="grid grid-cols-2 gap-5">
        <Form.Item

          name="first_name"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input style={{ height: '40px' }} placeholder="First Name" prefix={<BiUserCircle className="text-xl text-gray-300" />} />
        </Form.Item>
        <Form.Item

          name="last_name"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input style={{ height: '40px' }} placeholder="Last Name" prefix={<BiUserCircle className="text-xl text-gray-300" />} />
        </Form.Item>
      </div>
      <Form.Item

        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input style={{ height: '40px' }} placeholder="Email" type='email' prefix={<HiOutlineMail className="text-xl text-gray-300" />} />
      </Form.Item>
      <Form.Item
        className="w-full"
        hasFeedback={true}
        name="password"
        rules={[
          
          {
            required: true,
            message: 'Please input your password!',
          },
          capitalPasswordValidation,
          symbolPasswordValidation,
          numberPasswordValidation

        ]}
      >
        <Input.Password style={{ height: '40px' }} placeholder="Password" prefix={<BiLockAlt className="text-xl text-gray-300" />} />
      </Form.Item>


      <Form.Item
        className="text-center"
      >
        <Button disabled={isLoading} loading={isLoading} className='w-[150px] !mt-6 !bg-slate-700 ' type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  </div>
  )
};
export default Register;