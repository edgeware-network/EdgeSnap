import type { SnapConfig } from '../../../types';

declare module '@edgesnap/metamask-substrate-adapter' {
  export function injectMetamaskPolkadotSnapProvider(
    network: 'westend' | 'kusama' | "edgeware" | "acala",
    config?: SnapConfig,
    pluginOrigin?: string
  ): void;
}
