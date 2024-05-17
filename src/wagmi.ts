import { createConfig, http } from "wagmi";

import { Chain, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const mode: Chain = {
  id: 74638,
  name: "MODE",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-grumpy-tomato-gazelle-itmpl2y47f.t.conduit.xyz"],
    },
    public: {
      http: ["https://rpc-grumpy-tomato-gazelle-itmpl2y47f.t.conduit.xyz"],
    },
  },
};

export const gelato: Chain = {
  id: 123420111,
  name: "GELATO",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.opcelestia-raspberry.gelato.digital"],
    },
    public: {
      http: ["https://rpc.opcelestia-raspberry.gelato.digital"],
    },
  },
};

export const caldera: Chain = {
  id: 9719618,
  name: "CALDERA",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://happy-olives-kick.rpc.caldera.xyz/http"],
    },
    public: {
      http: ["https://happy-olives-kick.rpc.caldera.xyz/http"],
    },
  },
};

export const config = createConfig({
  chains: [sepolia, caldera, mode, gelato],
  connectors: [metaMask()],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
    [caldera.id]: http(),
    [mode.id]: http(),
    [gelato.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
