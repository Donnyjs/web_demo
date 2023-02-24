import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';

import { usePersistStore } from '@/store';
import Web3Button from '@/components/Web3Button';

const { Header } = Layout;

const LayoutHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const updateCollapse = usePersistStore((state) => state.updateCollapse);
  const isCollapse = usePersistStore((state) => state.isCollapse);

  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="flex items-center justify-between"
    >
      {React.createElement(isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => updateCollapse(!isCollapse),
      })}

      <div className="px-4">
        <Web3Button />
      </div>
    </Header>
  );
};

export default LayoutHeader;
