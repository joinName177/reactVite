import React, { useEffect, useState } from "react";
import { Button, Switch, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { AuthBlock } from "./model";
const { Text } = Typography;

interface TableDataType {
  key: string;
  module: string;
  functionName: string;
  permissionName: string;
  permissionSequence: number;
  identification: string; // 接口地址
  identificationName: string; // 接口名
  dataCode: number;
  moduleId: string;
  functionId: string;
  permissionId: string;
}

const convertToTableData = (data: AuthBlock[]) => {
  const tableData: TableDataType[] = [];
  data.forEach((module) => {
    module.functions.forEach((func) => {
      func.permissions.forEach((permission) => {
        tableData.push({
          key: `${module.id}-${func.id}-${permission.id}`,
          module: module.name,
          functionName: func.name,
          permissionName: permission.name,
          permissionSequence: permission.sequence,
          identification: permission.identification,
          identificationName: permission.identificationName,
          dataCode: permission.dataCode,
          moduleId: module.id,
          functionId: func.id,
          permissionId: permission.id
        });
      });
    });
  });
  return tableData;
};

const getAuthBlock = async () => {
  // 读取json文件
  const res = await fetch("/src/pages/PermissionConfiguration/data.json");
  const data = await res.json();
  return data;
};

const AuthTable: React.FC = () => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  useEffect(()=>{
    getAuthBlock().then(data=>{
      const tableData = convertToTableData(data);
      setTableData(tableData);
    })
  },[])

  const columns: ColumnsType<TableDataType> = [
    {
      title: "功能模块",
      dataIndex: "module",
      key: "module",
      width: 120,
      render: (text: string, record: TableDataType, index: number) => {
        // 合并相同模块的单元格
        const isFirstInModule = index === 0 || tableData[index - 1].moduleId !== record.moduleId;
        if (!isFirstInModule) {
          return { children: null, props: { rowSpan: 0 } };
        }

        const moduleRowCount = tableData.filter((item) => item.moduleId === record.moduleId).length;
        return {
          children: <span>{text}</span>,
          props: { rowSpan: moduleRowCount }
        };
      }
    },
    {
      title: "权限类型",
      dataIndex: "functionName",
      key: "functionName",
      width: 150,
      render: (text: string, record: TableDataType, index: number) => {
        // 合并相同功能的单元格
        const isFirstInFunction = index === 0 || tableData[index - 1].functionId !== record.functionId || tableData[index - 1].moduleId !== record.moduleId;

        if (!isFirstInFunction) {
          return { children: null, props: { rowSpan: 0 } };
        }

        const functionRowCount = tableData.filter((item) => item.functionId === record.functionId && item.moduleId === record.moduleId).length;

        return {
          children: <span>{text}</span>,
          props: { rowSpan: functionRowCount }
        };
      }
    },
    {
      title: "权限",
      dataIndex: "permissionName",
      key: "permissionName",
      width: 200,
      render: (text: string) => <Text>{text}</Text>
    },
    {
      title: "接口地址",
      dataIndex: "identification",
      key: "identification",
      width: 200,
      render: (text: string) => <Text>{text}</Text>
    },
    {
      title: "接口名",
      dataIndex: "identificationName",
      key: "identificationName",
      width: 200,
      render: (text: string) => <Text>{text}</Text>
    },
    {
      title: "权限控制字段",
      dataIndex: "dataCode",
      key: "dataCode",
      width: 100,
      render: (code: number) => <Tag color="blue">{code}</Tag>
    },
    {
      title: "数据权限",
      dataIndex: "",
      key: "",
      width: 100,
      render: () => <Switch />
    }
  ];

  return (
    <>
      <Button type="primary">编辑</Button>
      <Table<TableDataType> bordered columns={columns} dataSource={tableData} pagination={false} size="middle" />
    </>
  );
};

export default AuthTable;
