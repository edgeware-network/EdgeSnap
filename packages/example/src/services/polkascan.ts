export function getPolkascanTxUrl(txHash: string, network: string): string {
  switch (network) {
    case "beresheet":
      return `https://polkascan.io/beresheet/transaction/${txHash}`;
    case "edgeware":
      return `https://edgeware.subscan.io/extrinsic/${txHash}`;
    default:
      return "";
  }
}
