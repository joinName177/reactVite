import "../styles/pages/FormConfiguration.less";
import { formComponents } from "../components/FormConfiguration/config";
import { getFormIconAsync } from "../utils/imageUtils";
import { useState, useEffect } from "react";
import type { DraggedItem, FormField } from "../components/FormConfiguration/model";
import DraggableComponent from "../components/FormConfiguration/DraggableComponent";
import DroppableArea from "../components/FormConfiguration/DroppableArea";

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
  const handleDrop = (item: DraggedItem) => {
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
    setFormFields(prev => [...prev, newField]);
  };

  // 移除表单字段
  const removeField = (fieldId: string) => {
    setFormFields(prev => prev.filter(field => field.id !== fieldId));
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
            imageUrls={imageUrls}
          />
        </div>
      </div>
    </div>
  );
}


