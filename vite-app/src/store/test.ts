// 这是一个测试文件，用于验证 Redux 状态管理功能
// 可以在浏览器控制台中运行以下代码来测试

// 测试用户登录状态
export const testUserState = () => {
  console.log('=== Redux 用户状态测试 ===');
  
  // 检查 localStorage 中的用户数据
  const storedUser = localStorage.getItem('user');
  console.log('localStorage 中的用户数据:', storedUser);
  
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      console.log('解析后的用户数据:', userData);
    } catch (error) {
      console.error('解析用户数据失败:', error);
    }
  }
  
  // 检查登录状态
  const isLoggedIn = localStorage.getItem('user') !== null;
  console.log('当前登录状态:', isLoggedIn);
};

// 测试登录功能
export const testLogin = (username: string, password: string) => {
  console.log(`测试登录: ${username} / ${password}`);
  
  if (username === 'admin' && password === '123456') {
    // 模拟登录成功
    const userData = {
      id: '1',
      username: username,
      email: `${username}@example.com`,
      isLoggedIn: true,
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('登录成功，用户数据已保存到 localStorage');
    console.log('用户数据:', userData);
    
    // 刷新页面以查看效果
    console.log('请刷新页面以查看登录状态变化');
  } else {
    console.log('登录失败：用户名或密码错误');
  }
};

// 测试退出登录
export const testLogout = () => {
  console.log('测试退出登录');
  localStorage.removeItem('user');
  console.log('用户数据已从 localStorage 清除');
  console.log('请刷新页面以查看退出登录状态');
};

// 在浏览器控制台中运行以下命令来测试：
// 1. testUserState() - 查看当前用户状态
// 2. testLogin('admin', '123456') - 测试登录
// 3. testLogout() - 测试退出登录 