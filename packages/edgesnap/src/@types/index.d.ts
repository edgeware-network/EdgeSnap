import type { SnapConfig } from '@edgesnap/metamask-substrate-types';

declare module '@edgesnap/metamask-substrate-adapter' {
  export function injectMetamaskPolkadotSnapProvider(
    network: 'westend' | 'kusama' | "edgeware" | "acala",
    config?: SnapConfig,
    pluginOrigin?: string
  ): void;
}
