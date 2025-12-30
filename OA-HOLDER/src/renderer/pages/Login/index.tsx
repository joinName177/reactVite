import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/slices/loginSlice";
import LoginForm from "./LoginForm";
import LoginLeftPanel from "./components/LoginLeftPanel";
import "./index.less";
import logo from "@/assets/images/login/holder_logo.svg";

import QrIcon from "@/assets/images/login/qr_code.svg";
import PcIcon from "@/assets/images/login/pc_code.svg";
import QrCode from "./components/QrCode";
import ForgotPassword from "./components/ForgotPassword";
/**
 * 登录页面组件
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.login.isLogin);

  const [loginStatus, setLoginStatus] = useState<{
    isForgotPassword: boolean;
    isQrLogin: boolean;
    isFormLogin: boolean;
  }>({
    isForgotPassword: false, // 是否是忘记密码
    isQrLogin: false, // 是否是二维码登陆
    isFormLogin: true // 是否是表单登陆
  });

  // 如果已经登录，重定向到首页或之前尝试访问的页面
  useEffect(() => {
    if (isLogin) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isLogin, navigate, location]);

  /**
   * 处理登录提交
   */
  const handleLogin = async (values: { account: string; password: string; rememberMe?: boolean }) => {
    try {
      // TODO: 调用登录 API
      // const response = await loginAPI(values);
      // dispatch(setToken(response.token));

      // 临时实现：直接设置 token
      // 实际使用时，应该使用 values.username 和 values.password 调用 API
      console.log("登录信息:", values);
      dispatch(setToken("token"));

      // 登录成功后，ProtectedRoute 会自动处理重定向
    } catch (error) {
      throw error; // 让 LoginForm 处理错误
    }
  };

  /**
   * 处理二维码/表单登录切换
   */
  const handleQrCodeSwitch = useCallback(() => {
    setLoginStatus((prevStatus) => {
      // 如果当前是二维码登录，切换回表单登录
      if (prevStatus.isQrLogin) {
        return {
          ...prevStatus,
          isQrLogin: false,
          isFormLogin: true
        };
      }
      // 如果当前是表单登录，切换到二维码登录
      return {
        ...prevStatus,
        isQrLogin: true,
        isFormLogin: false
      };
    });
  }, []);

  /**
   * 处理忘记密码点击
   */
  const handleForgotPassword = useCallback(() => {
    setLoginStatus((prevStatus) => ({ ...prevStatus, isForgotPassword: true }));
  }, []);

  /**
   * 处理微信登录点击
   */
  const handleWeChatLogin = useCallback(() => {}, []);

  return (
    <div className="login-page full-screen flex items-center justify-center">
      <div className="holder_logo_bg">
        <img src={logo} alt="logo" />
      </div>
      <span className="img_icon holder_bg1"></span>
      <span className="img_icon holder_bg2"></span>
      <span className="img_icon holder_bg_top_rig"></span>
      <div className="login-card">
        {/* 左侧装饰面板 */}
        <LoginLeftPanel />

        {/* 右侧登录表单 */}
        <div className="login-card-right">
          {/* 右上角二维码切换 */}
          <div className="qr_code_switch" onClick={handleQrCodeSwitch}>
            <img src={loginStatus.isQrLogin ? PcIcon : QrIcon} alt={loginStatus.isQrLogin ? "切换到PC登录" : "切换到二维码登录"} />
          </div>
          {/* 登陆表单 */}
          {loginStatus.isFormLogin && <LoginForm onSubmit={handleLogin} onForgotPassword={handleForgotPassword} onWeChatLogin={handleWeChatLogin} />}
          {/* 二维码登陆组件 */}
          {loginStatus.isQrLogin && <QrCode />}
          {/* 忘记密码组件 */}
          {loginStatus.isForgotPassword && <ForgotPassword />}
        </div>
      </div>
    </div>
  );
};

export default Login;
