// import React from "react";
// import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import Home from '@/views/home';

// 首页模块
const homeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/home',
        // element: lazyLoad(React.lazy(() => import("@/views/home"))),
        element: <Home />,
        meta: {
          requiresAuth: true,
          title: 'Home',
          key: 'home',
        },
      },
    ],
  },
];

export default homeRouter;
