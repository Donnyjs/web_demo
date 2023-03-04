import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import Module from '@/views/module';

// 展示游戏模块信息
const moduleRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/module',
        element: <Module />,
        meta: {
          requiresAuth: true,
          title: 'Module',
          key: 'module',
        },
      },
    ],
  },
];

export default moduleRouter;
