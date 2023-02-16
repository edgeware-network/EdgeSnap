import { SnapsGlobalObject } from "@metamask/snaps-types";
import {MetamaskState} from "../interfaces";
import {
  defaultConfiguration,
  beresheetConfiguration,
  edgewareConfiguration,
} from "./predefined";
import {SnapConfig} from "@chainsafe/metamask-polkadot-types";

export function getDefaultConfiguration(networkName: string): SnapConfig {
  switch (networkName) {
    case "beresheet":
      console.log("beresheet configuration selected");
      return beresheetConfiguration;
    case "edgeware":
      console.log("Edgeware configuration selected");
      return edgewareConfiguration;
    default:
      return defaultConfiguration;
  }
}

export async function getConfiguration(snap: SnapsGlobalObject): Promise<SnapConfig> {
  const state = await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  }) as MetamaskState;
  if (!state || !state.polkadot.config) {
    return defaultConfiguration;
  }
  return state.polkadot.config;
}
