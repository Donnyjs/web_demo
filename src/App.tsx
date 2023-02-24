import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

import Router from '@/routers';
import AuthRouter from '@/routers/utils/authRouter';
import {
  WagmiConfigProvider,
  DefaultWeb3Modal,
} from '@/contexts/WalletConnectProvider';

const App = () => {
  return (
    <HashRouter>
      <ConfigProvider>
        <StyleProvider hashPriority="high">
          <WagmiConfigProvider>
            <AuthRouter>
              <Router />
            </AuthRouter>
            <DefaultWeb3Modal />
          </WagmiConfigProvider>
        </StyleProvider>
      </ConfigProvider>
    </HashRouter>
  );
};

export default App;
