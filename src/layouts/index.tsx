import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';

import { usePersistStore } from '@/store';
import LayoutMenu from './components/Menu';
import LayoutHeader from './components/Header';
import './index.less';

const { Content, Sider } = Layout;

const LayoutIndex = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const isCollapse = usePersistStore((state) => state.isCollapse);

  return (
    <section className="container-box">
      <Sider trigger={null} collapsible collapsed={isCollapse}>
        <LayoutMenu />
      </Sider>
      <Layout className="site-layout">
        <LayoutHeader />
        <Content
          className="overflow-auto"
          style={{
            margin: '20px 12px',
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </section>
  );
};

export default LayoutIndex;
