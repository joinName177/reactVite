import { LanguageType } from "@shared/i18n";

type L = Record<LanguageType, string>;

export const loginLocale = {
  // ==================== 账号 ====================
  accountPlaceholder: {
    [LanguageType.ZhCn]: "请输入账号",
    [LanguageType.EnGb]: "Enter account"
  } as L,
  accountRequired: {
    [LanguageType.ZhCn]: "请输入账号",
    [LanguageType.EnGb]: "Please enter your account"
  } as L,
  accountInvalid: {
    [LanguageType.ZhCn]: "请输入有效的手机号或邮箱",
    [LanguageType.EnGb]: "Please enter a valid phone number or email"
  } as L,

  // ==================== 表单 ====================
  formTitle: {
    [LanguageType.ZhCn]: "账号登录",
    [LanguageType.EnGb]: "Account Login"
  } as L,
  passwordPlaceholder: {
    [LanguageType.ZhCn]: "请输入密码",
    [LanguageType.EnGb]: "Enter password"
  } as L,
  passwordRequired: {
    [LanguageType.ZhCn]: "请输入密码",
    [LanguageType.EnGb]: "Please enter your password"
  } as L,
  passwordMinLength: {
    [LanguageType.ZhCn]: "密码至少{min}个字符",
    [LanguageType.EnGb]: "Password must be at least {min} characters"
  } as L,
  rememberMe: {
    [LanguageType.ZhCn]: "记住我",
    [LanguageType.EnGb]: "Remember me"
  } as L,
  forgotPassword: {
    [LanguageType.ZhCn]: "忘记密码",
    [LanguageType.EnGb]: "Forgot password"
  } as L,
  loginBtn: {
    [LanguageType.ZhCn]: "登录",
    [LanguageType.EnGb]: "Login"
  } as L,
  loginError: {
    [LanguageType.ZhCn]: "登录失败，请重试",
    [LanguageType.EnGb]: "Login failed, please try again"
  } as L,

  // ==================== 扫码登录 ====================
  switchToQr: {
    [LanguageType.ZhCn]: "切换至扫码登录",
    [LanguageType.EnGb]: "Switch to QR code login"
  } as L,
  switchToPc: {
    [LanguageType.ZhCn]: "切换至PC登录",
    [LanguageType.EnGb]: "Switch to PC login"
  } as L,

  // ==================== 二维码 ====================
  qrCodeTitle: {
    [LanguageType.ZhCn]: "扫码登录",
    [LanguageType.EnGb]: "Scan to Login"
  } as L,
  qrCodeDesc: {
    [LanguageType.ZhCn]: "使用微信或其他App扫码登录",
    [LanguageType.EnGb]: "Scan with WeChat or other App to login"
  } as L,

  // ==================== 忘记密码 ====================
  forgotTitle: {
    [LanguageType.ZhCn]: "忘记密码",
    [LanguageType.EnGb]: "Forgot Password"
  } as L,
  forgotAccountRequired: {
    [LanguageType.ZhCn]: "请输入注册账号",
    [LanguageType.EnGb]: "Please enter your registered account"
  } as L,
  forgotAccountInvalid: {
    [LanguageType.ZhCn]: "请输入有效的注册账号",
    [LanguageType.EnGb]: "Please enter a valid registered account"
  } as L,
  codePlaceholder: {
    [LanguageType.ZhCn]: "请输入验证码",
    [LanguageType.EnGb]: "Enter verification code"
  } as L,
  codeRequired: {
    [LanguageType.ZhCn]: "请输入验证码",
    [LanguageType.EnGb]: "Please enter the verification code"
  } as L,
  codeInvalid: {
    [LanguageType.ZhCn]: "验证码错误",
    [LanguageType.EnGb]: "Incorrect verification code"
  } as L,
  sendCode: {
    [LanguageType.ZhCn]: "发送验证码",
    [LanguageType.EnGb]: "Send Code"
  } as L,
  resendCode: {
    [LanguageType.ZhCn]: "{count}s 后重发",
    [LanguageType.EnGb]: "Resend in {count}s"
  } as L,
  accountFirstWarning: {
    [LanguageType.ZhCn]: "请先输入账号",
    [LanguageType.EnGb]: "Please enter your account first"
  } as L,
  sendSuccess: {
    [LanguageType.ZhCn]: "验证码已发送",
    [LanguageType.EnGb]: "Verification code sent"
  } as L,
  newPasswordPlaceholder: {
    [LanguageType.ZhCn]: "新密码（8-20位，含字母/数字/符号中的2种）",
    [LanguageType.EnGb]: "New password (8-20 chars, 2 types: letters/digits/symbols)"
  } as L,
  forgotPasswordRequired: {
    [LanguageType.ZhCn]: "请输入新密码",
    [LanguageType.EnGb]: "Please enter a password!"
  } as L,
  passwordFormatInvalid: {
    [LanguageType.ZhCn]: "格式错误：8-20位，含字母、数字、符号中的2种",
    [LanguageType.EnGb]: "Invalid format: 8-20 chars, must include 2 of: letters, digits, symbols"
  } as L,
  confirmPlaceholder: {
    [LanguageType.ZhCn]: "再次输入新密码",
    [LanguageType.EnGb]: "Re-enter new password"
  } as L,
  confirmRequired: {
    [LanguageType.ZhCn]: "请确认密码",
    [LanguageType.EnGb]: "Please confirm your password!"
  } as L,
  confirmMismatch: {
    [LanguageType.ZhCn]: "两次密码不一致",
    [LanguageType.EnGb]: "Passwords do not match"
  } as L,
  resetBtn: {
    [LanguageType.ZhCn]: "重置密码",
    [LanguageType.EnGb]: "Reset Password"
  } as L
} as const;
