import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import Mint from '@/views/mint';

const mintRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/mint',
        // element: lazyLoad(React.lazy(() => import('@/views/query'))),
        element: <Mint />,
        meta: {
          requiresAuth: true,
          title: 'Mint',
          key: 'mint',
        },
      },
    ],
  },
];

export default mintRouter;
