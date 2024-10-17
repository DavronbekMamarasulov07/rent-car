
import { Form, DatePicker, Button, Select, Input, message } from 'antd'
import { capitalPasswordValidation } from '../../../validations/auth-validation'
import moment from 'moment';
import { useEffect, useState } from 'react';
import "./OrderForm.css"
import { useCreateOrderMutation } from '../../../redux/api/order-api';
import { useGetMeQuery } from '../../../redux/api/all-users-api';
import useSearchParamsHook from '../../../hooks/UseQueryParams';
const { RangePicker } = DatePicker



const OrderForm = ({ carRentPrice , openModal  }) => {
  const { getParam, removeParam } = useSearchParamsHook()
  const [total, setTotal] = useState(0);
  const [dateTo, setDateTo] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [createdOrder, { isLoading , data, isSuccess, isError}] = useCreateOrderMutation();
  const { data: userData } = useGetMeQuery()
  const [form] = Form.useForm();
  

  console.log(userData)


  useEffect(() => {
    if (isSuccess) {
      message.success(data?.message)
      removeParam("order")
    }
    if (isError) {
      message.error("Something went wrong")
      removeParam("order")

    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (!getParam("order")) {
      form.resetFields();
      setTotal(0);
    }
  }, [getParam])

  

  const onFinish = (values) => {
    const licence_num = (values.licence_number).toUpperCase()
    createdOrder({
      user_id: userData?.payload?._id,
      car_id: getParam("order"),
      total_price: total,
      payment_status: "paid",
      payment_method: values.payment_method,
      fromDate: dateFrom,
      toDate: dateTo,
      driver_licence_number: licence_num
    })

  }

  const getDate = (dates, dateStrings) => {
    const date1 = moment(dateStrings[0]);
    const date2 = moment(dateStrings[1]);
    setDateTo(date2)
    setDateFrom(date1);
    if (date2 > date1) {
      const differenceInDays = date2.diff(date1, 'days');
      setTotal(differenceInDays * carRentPrice)
    }
  }


  return (
    <div className="w-full pt-6 px-4 ">
      <div className="text-center">
        <h1 className='text-3xl font-bold mb-5'>Create Order</h1>
      </div>
      <Form
        form={form}
        className="w-full"
        name="Create order"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          className="!mb-4"
          name="date_range"
          label="Date Range"
          rules={[{ required: true, message: 'Please select the date range!' }]}
        >
          <RangePicker className="w-full py-[6px] border border-slate-400 hover:!border-slate-400"
           onChange={getDate}  />
        </Form.Item>


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
          className="!mb-4"
          label="Driver license"
          name="licence_number"
          rules={[
            {
              required: true,
              message: 'Please input your driver\'s license!',
            },
            capitalPasswordValidation
          ]}
        >
          <Input className="text-[16px] border rounded border-slate-400 hover:border-slate-500"
            placeholder="AA123456" />
        </Form.Item>

        <div className="text-right mb-12 mt-8">
          <p className="text-xl"><strong>Car total:</strong> ${total}</p>
        </div>

        <Form.Item className='text-center '>
          
          <Button
            className="w-[150px] bg-slate-700  text-center text-white hover:!bg-white hover:!text-slate-700  hover:!border-slate-700  py-5"
            htmlType="submit">
            Create order
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default OrderForm



