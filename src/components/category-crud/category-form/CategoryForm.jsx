import { Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useDeleteFileMutation } from "../../../redux/api/file-api";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "../../../redux/api/categories-api";
import useSearchParamsHook from "../../../hooks/UseQueryParams";

const CategoryForm = ({ setIsModal, carData, setCarData }) => {
  const [form] = useForm()
  const { removeParam } = useSearchParamsHook()
  const [categoryImage, setCategoryImage] = useState('');
  const [createCategory, { data: categoryData, isSuccess, isError }] = useCreateCategoryMutation()
  const [deleteFile] = useDeleteFileMutation()
  const [updateCategory, {
    data: updateCategories,
    isSuccess: updateSuccess,
    isError: updateError
  }] = useUpdateCategoryMutation()

  const onFinish = (values) => {
    createCategory({ name: values.name, image: categoryImage, status: "active" })
  };
  const onUpdate = (values) => {
    updateCategory({ body: { ...values, image: carData.image }, id: carData._id })
  }
  const deletedFile = (data) => {
    console.log(data?.split("/").slice(-1)[0])
    deleteFile({ name: data?.split("/").slice(-1)[0] })
  }
  const handleUploadFile = ({ file }) => {
    if (file.status !== 'uploading') {
      const formData = new FormData();
      formData.append('file', file)
      fetch("http://13.51.206.62:8000/api/upload/single", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      }).then(res => res.json())
        .then(data => {
          setCarData({ ...carData, image: data?.payload });
          setCategoryImage(data?.payload)
        })
        

    }
  }

  useEffect(() => {
    if (isSuccess) {
      message.success(categoryData?.message);
      setIsModal(false)
      setCarData(null)
      form.resetFields()
      removeParam("category")
    }
    if (isError) {
      message.error("Error creating category");
    }
  }, [isSuccess, isError]);
  useEffect(() => {
    form.setFieldsValue({ ...carData })

    if (carData === null) {
      form.resetFields()
    }
  }, [carData, form]);
  useEffect(() => {
    if (updateSuccess) {
      message.success(updateCategories?.message);
      setIsModal(false)
      setCarData(null)
      removeParam("category")
    }
    if (updateError) {
      message.error(updateCategories?.message || "Something went wrong update categorise");
    }
  }, [updateSuccess, updateError])

  return (
    <div>
      <Form
        form={form}
        initialValues={carData}
        className="w-full"
        layout="vertical"
        wrapperCol={{
          span: 24,
        }}

        onFinish={carData?.name ? onUpdate : onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Category name"
          name="name"
          rules={[
            {
              min: 4,
              required: true,
              message: 'Please input category name!',
            },
          ]}
        >
          <Input className="text-[16px] border rounded border-slate-400 hover:border-slate-500"
            placeholder="Enter car category" />
        </Form.Item>

        <Form.Item
          label="Category image"
          name="image"
          rules={[{ required: true, message: "Please upload a category image" }]}
        >
          <Upload fileList={carData?.image ? [{
            url: carData?.image,
            uid: carData?.image,
            name: carData?.name,
          }] : null} listType="picture-card" maxCount={1} beforeUpload={() => false} onChange={handleUploadFile}
            onRemove={() => deletedFile(carData?.image)}>
            <div>
              <UploadOutlined />
              <div className="mt-2">Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          {
            Boolean(carData?.name) ? <Button
              disabled={!categoryImage}
              loading={!categoryImage}
              className="w-full bg-gray-500 text-white hover:!bg-white hover:!text-gray-500 hover:!border-gray-500"
              htmlType="submit">
              Update category
            </Button> :
              <Button
                disabled={!categoryImage}
                loading={!categoryImage}
                className="w-full bg-gray-500 text-white hover:!bg-white hover:!text-gray-500 hover:!border-gray-500"
                htmlType="submit">
                Create new category
              </Button>
          }
        </Form.Item>
      </Form>
    </div>
  )
}
export default CategoryForm
