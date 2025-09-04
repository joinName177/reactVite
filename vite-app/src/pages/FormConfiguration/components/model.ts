// 拖拽项类型定义
export interface DraggedItem {
  type: string;
  label: string;
  componentType: string;
}

// 表单字段拖拽项类型定义（用于排序）
export interface FormFieldDragItem {
  type: "FORM_FIELD_SORT";
  fieldId: string;
  index: number;
}

// 拖拽预览状态
export interface DragPreviewState {
  isDragging: boolean;
  draggedItem?: DraggedItem | FormFieldDragItem;
  insertIndex?: number;
  isFromLeftPanel?: boolean;
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