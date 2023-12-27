import type { SnapConfig } from '@edgesnap/metamask-substrate-types';
import { getMetamaskState } from '../rpc/getMetamaskState';
import {
  defaultConfiguration,
  kusamaConfiguration,
  polkadotConfiguration,
  westendConfiguration,
  edgewareConfiguration,
  acalaConfiguration
} from './predefined';

export function getDefaultConfiguration(networkName: string): SnapConfig {
  switch (networkName) {
    case 'polkadot':
      console.log('Polkadot configuration selected');
      return polkadotConfiguration;
    case 'kusama':
      console.log('Kusama configuration selected');
      return kusamaConfiguration;
    case 'westend':
      console.log('Westend configuration selected');
      return westendConfiguration;
    case 'edgeware':
      console.log('Edgeware configuration selected');
      return edgewareConfiguration;
    case 'acala':
      console.log('Acala configuration selected');
      return acalaConfiguration;
    default:
      return defaultConfiguration;
  }
}

export async function getConfiguration(): Promise<SnapConfig> {
  const state = await getMetamaskState();

  if (!state || !state.config) {
    return defaultConfiguration;
  }
  return JSON.parse(<string>state.config) as SnapConfig;
}
