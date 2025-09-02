import { Checkbox, Radio, TimePicker, DatePicker } from "antd";
import type { FormField } from "./model";

// 渲染对应控件
const RenderFormField: React.FC<{ field: FormField }> = ({ field }) => {
  switch (field.type) {
    case "text":
      return <span className="plug-render">文本</span>;
    case "input":
      return <span className="plug-render">当行输入</span>;
    case "textarea":
      return <span className="plug-render">多行输入</span>;
    case "select":
      return <span className="plug-render">下拉框</span>;
    case "radio":
      return (
        <Radio.Group
          value={field.config?.defaultValue || 1}
          options={
            (field.config?.options as { value: string; label: string }[]) || [
              { value: 1, label: "选项一" },
              { value: 2, label: "选项二" }
            ]
          }
          disabled
        />
      );
    case "checkbox":
      return <Checkbox.Group disabled />;
    case "time":
      return <TimePicker disabled />;
    case "dateRange":
      return <DatePicker.RangePicker disabled />;
    case "attachment":
      return <span className="plug-render">附件</span>;
    case "table":
      return <span className="plug-render">表格</span>;
    case "user":
      return <span className="plug-render">人员</span>;
    case "department":
      return <span className="plug-render">部门</span>;
    case "position":
      return <span className="plug-render">岗位</span>;
    default:
      return null;
  }
};

export default RenderFormField;
