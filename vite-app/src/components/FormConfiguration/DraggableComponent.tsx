import { useDrag } from "react-dnd";
import type { FormComponent } from "./model";

// 可拖拽的组件
const DraggableComponent:React.FC<{ item: FormComponent; imageUrl?: string }> = ({ item, imageUrl }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FORM_COMPONENT',
    item: {
      type: item.type,
      label: item.label,
      componentType: item.type
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      className={`left-content-item flex flex-column items-center gap-1 cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={item.label}
          className="form-icon"
        />
      )}
      {item.label}
    </div>
  );
}
export default DraggableComponent;