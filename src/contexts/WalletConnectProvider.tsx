import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { bsc, bscTestnet } from 'wagmi/chains';
import { EthereumClient, modalConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';

import { WEB3MODAL_PROJECT_ID } from '@/constants';

interface WagmiConfigProviderProps {
  children: React.ReactNode;
}

const projectId = WEB3MODAL_PROJECT_ID;

const Sepolia = {
  id: 11155111,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: {
      http: ['https://ethereum-sepolia.blockpi.network/v1/rpc/public'],
    },
    default: {
      http: ['https://ethereum-sepolia.blockpi.network/v1/rpc/public	'],
    },
  },
  blockExplorers: {
    etherscan: { name: 'sepolia', url: 'https://sepolia.etherscan.io/' },
    default: { name: 'sepolia', url: 'https://sepolia.etherscan.io/' },
  },
};

const { provider, chains } = configureChains(
  [Sepolia, bsc, bscTestnet],
  [publicProvider()],
);

const connectors = modalConnectors({
  projectId,
  appName: 'Web3 Game Spike',
  version: '1',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);

export const DefaultWeb3Modal = () => {
  return <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />;
};

export const WagmiConfigProvider = ({ children }: WagmiConfigProviderProps) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
};
