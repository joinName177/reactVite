import React, { useState, useCallback, useMemo } from "react";
import { Button, Form, Input, Typography, message, Checkbox, AutoComplete } from "antd";
import type { FormProps } from "antd";

import weChatIcon from "@/assets/images/login/weChatLoginIn.png";

import userIcon from "@/assets/images/login/username.png";
import pwIcon from "@/assets/images/login/password.png";

import EyeTwoTone from "@/assets/images/login/password_eye.png";
import EyeInvisibleOutlined from "@/assets/images/login/password_eye_invisible.png";

import { regEmail, regPhone } from "@/utils/regex";

const { Text } = Typography;

// ==================== 类型定义 ====================

/**
 * 账号选项接口
 */
interface AccountOption {
  value: string;
  label?: string;
  password?: string;
  rememberMe?: boolean;
}

/**
 * 登录表单数据接口
 */
interface LoginFormValues {
  account: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * 登录表单组件属性
 */
interface LoginFormProps {
  /** 提交回调 */
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  /**忘记密码回调 */
  onForgotPassword: () => void;
  /**微信登陆回调 */
  onWeChatLogin: () => void;
  /** 加载状态 */
  loading?: boolean;
}

// ==================== 常量定义 ====================

/** 账号最大长度 */
const ACCOUNT_MAX_LENGTH = 25;

/** 密码最小长度 */
const PASSWORD_MIN_LENGTH = 6;

// ==================== 登录表单组件 ====================

/**
 * 登录表单组件
 */
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onForgotPassword, onWeChatLogin, loading = false }) => {
  const [form] = Form.useForm<LoginFormValues>();
  const [submitting, setSubmitting] = useState(false);
  // 账号历史记录选项（TODO: 从 localStorage 或其他数据源加载）
  const [options] = useState<AccountOption[]>([]);

  const isLoading = loading || submitting;

  // ==================== 表单验证规则 ====================

  /**
   * 账号验证规则（使用 useMemo 缓存，避免每次渲染重新创建）
   */
  const accountRules = useMemo(
    () => [
      { required: true, message: "请输入账号" },
      {
        validator: (_: unknown, value: string) => {
          if (!value) {
            return Promise.resolve();
          }
          // 验证手机号或邮箱（使用 || 而不是 &&）
          const isValidPhone = regPhone.test(value);
          const isValidEmail = regEmail.test(value);

          if (isValidPhone || isValidEmail) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("请输入正确的手机号码或邮箱"));
        }
      }
    ],
    []
  );

  /**
   * 密码验证规则（使用 useMemo 缓存）
   */
  const passwordRules = useMemo(
    () => [
      { required: true, message: "请输入密码" },
      { min: PASSWORD_MIN_LENGTH, message: `密码长度至少${PASSWORD_MIN_LENGTH}个字符` }
    ],
    []
  );

  // ==================== 事件处理函数 ====================

  /**
   * 处理表单提交
   */
  const handleSubmit: FormProps<LoginFormValues>["onFinish"] = useCallback(
    async (values: LoginFormValues) => {
      try {
        setSubmitting(true);
        await onSubmit?.(values);
      } catch (error) {
        message.error("登录失败，请重试");
        console.error("登录错误:", error);
      } finally {
        setSubmitting(false);
      }
    },
    [onSubmit]
  );

  /**
   * 根据账号获取密码和记住密码状态
   * @param account 账号
   */
  const getPasswordByAccount = useCallback(
    (account: string) => {
      const currentItem = options?.find((item) => item.value === account) as AccountOption | undefined;

      if (!currentItem) {
        return;
      }

      // 设置表单值
      form.setFieldsValue({
        rememberMe: currentItem.rememberMe ?? false,
        account: currentItem.value as string,
        password: currentItem.password || ""
      });

      // 验证表单
      form.validateFields();
    },
    [options, form]
  );

  /**
   * 处理账号输入变化
   * @param value 输入的账号值
   */
  const handleAccountChange = useCallback(
    (value: string) => {
      // 如果账号为空，清空密码和记住密码
      if (!value || value.trim() === "") {
        form.setFieldsValue({
          rememberMe: false,
          password: ""
        });
        return;
      }

      // 查找匹配的选项
      const matchedOption = options?.find((item) => String(item.value).toUpperCase() === value.toUpperCase()) as AccountOption | undefined;

      // 如果找到匹配的选项，自动填充密码和记住密码状态
      if (matchedOption) {
        form.setFieldsValue({
          rememberMe: matchedOption.rememberMe ?? false,
          account: matchedOption.value as string,
          password: matchedOption.password || ""
        });
      }
    },
    [options, form]
  );

  /**
   * 处理键盘事件，获取输入值
   * @param e 键盘事件
   */
  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;
      const inputElement = target.tagName === "INPUT" ? (target as HTMLInputElement) : ((e.currentTarget as HTMLElement).querySelector("input") as HTMLInputElement);

      const value = inputElement?.value || "";
      handleAccountChange(value);
    },
    [handleAccountChange]
  );

  /**
   * 处理清除账号
   */
  const handleClearAccount = useCallback(() => {
    form.setFieldsValue({ password: "" });
  }, [form]);

  /**
   * 处理忘记密码点击
   */
  const handleForgotPassword = useCallback(() => {
    onForgotPassword?.();
  }, [onForgotPassword]);

  /**
   * 处理微信登录点击
   */
  const handleWeChatLogin = useCallback(() => {
    onWeChatLogin?.();
  }, [onWeChatLogin]);

  /**
   * 过滤选项（不区分大小写）
   */
  const filterOptions = useCallback((inputValue: string, option?: AccountOption) => {
    if (!option) return false;
    const optionValue = String(option.value || "").toUpperCase();
    const searchValue = inputValue.toUpperCase();
    return optionValue.indexOf(searchValue) !== -1;
  }, []);

  // ==================== 渲染 ====================

  return (
    <div className="login-form">
      {/* 表单标题 */}
      <Text className="login-form-title" type="secondary">
        账号密码登录
      </Text>
      <Form form={form} name="login" onFinish={handleSubmit} layout="vertical" size="large" className="login-form-content" autoComplete="off">
        {/* 账号输入 */}
        <Form.Item name="account" rules={accountRules}>
          <AutoComplete
            className="user-list-droplist"
            dropdownClassName="account-dropdown"
            allowClear
            onClear={handleClearAccount}
            clearIcon={<span className="input_clear_icon" />}
            options={options}
            filterOption={filterOptions}
            onSelect={getPasswordByAccount}
            onKeyUp={handleKeyUp}
          >
            <Input
              prefix={<img src={userIcon} alt="账号图标" />}
              placeholder="请输入账号"
              size="large"
              maxLength={ACCOUNT_MAX_LENGTH}
              onChange={(e) => handleAccountChange(e.target.value)}
            />
          </AutoComplete>
        </Form.Item>
        <Form.Item name="password" rules={passwordRules}>
          <Input.Password
            iconRender={(visible) => <img alt="" src={visible ? EyeTwoTone : EyeInvisibleOutlined} style={{ cursor: "pointer" }} />}
            prefix={<img alt="" src={pwIcon} />}
            placeholder="请输入登录密码"
          />
        </Form.Item>

        {/* 记住密码和忘记密码 */}
        <Form.Item>
          <div className="login-form-options">
            <Form.Item name="rememberMe" valuePropName="checked" noStyle>
              <Checkbox disabled={isLoading}>记住密码</Checkbox>
            </Form.Item>
            <Button type="link" className="login-form-forgot" disabled={isLoading} onClick={handleForgotPassword}>
              忘记密码
            </Button>
          </div>
        </Form.Item>

        {/* 登录按钮 */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading} className="login-form-submit">
            登录
          </Button>
        </Form.Item>

        {/* 微信登录 */}
        <Form.Item>
          <div className="login-form-weChat">
            <img src={weChatIcon} alt="微信登录" className="login-form-weChat-icon" onClick={handleWeChatLogin} />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
