import { Button, Image, Modal } from "antd";
import { useGetAllOrdersQuery, useDeleteOrderMutation } from "../../../redux/api/order-api";
import TableComponent from "../../table/Table";
import { MdDelete, MdEdit } from "react-icons/md";



const OrderData = () => {
  const {data } = useGetAllOrdersQuery()
  const [deleteOrder] = useDeleteOrderMutation()

  const handleEdit = (record) => {
    console.log(record)
  }

  const handleDelete = (record) => {
    deleteOrder(record?._id)
  }

  console.log(data?.payload)
  const columns = [
    {
      title: "Full Name",
      key: "full_name",
      render: (text, record) => (
        <a>{`${record?.user_id?.first_name || ''} ${record?.user_id?.last_name || ''}`}</a>
      ),
      width: "15%"
    },
    {
      title: "Car name",
      key: "car_name",
      render: (text, record) => (
        <p>{`${record?.car_id?.name || ''} ${record?.car_id?.model || ''}`}</p>
      ),
      width: "15%",
    },

    {
      title: "Ordered Time",
      key: "ordered_time",
      render: (text, record) => {
        const formattedFromDate = new Date(record?.fromDate).toLocaleDateString("uz-UZ", {
          timeZone: "Asia/Tashkent",
        });
        const formattedToDate = new Date(record?.toDate).toLocaleDateString("uz-UZ", {
          timeZone: "Asia/Tashkent",
        });
        return (
          <p>{`From - ${formattedFromDate} / To - ${formattedToDate}`}</p>
        );
      },

      width: "20%",
    },
    
    {
      title: "Payment",
      key: "payment",
      
      children: [
        {
          title: "Method",
          dataIndex: "payment_method",
          render: (price) => `${(price).toUpperCase()}`,
          key: "payment_method",
          width: "10%",
        },
        {
          title: "Status",
          dataIndex: "payment_status",
          render: (status) => `${status}`,
          key: "payment_status",
          width: "10%",
        },
      ],
    },
    {
      title: "Order Price",
      dataIndex: "total_price",
      render: (text, record) => (
        <p>
          ${record?.total_price}
        </p>
      ),
      key: "order_price",
      width: "10%",
    },
    {
      title: "Car image",
      key: "car_image",
      render: (text, record) => {
        const thumbnail = record?.car_id?.thumbnail;
        return (
          thumbnail && (
            <Image
              width={55}
              className="mix-blend-multiply"
              src={thumbnail}
              alt="car"
            />
          )
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <Button
            onClick={() => handleEdit(record)}
            danger
            icon={<MdEdit />}
            className="!border-slate-600 !text-slate-600 !bg-white hover:!bg-slate-600 hover:!text-white"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record)}
            danger

            icon={<MdDelete />}
            className="!border-red-600 !text-red-600 !bg-white hover:!bg-red-600 hover:!text-white"
          >
            Delete
          </Button>

        </div>
      ),
    },
  ];


  const ordersPageSize = 10
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700">Orders </h2>
      <TableComponent data={data?.payload} columns={columns} pageSize={ordersPageSize} />
      {/* <Modal
        title="Delete User"
        open={openDeleteModal}
        onCancel={handleCancel}
        onOk={handleOk}
        maskClosable={false}
        footer={null}
      >
        <p className="text-center my-10 text-xl font-semibold text-slate-700">
          Are you sure you want to delete this profile ?
        </p>
        <Space className="flex justify-end">
          <Button
            className="!border-slate-700 hover:!text-white hover:!bg-slate-700 hover:!border-slate-700 !text-slate-700"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            loading={isLoading}
            disabled={isLoading}
            danger
            className="!border-red-600 !text-red-600 !bg-white hover:!bg-red-600 hover:!text-white"
            onClick={handleOk}
          >
            {" "}
            Delete
          </Button>
        </Space>
      </Modal> */}
    </div>
  )
}

export default OrderData
