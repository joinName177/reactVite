import React, { useState } from 'react';
import { Button, message, Modal, Radio, Space } from 'antd';
import html2canvas from 'html2canvas';
import '../../../styles/pages/Home.less'

interface ExcelData {
  html: string;
  text: string;
  isExcelTable: boolean;
}

export default function ExcelToImg() {
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertType, setConvertType] = useState<'image' | 'text'>('image');
  const [result, setResult] = useState<string>('');

  // 检测是否为Excel表格
  const detectExcelTable = (clipboardData: DataTransfer): ExcelData | null => {
    const html = clipboardData.getData('text/html');
    const text = clipboardData.getData('text/plain');
    
    // 检测Excel特征
    const isExcelTable = 
      html.includes('<table') || 
      html.includes('mso-') || 
      html.includes('xl') ||
      (text.includes('\t') && text.split('\n').length > 1) ||
      text.split('\t').length > 2;

    return {
      html,
      text,
      isExcelTable
    };
  };

  // 处理粘贴事件
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    
    const detectedData = detectExcelTable(clipboardData);
    
    if (detectedData?.isExcelTable) {
      setExcelData(detectedData);
      setShowConvertModal(true);
    } else {
      // 普通文本直接插入
      const text = clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
      message.info('检测到普通文本，已直接插入');
    }
  };

  // 转换为图片
  const convertToImage = async () => {
    if (!excelData) return;

    try {
      // 创建临时容器
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.visibility = 'visible';
      tempContainer.style.padding = '20px';
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      
      // 设置HTML内容
      if (excelData.html) {
        tempContainer.innerHTML = excelData.html;
      } else {
        // 如果没有HTML，将文本转换为表格
        const lines = excelData.text.split('\n').filter(line => line.trim());
        let tableHtml = '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">';
        
        lines.forEach(line => {
          const cells = line.split('\t');
          tableHtml += '<tr>';
          cells.forEach(cell => {
            tableHtml += `<td style="border: 1px solid #ccc; padding: 5px;">${cell}</td>`;
          });
          tableHtml += '</tr>';
        });
        tableHtml += '</table>';
        tempContainer.innerHTML = tableHtml;
      }

      document.body.appendChild(tempContainer);

      // 等待渲染
      await new Promise(resolve => setTimeout(resolve, 300));

      // 转换为图片
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      // 创建图片URL
      const imageUrl = canvas.toDataURL('image/png');
      
      // 清理临时容器
      document.body.removeChild(tempContainer);

      setResult(imageUrl);
      message.success('Excel表格已转换为图片');
    } catch (error) {
      console.error('转换失败:', error);
      message.error('转换失败，请重试');
    }
  };

  // 转换为文字
  const convertToText = () => {
    if (!excelData) return;

    let textResult = '';
    
    if (excelData.html) {
      // 从HTML中提取文本
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = excelData.html;
      textResult = tempDiv.textContent || tempDiv.innerText || '';
    } else {
      textResult = excelData.text;
    }

    // 格式化文本（将制表符替换为空格，美化格式）
    textResult = textResult
      .replace(/\t/g, '  ') // 制表符替换为两个空格
      .replace(/\n\s*\n/g, '\n') // 移除多余的空行
      .trim();

    setResult(textResult);
    message.success('Excel表格已转换为文字');
  };

  // 执行转换
  const handleConvert = () => {
    if (convertType === 'image') {
      convertToImage();
    } else {
      convertToText();
    }
    setShowConvertModal(false);
    setExcelData(null);
  };

  // 复制结果
  const copyResult = () => {
    if (convertType === 'image') {
      // 复制图片到剪贴板
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob
              })
            ]).then(() => {
              message.success('图片已复制到剪贴板');
            }).catch(() => {
              message.error('复制失败');
            });
          }
        });
      };
      
      img.src = result;
    } else {
      // 复制文本到剪贴板
      navigator.clipboard.writeText(result).then(() => {
        message.success('文字已复制到剪贴板');
      }).catch(() => {
        message.error('复制失败');
      });
    }
  };

  // 下载结果
  const downloadResult = () => {
    if (convertType === 'image') {
      const link = document.createElement('a');
      link.download = 'excel_table.png';
      link.href = result;
      link.click();
    } else {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'excel_table.txt';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Excel表格转换工具</h2>
      <p>请粘贴从Excel复制的表格内容，系统将自动检测并提供转换选项</p>
      
      <div
        className="excel-to-img-container"
        contentEditable
        onPaste={handlePaste}
        style={{
          width: '100%',
          minHeight: '200px',
          border: '2px dashed #ccc',
          padding: '20px',
          margin: '20px 0',
          borderRadius: '8px',
          backgroundColor: '#fafafa',
          fontSize: '16px',
          lineHeight: '1.5',
        }}
        data-placeholder="请在此处粘贴Excel表格内容..."
      />

      {/* 转换结果展示 */}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>转换结果</h3>
          <div className="excel-convert-result" style={{ 
            border: '1px solid #ddd', 
            padding: '20px', 
            borderRadius: '8px',
            backgroundColor: '#fff',
            marginBottom: '10px'
          }}>
            {convertType === 'image' ? (
              <img 
                src={result} 
                alt="转换结果" 
                className="result-image"
              />
            ) : (
              <pre className="result-text">
                {result}
              </pre>
            )}
          </div>
          
          <Space>
            <Button type="primary" onClick={copyResult}>
              复制到剪贴板
            </Button>
            <Button onClick={downloadResult}>
              下载文件
            </Button>
            <Button onClick={() => setResult('')}>
              清除结果
            </Button>
          </Space>
        </div>
      )}

      {/* 转换选项弹窗 */}
      <Modal
        title="检测到Excel表格"
        open={showConvertModal}
        onOk={handleConvert}
        onCancel={() => {
          setShowConvertModal(false);
          setExcelData(null);
        }}
        okText="转换"
        cancelText="取消"
      >
        <p>检测到您粘贴的是Excel表格内容，请选择转换方式：</p>
        
        <Radio.Group 
          value={convertType} 
          onChange={(e) => setConvertType(e.target.value)}
          style={{ marginTop: '16px' }}
        >
          <Space direction="vertical">
            <Radio value="image">
              <strong>转换为图片</strong>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                将表格转换为PNG图片，保持原有格式和样式
              </div>
            </Radio>
            <Radio value="text">
              <strong>转换为文字</strong>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                将表格转换为纯文本格式，便于编辑和复制
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
}
