import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';
import { getOpenKeys, searchRoute } from '@/utils/util';

import { usePersistStore } from '@/store';
import { router } from '@/routers/router';

const LayoutMenu = () => {
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenKeys(getOpenKeys(pathname));
  }, [pathname]);

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1)
      return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  // 定义 menu 类型
  type MenuItem = Required<MenuProps>['items'][number];
  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
  };

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = (
    menuList: Menu.MenuOptions[],
    newArr: MenuItem[] = [],
  ) => {
    menuList.forEach((item: Menu.MenuOptions) => {
      // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length)
        return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
      newArr.push(
        getItem(
          item.title,
          item.path,
          addIcon(item.icon!),
          deepLoopFloat(item.children),
        ),
      );
    });
    return newArr;
  };

  const setMenuListStore = usePersistStore((state) => state.setMenuList);
  // 获取菜单列表并处理成 antd menu 需要的格式
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const getMenuData = async () => {
    const data = router;
    if (!data) return;
    setMenuList(deepLoopFloat(data));
    setMenuListStore(data);
  };
  useEffect(() => {
    getMenuData();
  }, []);

  const menuListStore = usePersistStore((state) => state.menuList);
  // 点击当前菜单跳转页面
  const navigate = useNavigate();
  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    const route = searchRoute(key, menuListStore);
    if (route.isLink) window.open(route.isLink, '_blank');
    navigate(key);
  };

  return (
    <div className="menu">
      <div className="logo-box" />
      <Menu
        theme="dark"
        mode="inline"
        triggerSubMenuAction="click"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        items={menuList}
        onClick={clickMenu}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default LayoutMenu;
