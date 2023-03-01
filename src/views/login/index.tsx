import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Web3Button from '@/components/Web3Button';
import { useAccount } from 'wagmi';

const Login = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/asset');
    }
  }, [isConnected]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Web3Button />
    </div>
  );
};

export default Login;
