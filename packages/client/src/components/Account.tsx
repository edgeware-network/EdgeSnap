import React, { useContext } from 'react';
import { formatBalance } from '@polkadot/util';
import { MetaMaskContext } from '../../context/metamask';
import { getCurrency } from '../../services/format';

export interface AccountProps {
  address: string;
  pubkey: string;
  balance: string;
  network: string;
}

const Account = (props: AccountProps): React.JSX.Element => {
  const [state] = useContext(MetaMaskContext);

  const handleExport = async (): Promise<void> => {
    if (!state.polkadotSnap.snap) return;
    const api = state.polkadotSnap.snap.getMetamaskSnapApi();
    const privateKey = await api.exportSeed();
    alert(privateKey);
  };

  return (
    <div>
      <h1>{props.address}</h1>
      <h1>{formatBalance(props.balance, {decimals: 18, withSi: true, withUnit: getCurrency(props.network)})}</h1>
      <h1>{props.pubkey}</h1>
      <h1>{props.network}</h1>
      <button onClick={handleExport}>Export Private Key</button>
    </div>
  );
};

export default Account;