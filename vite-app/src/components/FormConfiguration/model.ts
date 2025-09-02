// 拖拽项类型定义
export interface DraggedItem {
  type: string;
  label: string;
  componentType: string;
}

// 表单字段类型定义
export interface FormField {
  id: string;
  type: string;
  label: string;
  componentType: string;
  config?: Record<string, unknown>;
}

// 表单组件类型定义
export interface FormComponent {
  label: string;
  type: string;
}