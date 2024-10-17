import { SiSpeedtest } from "react-icons/si";

import { Tag, Form, InputNumber, Select, Button, message } from "antd";
import { FaDollarSign, FaGasPump } from "react-icons/fa";
import {
  useGetCarQuery,
} from "../../redux/api/cars-api";
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTechnicalInformation } from "../../redux/slices/form-slice";


const options = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "silver", label: "Silver" },
  { value: "gray", label: "Gray" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "orange", label: "Orange" },
  { value: "brown", label: "Brown" },
  { value: "gold", label: "Gold" },
  { value: "beige", label: "Beige" },
  { value: "teal", label: "Teal" },
];

const TechnicalInformation = ({  type }) => {
  const { setParam, getParam } = useSearchParamsHook();
  const [form] = Form.useForm();
  const carDataID = getParam("carId");
  const { data: getData } = useGetCarQuery(carDataID);
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.form);

  useEffect(() => {
    form.setFieldsValue(getData?.payload);
  }, [getData?.payload]);

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginInlineEnd: 4,
        }}
        key={value}
      >
        {label}
      </Tag>
    );
  };

  const id = carDataID;

  const onFinish = (value) => {
    dispatch(updateTechnicalInformation(value));
    if (type === "update") {
      setParam("carUpdate", "step4");
    }
    if (type === "create") {
      setParam("car", "step4");
    }
  };



  

  const handlePrevious = () => {
    if (type === "update") {
      setParam("carUpdate", "step2");
    }
    if (type === "create") {
      setParam("car", "step2");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-8 ">
      <Form
        form={form}
        initialValues={
          (type === "update" && getData?.payload) ||
          (type === "create" && formValues)
        }
        onFinish={onFinish}
        layout="vertical"
        style={{
          width: "100%",
        }}
        autoComplete="off"
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Fuel type"
            name="fuel"
            rules={[
              {
                required: true,
                message: "Please input  fuel type !",
              },
            ]}
          >
            <Select
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                width: "100%",
              }}
              placeholder="Select fuel type"
            >
              <Option value="petrol">Petrol</Option>
              <Option value="diesel">Diesel</Option>
              <Option value="electric">Electric</Option>
              <Option value="hybrid">Hybrid</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Transmission type"
            name="transmission"
            rules={[
              {
                required: true,
                message: "Please input transmission type !",
              },
            ]}
          >
            <Select
              showSearch
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                width: "100%",
              }}
              placeholder="Select transmission type"
            >
              <Option value="manual">Manual</Option>
              <Option value="automatic">Automatic</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex items-center gap-4">
          <Form.Item
            className="flex-1"
            label="Primary Color"
            name="color"
            rules={[
              { required: true, message: "Please enter the primary color" },
            ]}
          >
            <Select
              className="text-[16px] border rounded border-slate-400 hover:border-slate-500 w-full"
              style={{
                width: "100%",
              }}
              placeholder="Select Colors"
              options={options}
            />
          </Form.Item>

          <Form.Item
            className="flex-1 line-clamp-1"
            label="Available Colors (If HEX, use #hashtag)"
            name="colors"
            rules={[
              { required: true, message: "Please enter available colors" },
            ]}
          >
            <Select
              className="text-[16px] border rounded border-slate-400 hover:border-slate-500 w-full"
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Select Colors"
              options={options}
              tagRender={tagRender}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="Car price"
            name="price"
            rules={[
              { required: true, message: "Please input your car price!" },
            ]}
          >
            <InputNumber
              prefix={<FaDollarSign className=" text-gray-300" />}
              min={1}
              className="w-full"
              placeholder="Please input your car price"
            />
          </Form.Item>
          <Form.Item
            label="Car rent price"
            name="rent_price"
            rules={[
              { required: true, message: "Please input your car rent price!" },
            ]}
          >
            <InputNumber
              prefix={<FaDollarSign className=" text-gray-300" />}
              min={1}
              className="w-full"
              placeholder="Please input your car rent price!"
            />
          </Form.Item>

          <Form.Item
            label="Car discount"
            name="discount"
            rules={[
              { required: true, message: "Please input your car discount!" },
            ]}
          >
            <InputNumber
              prefix={<FaDollarSign className=" text-gray-300" />}
              placeholder="Please input your car discount!"
              min={0}
              className="w-full"
              formatter={(value) => `${value} %`}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            className="flex-1"
            label="Capacity fuel (L)"
            name="capacity_fuel"
            rules={[{ required: true, message: "Please enter the usage" }]}
          >
            <InputNumber
              prefix={<FaGasPump className=" text-gray-300" />}
              min={0}
              placeholder="Enter fuel tank capacity"
              className="w-full text-[16px] border rounded border-slate-400 hover:border-slate-500"
              formatter={(value) => `${value} L`}
              parser={(value) => value.replace(/\s?L|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            label="Usage (L/km)"
            name="usage_per_km"
            rules={[{ required: true, message: "Please enter the usage" }]}
          >
            <InputNumber
              min={0}
              prefix={<SiSpeedtest className=" text-gray-300" />}
              placeholder="Enter fuel tank capacity"
              className="w-full text-[16px] border rounded border-slate-400 hover:border-slate-500"
              formatter={(value) => `${value} L`}
              parser={(value) => value.replace(/\s?L|(,*)/g, "")}
            />
          </Form.Item>
        </div>
        <div className="flex items-center justify-end gap-5 w-full ">
          <Form.Item className="flex justify-center mt-10">
            <Button
              className="!border-[#173257] hover:!text-[#173257]"
              onClick={() => handlePrevious()}
            >
              Previous
            </Button>
          </Form.Item>
          <Form.Item className="flex justify-center mt-10">
            <Button className="!bg-[#173257]" type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default TechnicalInformation;
