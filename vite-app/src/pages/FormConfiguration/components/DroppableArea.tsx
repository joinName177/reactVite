import { Button } from "antd";
import type { DraggedItem, FormField, FormFieldDragItem } from "./model";
import { useDrop, useDrag } from "react-dnd";
import { useState, useCallback } from "react";
import "../../../styles/components/DroppableArea.less";
import RenderFormField from "./RenderFormField";

interface DroppableAreaProps {
  onDrop: (item: DraggedItem, insertIndex?: number) => void;
  formFields: FormField[];
  onRemoveField: (fieldId: string) => void;
  onReorderFields: (fromIndex: number, toIndex: number) => void;
  imageUrls: { [key: string]: string };
}

// 插入指示器组件
const InsertIndicator: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className="insert-indicator"
      style={{
        animation: "insertPulse 1.5s ease-in-out infinite",
        transform: "translateZ(0)",
      }}
    />
  );
};

// 拖拽预览项组件
const DragPreviewItem: React.FC<{ item: DraggedItem }> = ({ item }) => {
  return (
    <div 
      className="drag-preview-item"
      style={{
        animation: "previewPulse 2s ease-in-out infinite",
        transform: "translateZ(0)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="drag-handle text-gray-400 cursor-move mr-2">
            ⋮⋮
          </div>
          <span className="font-medium">{item.label}</span>
          <div className="flex-1">
            <span className="plug-render">预览 - {item.label}</span>
          </div>
        </div>
        <Button className="text-red-500 hover:text-red-700 text-sm" disabled>
          删除
        </Button>
      </div>
    </div>
  );
};

// 拖拽区域组件
const DropZone: React.FC<{
  index: number;
  onHover: (index: number) => void;
  isActive: boolean;
}> = ({ index, onHover, isActive }) => {
  const [, drop] = useDrop({
    accept: ["FORM_COMPONENT", "FORM_FIELD_SORT"],
    hover: () => {
      onHover(index);
    },
  });

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={`drop-zone ${isActive ? 'active' : ''}`}
      style={{
        height: isActive ? "12px" : "4px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        margin: isActive ? "8px 0" : "4px 0",
      }}
    >
      <InsertIndicator isVisible={isActive} />
    </div>
  );
};

// 可拖拽的表单字段项组件
const DraggableFormField: React.FC<{
  field: FormField;
  index: number;
  onRemoveField: (fieldId: string) => void;
  onReorderFields: (fromIndex: number, toIndex: number) => void;
}> = ({ field, index, onRemoveField, onReorderFields }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "FORM_FIELD_SORT",
    item: { type: "FORM_FIELD_SORT", fieldId: field.id, index } as FormFieldDragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "FORM_FIELD_SORT",
    drop: (item: FormFieldDragItem) => {
      if (item.fieldId !== field.id) {
        onReorderFields(item.index, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(node);
          drop(node);
        }
      }}
      className={`form-field-item ${isDragging ? "opacity-50" : ""} ${isOver ? "border-blue-500 bg-blue-50" : ""}`}
      style={{ 
        opacity: isDragging ? 0.3 : 1,
        cursor: "move",
        transform: isDragging 
          ? "scale(0.95) rotate(1deg) translateZ(0)" 
          : isOver 
            ? "scale(1.02) translateZ(0)" 
            : "scale(1) translateZ(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isDragging 
          ? "0 8px 25px rgba(0, 0, 0, 0.2)" 
          : isOver 
            ? "0 4px 15px rgba(24, 144, 255, 0.3)" 
            : "0 2px 8px rgba(0, 0, 0, 0.1)",
        animation: isDragging ? "dragBounce 0.6s ease-in-out infinite" : "none",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="drag-handle text-gray-400 cursor-move mr-2">
            ⋮⋮
          </div>
          <span className="font-medium">{field.label}</span>
          <div className="flex-1">
            <RenderFormField field={field} />
          </div>
        </div>
        <Button onClick={() => onRemoveField(field.id)} className="text-red-500 hover:text-red-700 text-sm">
          删除
        </Button>
      </div>
    </div>
  );
};

// 可放置的区域
const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, formFields, onRemoveField, onReorderFields }) => {
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [draggedFromLeft, setDraggedFromLeft] = useState<DraggedItem | null>(null);

  const handleHover = useCallback((index: number) => {
    setInsertIndex(index);
  }, []);

  const [{ isOver }, drop] = useDrop({
    accept: ["FORM_COMPONENT", "FORM_FIELD_SORT"],
    drop: (item: DraggedItem | FormFieldDragItem) => {
      if ('componentType' in item) {
        onDrop(item, insertIndex || undefined);
      }
      setInsertIndex(null);
      setDraggedFromLeft(null);
    },
    hover: (item: DraggedItem | FormFieldDragItem) => {
      if ('componentType' in item) {
        setDraggedFromLeft(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  // 渲染字段列表，包含插入预览
  const renderFormFields = () => {
    const result: React.ReactNode[] = [];
    
    for (let i = 0; i <= formFields.length; i++) {
      // 添加拖拽区域
      result.push(
        <DropZone
          key={`drop-${i}`}
          index={i}
          onHover={handleHover}
          isActive={insertIndex === i && draggedFromLeft !== null}
        />
      );
      
      // 在插入位置显示预览项
      if (insertIndex === i && draggedFromLeft) {
        result.push(
          <DragPreviewItem key="preview" item={draggedFromLeft} />
        );
      }
      
      // 添加现有字段
      if (i < formFields.length) {
        result.push(
          <DraggableFormField
            key={formFields[i].id}
            field={formFields[i]}
            index={i}
            onRemoveField={onRemoveField}
            onReorderFields={onReorderFields}
          />
        );
      }
    }
    
    return result;
  };

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={`droppable-area flex-1 p-4 border-2 border-dashed rounded ${isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      style={{ 
        minHeight: "200px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isOver ? "scale(1.01)" : "scale(1)",
        boxShadow: isOver ? "0 8px 25px rgba(24, 144, 255, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {formFields.length === 0 && !draggedFromLeft ? (
        <div className="text-center text-gray-500 mt-8">
          <p>拖拽左侧控件到此处</p>
        </div>
      ) : (
        <div className="flex flex-column">
          {renderFormFields()}
        </div>
      )}
    </div>
  );
};
export default DroppableArea;


