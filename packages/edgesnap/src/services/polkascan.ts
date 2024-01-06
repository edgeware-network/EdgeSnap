export function getPolkascanTxUrl(txHash: string, network: string): string {
  switch (network) {
    case 'kusama':
      return `https://polkascan.io/kusama/transaction/${txHash}`;
    case 'westend':
      return `https://westend.subscan.io/extrinsic/${txHash}`;
    case 'edgeware':
      return `https://edgscan.ink/#/extrinsics/${txHash}`;
    case 'acala':
      return `https://acala.subscan.io/extrinsic/${txHash}`;
    default:
      return '';
  }
}
