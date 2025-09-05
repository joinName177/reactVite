import { Table } from "antd";

export default function index() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "John Brown",
    },
    {
      key: "2",
      name: "Jim Green",
    },
    {
      key: "3",
      name: "Joe Black",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}
