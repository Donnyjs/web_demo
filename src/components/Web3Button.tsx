import { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import { Button } from 'antd';

const Web3Button = () => {
  const account = useAccount();
  const { open } = useWeb3Modal();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(account.isConnected);
  }, [account.isConnected]);

  return (
    <>
      {isConnected ? (
        <Button onClick={() => open()}>
          {account.address &&
            `${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
        </Button>
      ) : (
        <Button onClick={() => open()}>Connect</Button>
      )}
    </>
  );
};

export default Web3Button;
