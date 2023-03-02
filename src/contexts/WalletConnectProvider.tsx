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

const avalanche = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
};

const { provider, chains } = configureChains(
  [avalanche, bsc, bscTestnet],
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
