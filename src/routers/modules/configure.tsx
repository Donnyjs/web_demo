import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';

const homeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/configure',
        element: lazyLoad(React.lazy(() => import('@/views/configure'))),
        meta: {
          requiresAuth: true,
          title: 'Configure',
          key: 'configure',
        },
      },
    ],
  },
];

export default homeRouter;
