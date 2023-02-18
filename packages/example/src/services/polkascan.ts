export function getPolkascanTxUrl(txHash: string, network: string): string {
  switch (network) {
    case "kusama":
      return `https://polkascan.io/kusama/transaction/${txHash}`;
    case "edgeware":
      return `https://edgeware.subscan.io/extrinsic/${txHash}`;
    default:
      return "";
  }
}
