import { useLocation, Navigate } from 'react-router-dom';
import { searchRoute } from '@/utils/util';
import { rootRouter } from '@/routers';
import { useAccount } from 'wagmi';

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  const { isConnected } = useAccount();

  const { pathname } = useLocation();
  const route = searchRoute(pathname, rootRouter);

  if (!route.meta?.requiresAuth) return props.children;

  if (!isConnected) return <Navigate to="/login" replace />;

  return props.children;
};

export default AuthRouter;
