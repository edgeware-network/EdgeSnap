export function getPolkascanTxUrl(txHash: string, network: string): string {
  switch (network) {
    case "beresheet":
      return `https://beresheet.subscan.io/extrinsic/${txHash}`;
    case "edgeware":
      return `https://edgeware.subscan.io/extrinsic/${txHash}`;
    default:
      return "";
  }
}
