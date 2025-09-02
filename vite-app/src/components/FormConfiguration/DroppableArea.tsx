import { Button } from "antd";
import type { DraggedItem, FormField } from "./model";
import { useDrop } from "react-dnd";
import "../../styles/components/DroppableArea.less";
import RenderFormField from "./RenderFormField";

interface DroppableAreaProps {
  onDrop: (item: DraggedItem) => void;
  formFields: FormField[];
  onRemoveField: (fieldId: string) => void;
  imageUrls: { [key: string]: string };
}

// 可放置的区域
const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, formFields, onRemoveField }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "FORM_COMPONENT",
    drop: (item: DraggedItem) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  console.log(formFields);

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={`droppable-area flex-1 p-4 border-2 border-dashed rounded ${isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      style={{ minHeight: "200px" }}
    >
      {formFields.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p>拖拽左侧控件到此处</p>
        </div>
      ) : (
        <div className="flex flex-column gap-1">
          {formFields.map((field) => (
            <div key={field.id} className="form-field-item">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
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
          ))}
        </div>
      )}
    </div>
  );
};
export default DroppableArea;


