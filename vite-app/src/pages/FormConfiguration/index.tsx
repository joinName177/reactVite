import "../../styles/pages/FormConfiguration.less";
import { formComponents } from "./components/config";
import { getFormIconAsync } from "../../utils/imageUtils";
import { useState, useEffect } from "react";
import type { DraggedItem, FormField } from "./components/model";
import DraggableComponent from "./components/DraggableComponent";
import DroppableArea from "./components/DroppableArea";

export default function FormConfiguration() {
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [formFields, setFormFields] = useState<FormField[]>([]);

  useEffect(() => {
    // 预加载所有图片
    const loadImages = async () => {
      const urls: { [key: string]: string } = {};
      for (const component of formComponents) {
        const imageUrl = await getFormIconAsync(component.type);
        if (imageUrl) {
          urls[component.type] = imageUrl;
        }
      }
      setImageUrls(urls);
    };

    loadImages();
  }, []);

  // 处理拖拽放置
  const handleDrop = (item: DraggedItem, insertIndex?: number) => {
    const newField: FormField = {
      id: `${item.componentType}_${Date.now()}`,
      type: item.type,
      label: item.label,
      componentType: item.componentType,
      config: {
        options: [],
        placeholder: '',
        required: false,
        disabled: false,
        readonly: false,
        hidden: false,
        defaultValue: '',
      }
    };
    
    if (insertIndex !== undefined) {
      // 在指定位置插入
      setFormFields(prev => {
        const newFields = [...prev];
        newFields.splice(insertIndex, 0, newField);
        return newFields;
      });
    } else {
      // 在末尾添加
      setFormFields(prev => [...prev, newField]);
    }
  };

  // 移除表单字段
  const removeField = (fieldId: string) => {
    setFormFields(prev => prev.filter(field => field.id !== fieldId));
  };

  // 重新排序表单字段
  const reorderFields = (fromIndex: number, toIndex: number) => {
    setFormFields(prev => {
      const newFields = [...prev];
      const [movedField] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, movedField);
      return newFields;
    });
  };

  return (
    <div className="form-configuration h100 flex gap-4">
      {/* 左侧表单控件选项 */}
      <div className="left-container flex flex-column">
        <div className="left-header p-4">
          <h4>表单控件</h4>
        </div>
        <div className="left-content flex-1 flex flex-wrap gap-4">
          {formComponents.map((item) => (
            <DraggableComponent 
              key={item.type} 
              item={item} 
              imageUrl={imageUrls[item.type]}
            />
          ))}
        </div>
      </div>
      {/* 右侧表单配置 */}
      <div className="right-container flex-1 p-4 flex flex-column">
        <div className="right-header">
          <h4>表单配置</h4>
        </div>
        <div className="right-content flex-1 flex flex-column">
          <DroppableArea 
            onDrop={handleDrop} 
            formFields={formFields} 
            onRemoveField={removeField}
            onReorderFields={reorderFields}
            imageUrls={imageUrls}
          />
        </div>
      </div>
    </div>
  );
}


