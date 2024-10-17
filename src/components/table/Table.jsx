import { Table } from "antd";

const TableComponent = ({ data = [], loading, columns, pageSize }) => {
  if (!Array.isArray(data)) {
    console.error("Invalid data source: Expected an array");
    return null;
  }

  return (
    <>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        className="mt-10"
        size="small"
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: pageSize }}
      />
    </>
  );
};

export default TableComponent;
