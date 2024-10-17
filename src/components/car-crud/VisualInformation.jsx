// import React, { useState } from 'react';
import { Tag, Form, Input, InputNumber, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useSearchParamsHook from "../../hooks/UseQueryParams";
import { useDeleteFileMutation } from "../../redux/api/file-api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetCarQuery } from "../../redux/api/cars-api";
import {  updateVisualInformation } from "../../redux/slices/form-slice";

const VisualInformation = ({ type }) => {
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const formValues = useSelector((state) => state.form)
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { setParam, getParam } = useSearchParamsHook();
  const [deleteFile] = useDeleteFileMutation();
  const carDataID = getParam("carId")
  const { data: getData } = useGetCarQuery(carDataID)

  useEffect(() => {
    form.setFieldsValue(getData?.payload);
  }, [getData?.payload])

  useEffect(() => {
    if (getParam("car")) {
      form.resetFields();
    }
  }, [getParam("car")]);

  const fileListThumbnail = thumbnail
    ? [{
      uid: thumbnail,
      name: thumbnail,
      url: thumbnail,
    }]
    : getData?.payload?.thumbnail
      ? [{
        uid: getData?.payload?.thumbnail,
        name: getData?.payload?.thumbnail,
        url: getData?.payload?.thumbnail,
      }]
      : [];



  const handleFilesUploadChange = ({ file, fileList }) => {

    if (file.status !== "uploading") {
      const formData = new FormData();

      for (let i = 0; i < fileList.length; i++) {
        formData.append("files", fileList[i].originFileObj);
      }

      fetch(import.meta.env.VITE_BASE_URL + "upload/multiple", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setImages(data?.payload);
        });
    }
  };

  const handleFileUploadChange = ({ file }) => {
    if (file.status !== "uploading") {
      const formData = new FormData();
      formData.append("file", file);

      fetch(import.meta.env.VITE_BASE_URL + "upload/single", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setThumbnail(data?.payload);
          form.setFieldsValue({ thumbnail: data?.payload });
        });
    }
  };




  const onFinish = (value) => {
    dispatch(updateVisualInformation({ ...value, images, thumbnail }));
    if (type === "update") {
      setParam("carUpdate", "step3")
    }
    if (type === "create") {
      setParam("car", "step3");
    }
  };

  const handleRemoveImage = (data) => {
    deleteFile(data.originFileObj?.name);
  };

  const handleRemoveThumbnail = (data) => {
    deleteFile(data.name);
    setThumbnail(null);
    form.setFieldsValue({ thumbnail: null });
  };



  const handlePrevious = () => {
    if (type === "update") {
      setParam("carUpdate", "step1")
    }
    if (type === "create") {
      setParam("car", "step1")
    }
  }

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        autoComplete="off"
        initialValues={type === "update" ? getData?.payload : formValues}
        onFinish={onFinish}
      >
        <div className="grid grid-cols-1 ">
          <Form.Item
            label="Car images"
            name="images"
            rules={[{ required: true, message: "Please upload car images!" }]}
          >
            <div className="border border-dashed border-gray-300  px-4  py-2 ">
              <Upload
                fileList={

                  images.length > 0 ? images.map((image) => ({
                    uid: image,
                    name: image,
                    url: image,
                  })) 
                  : 
                    getData?.payload?.images?.map((image) => ({
                      uid: image,
                      name: image,
                      url: image,
                    })) 
                    
                }
                className="w-full overflow-scroll  "
                listType="picture-card"
                onRemove={(data) => handleRemoveImage(data)}
                multiple
                beforeUpload={() => false}
                onChange={handleFilesUploadChange}
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Upload</div>
                </div>
              </Upload>
            </div>
          </Form.Item>
          <Form.Item
            label="Thumbnail image"
            name="thumbnail"
            rules={[
              { required: true, message: "Please input your thumbnail image!" },
            ]}
          >
            <div className="border border-dashed border-gray-300 px-4  py-2 ">
              <Upload
                fileList={fileListThumbnail}
                listType="picture-card"
                beforeUpload={() => false}
                onChange={handleFileUploadChange}
                onRemove={handleRemoveThumbnail}
              >

                <div>
                  <UploadOutlined />
                  <div className="mt-2">Upload</div>
                </div>
              </Upload>

            </div>
          </Form.Item>
        </div>
        <div className="grid grid-cols-2">
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

export default VisualInformation;
