import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRouter from './router';
import './styles/index.less';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3949AB',
        },
        components: {
          Button: {
            colorLink: '#3949AB',
            colorLinkHover: '#5c6bc0',
            colorLinkActive: '#283593',
          },
        },
      }}
    >
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ConfigProvider>
  );
};

export default App;

