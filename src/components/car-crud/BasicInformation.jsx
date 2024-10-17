import { Button, Form, Input, Select } from "antd";
import { FaCar, FaBuilding } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import { useGetCategoriesQuery } from "../../redux/api/categories-api";
import carsYear from "../../db/index";
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useEffect } from "react";
import { useGetCarQuery } from "../../redux/api/cars-api";
import { useDispatch, useSelector } from "react-redux";
import { updateBasicInformation } from "../../redux/slices/form-slice";

const BasicInformation = ({  type }) => {
  const { data } = useGetCategoriesQuery();
  const [form] = Form.useForm();
  const { setParam, getParam } = useSearchParamsHook();
  const carDataID = getParam("carId");
  const { data: getData } = useGetCarQuery(carDataID);
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.form);

  useEffect(() => {
    form.setFieldsValue(getData?.payload);
  }, [getData?.payload]);

  const onFinish = (value) => {
    dispatch(updateBasicInformation(value));
    if (type === "update") {
      setParam("carUpdate", "step2")
    }
    if (type === "create") {
      setParam("car", "step2");
    }
  }

  useEffect(() => {
    if (getParam("car")) {
      form.resetFields();
    }
  }, [getParam("car")]);

  return (
    <div className="w-full flex items-center justify-center py-8 ">
      <Form
        form={form}
        name="login"
        initialValues={
          (type === "update" && getData?.payload) ||
          (type === "create" && formValues)
        }
        layout="vertical"
        style={{
          width: "100%",
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Car name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input car name !",
              },
            ]}
          >
            <Input
              prefix={<FaCar className="text-xl text-gray-300" />}
              placeholder="Car name"
              autoComplete="name"
            />
          </Form.Item>
          <Form.Item
            label="Car model"
            name="model"
            rules={[
              {
                required: true,
                message: "Please input car model !",
              },
            ]}
          >
            <Input
              prefix={<FaBuilding className="text-xl text-gray-300" />}
              placeholder="Car model"
              autoComplete="model"
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="Car category"
            name="category"
            rules={[
              { required: true, message: "Please select a car category!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a car category"
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                width: "100%",
              }}
              options={
                data?.payload?.map((item, index) => ({
                  key: index,
                  value: item._id,
                  label: item.name,
                })) || []
              }
            />
          </Form.Item>
          <Form.Item
            label="Year"
            name="year"
            rules={[{ required: true, message: "Please select a year!" }]}
          >
            <Select
              showSearch
              placeholder="Select a year"
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                width: "100%",
              }}
              options={
                carsYear?.map((item, index) => ({
                  key: index,
                  value: item.year,
                  label: item.year,
                })) || []
              }
            />
          </Form.Item>
          <Form.Item
            label="Number of seats"
            name="seats"
            rules={[
              {
                required: true,
                message: "Please input number of seats!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a car category"
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                width: "100%",
              }}
              options={[
                {
                  value: 2,
                  label: "2",
                },
                {
                  value: 5,
                  label: "5",
                },
                {
                  value: 7,
                  label: "7",
                },
                {
                  value: 9,
                  label: "9",
                },
              ]}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
          ]}
        >
          <TextArea
            placeholder=" Enter input your description"
            autoSize={{ minRows: 5, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mt-10">
          <Button className="!bg-[#173257]" type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BasicInformation;
