import { FaDollarSign } from "react-icons/fa";
import { Button, Form,  InputNumber,  Select, message } from "antd";
import { useUpdateUserMutation } from "../../redux/api/all-users-api";
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useEffect } from "react";

const BalanceEditForm = ({ userData }) => {
  const { getParam, removeParam } = useSearchParamsHook();
  const { Option } = Select;
  const [ updateUser, { isLoading, isError, isSuccess } ] = useUpdateUserMutation();
  const [form] = Form.useForm(); 

  const onFinish = ({ balance }) => {
    updateUser({ body: { balance: balance + userData?.balance }, id: getParam("editBalance") });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Balance updated successfully");
      removeParam("editBalance");
    }
    if (isError) {
      message.error("Error updating balance");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!getParam("editBalance")) {
      form.resetFields();
    }
  }, [getParam("editBalance")]);

  console.log(userData)
  

  return (
    <div >
      <h2 className="text-xl font-bold mb-5 text-slate-500">Edit Balance <strong className="text-2xl text-slate-700 underline">{userData?.first_name}</strong></h2>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        autoComplete="off"
        onFinish={onFinish}
        className="mt-10"
      >
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
              placeholder="Please input  balance!"
              // min={0}
              className="w-full"
              formatter={(value) => `${value} $`}
            />
          </Form.Item>
        </div>
        <Form.Item className="text-right">
          
          <Button
            loading={isLoading}
            disabled={isLoading}
            htmlType="submit"
            className="!border-slate-700 !text-slate-700 !bg-white hover:!bg-slate-700 hover:!text-white"
          >
            Fill
          </Button>


        </Form.Item>
      </Form>
    </div>
  )
}

export default BalanceEditForm
