import { BiLockAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { Button, Form, Input, message } from 'antd';
import { useSignInMutation } from "../../../redux/api/auth-api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { capitalPasswordValidation, numberPasswordValidation, symbolPasswordValidation } from "../../../validations/auth-validation";
import { setModal } from "../../../redux/slices/modal-slice";
import { useNavigate } from "react-router-dom";
import useSearchParamsHook from "../../../hooks/UseQueryParams";
import { signIn } from "../../../redux/slices/auth-slice";



const Login = () => {


  const [signIN, { data, isLoading, isSuccess, isError }] = useSignInMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { removeParam } = useSearchParamsHook();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    signIN(values)
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Sign in Successfully")
      dispatch(signIn({
        token: data?.payload?.accessToken,
        user: data?.payload?.user
      }))
      removeParam("auth")
      dispatch(setModal(false))
      form.resetFields()

    }
    if (isError) {
      message.error("Something went wrong")
    }

  }, [isSuccess, isError]);


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-full max-w-[500px] ">
      <Form
        form={form}
        layout='vertical'
        className='w-full mt-8'
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
        <Form.Item

          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input autoComplete="email" style={{ height: '40px' }} placeholder="Email" type='email' prefix={<HiOutlineMail className="text-xl text-gray-300" />} />
        </Form.Item>

        <Form.Item
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
          <Input.Password autoComplete="password" style={{ height: '40px' }} placeholder="Password" prefix={<BiLockAlt className="text-xl text-gray-300" />} />
        </Form.Item>

        <Form.Item
          className="flex justify-center"
        >
          <Button disabled={isLoading} loading={isLoading} className='w-[150px] !mt-6 !bg-slate-700 ' type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};
export default Login;