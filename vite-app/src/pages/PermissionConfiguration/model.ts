// 权限配置模型

// 公共类型
export interface BaseModel {
  id: string;
  name: string;
  sequence: number;
}

// 块
export interface AuthBlock extends BaseModel {
  functions: FunctionModule[];
}

// 功能
export interface FunctionModule extends BaseModel {
  permissions: PermissionModule[];
}

// 权限
export interface PermissionModule extends BaseModel {
  dataCode: number;
  fields: string[];
  identification: string;
  identificationName: string;
}