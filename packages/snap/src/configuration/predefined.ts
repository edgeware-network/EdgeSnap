import {SnapConfig} from "@chainsafe/metamask-polkadot-types";

export const kusamaConfiguration: SnapConfig = {
  addressPrefix: 2,
  networkName: "kusama",
  unit: {
    decimals: 12,
    image: "https://svgshare.com/i/L3o.svg",
    symbol: "KSM",
  },
  wsRpcUrl: "wss://kusama-rpc.polkadot.io/",
};

export const beresheetConfiguration: SnapConfig = {
  addressPrefix: 7,
  networkName: "beresheet",
  unit: {
    decimals: 18,
    image: "https://svgshare.com/i/qGu.svg",
    symbol: "TEDG",
  },
  wsRpcUrl: "wss://beresheet.jelliedowl.net/",
};

export const edgewareConfiguration: SnapConfig = {
  addressPrefix: 7,
  networkName: "edgeware",
  unit: {
    decimals: 18,
    image: "https://svgshare.com/i/qGu.svg",
    symbol: "EDG",
  },
  wsRpcUrl: "wss://edgeware.jelliedowl.net/",
};

export const polkadotConfiguration: SnapConfig = {
  addressPrefix: 0,
  networkName: "polkadot",
  unit: {
    decimals: 12,
    image: "https://polkadot.js.org/apps/static/polkadot-circle.1eea41b2..svg",
    symbol: "DOT",
  },
  wsRpcUrl: "wss://rpc.polkadot.io/",
};

export const defaultConfiguration: SnapConfig = edgewareConfiguration;
