import {SnapConfig} from "@chainsafe/metamask-polkadot-types";

export const beresheetConfiguration: SnapConfig = {
  addressPrefix: 7,
  networkName: "beresheet",
  unit: {
    decimals: 18,
    image: "https://svgshare.com/i/qNs.svg",
    symbol: "KSM",
  },
  wsRpcUrl: "wss://beresheet.jelliedowl.net/",
};
export const edgewareConfiguration: SnapConfig = {
  addressPrefix: 7,
  networkName: "edgeware",
  unit: {
    decimals: 18,
    image: "https://svgshare.com/i/qNs.svg",
    symbol: "EDG",
  },
  wsRpcUrl: "wss://edgeware.jelliedowl.net/",
};

export const defaultConfiguration: SnapConfig = edgewareConfiguration;
