import { SnapConfig } from "@chainsafe/metamask-polkadot-types";

declare module "@chainsafe/metamask-polkadot-adapter" {

  export function injectMetamaskPolkadotSnapProvider(network: "edgeware" | "beresheet",
    config?: SnapConfig,
    pluginOrigin?: string): void;
}