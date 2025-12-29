import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Button, Input, Select, Switch, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { AuthBlock } from "./model";
import "./index.less";

const { Text } = Typography;

interface TableDataType {
  key: string;
  module: string;
  functionName: string;
  permissionName: string;
  permissionSequence: number;
  identification: string;
  identificationName: string;
  dataCode: number;
  moduleId: string;
  functionId: string;
  permissionId: string;
}

// 缓存转换函数，避免重复计算
const convertToTableData = (data: AuthBlock[]): TableDataType[] => {
  return data.flatMap((module) =>
    module.functions.flatMap((func) =>
      func.permissions.map((permission) => ({
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
      }))
    )
  );
};

// 预计算模块和功能的行数
const precomputeRowSpans = (tableData: TableDataType[]) => {
  const moduleRowCounts: Record<string, number> = {};
  const functionRowCounts: Record<string, number> = {};

  tableData.forEach((item) => {
    moduleRowCounts[item.moduleId] = (moduleRowCounts[item.moduleId] || 0) + 1;
    const functionKey = `${item.moduleId}-${item.functionId}`;
    functionRowCounts[functionKey] = (functionRowCounts[functionKey] || 0) + 1;
  });

  return { moduleRowCounts, functionRowCounts };
};

const getAuthBlock = async (): Promise<AuthBlock[]> => {
  const res = await fetch("/src/pages/PermissionConfiguration/data.json");
  const data = await res.json();
  return data;
};

// 使用 React.memo 优化单元格渲染
const ModuleCell = React.memo(({ text }: { text: string }) => <span>{text}</span>);

const FunctionCell = React.memo(({ text }: { text: string }) => <span>{text}</span>);

const PermissionCell = React.memo(({ text, isEdit }: { text: string; isEdit: boolean }) => (isEdit ? <Input value={text} /> : <span>{text}</span>));

const AuthTable: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [rowSpanInfo, setRowSpanInfo] = useState<{
    moduleRowCounts: Record<string, number>;
    functionRowCounts: Record<string, number>;
  }>({ moduleRowCounts: {}, functionRowCounts: {} });

  useEffect(() => {
    getAuthBlock().then((data) => {
      const convertedData = convertToTableData(data);
      setTableData(convertedData);
      setRowSpanInfo(precomputeRowSpans(convertedData));
    });
  }, []);

  const toggleEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  // 使用 useMemo 缓存 columns，避免每次渲染都重新创建
  const columns: ColumnsType<TableDataType> = useMemo(
    () => [
      {
        title: <span className="cell-required">模块</span>,
        dataIndex: "module",
        key: "module",
        width: 120,
        render: (text: string, record: TableDataType, index: number) => {
          const isFirstInModule = index === 0 || tableData[index - 1]?.moduleId !== record.moduleId;
          if (!isFirstInModule) {
            return { children: null, props: { rowSpan: 0 } };
          }

          const rowSpan = rowSpanInfo.moduleRowCounts[record.moduleId] || 1;
          return {
            children: <ModuleCell text={text} />,
            props: { rowSpan }
          };
        }
      },
      {
        title: <span className="cell-required">权限类型</span>,
        dataIndex: "functionName",
        key: "functionName",
        width: 150,
        render: (text: string, record: TableDataType, index: number) => {
          const isFirstInFunction = index === 0 || tableData[index - 1]?.functionId !== record.functionId || tableData[index - 1]?.moduleId !== record.moduleId;

          if (!isFirstInFunction) {
            return { children: null, props: { rowSpan: 0 } };
          }

          const functionKey = `${record.moduleId}-${record.functionId}`;
          const rowSpan = rowSpanInfo.functionRowCounts[functionKey] || 1;

          return {
            children: <FunctionCell text={text} />,
            props: { rowSpan }
          };
        }
      },
      {
        title: <span className="cell-required">权限</span>,
        dataIndex: "permissionName",
        key: "permissionName",
        width: 200,
        render: (text: string) => <PermissionCell text={text} isEdit={isEdit} />
      },
      {
        title: <span className="cell-required">接口地址</span>,
        dataIndex: "identification",
        key: "identification",
        width: 200,
        render: (text: string) => <Text>{text}</Text>
      },
      {
        title: <span className="cell-required">接口名</span>,
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
        render: () => (
          <Select
            style={{
              width: 160
            }}
            options={[{ label: "1", value: 1 }]}
          />
        )
      },
      {
        title: "数据权限",
        dataIndex: "",
        key: "",
        width: 100,
        render: () => <Switch />
      }
    ],
    [isEdit, tableData, rowSpanInfo]
  );

  // 使用虚拟滚动优化大数据量性能
  const tableProps = useMemo(
    () => ({
      bordered: true,
      size: "middle" as const,
      // virtual: true,
      scroll: { x: 1000, y: 600 } // 设置固定高度启用虚拟滚动
    }),
    []
  );

  return (
    <>
      <Button type="primary" onClick={toggleEdit}>
        {isEdit ? "保存" : "编辑"}
      </Button>
      <Table columns={columns} dataSource={tableData} {...tableProps} pagination={false}/>
    </>
  );
};

export default React.memo(AuthTable);
