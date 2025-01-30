import { cookieStorage, createStorage, http } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { baseSepolia} from '@reown/appkit/networks';


export const projectId = 'd898a1d0343878492144e1f3492751e1';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [ baseSepolia];


// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
});

export const config = wagmiAdapter.wagmiConfig;