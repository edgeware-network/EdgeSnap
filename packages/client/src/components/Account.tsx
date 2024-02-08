import React from 'react';
import { formatBalance } from '@polkadot/util';
import { getCurrency, shortAddress } from '../../services/format';
import { MetamaskState } from '../../context/metamask';

export interface AccountProps {
  address: string;
  pubkey: string;
  balance: string;
  network: string;
  state: MetamaskState
}

const Account = (props: AccountProps): React.JSX.Element => {
  const [address, setAddress] = React.useState<string>('');
  const [pubkey, setPublicKey] = React.useState<string>('');
  const [balance, setBalance] = React.useState<string>('');

  const handleAddress = () => {
    setAddress(shortAddress(props.address));
  }

  const handlePubicKey = () => {
    setPublicKey(shortAddress(props.pubkey));
  }
  const handleBalance = () => {
    const balance = formatBalance(props.balance, { decimals: 12, withSi: true, withUnit: getCurrency(props.network)});
    setBalance(balance);
  }

  return (
    <div className='flex w-full flex-col font-unbounded items-start justify-center gap-5 shadow-[4px_4px] border-2 border-[#cbcbcb] shadow-secondary-800 p-4'>
      <h1 className='text-primary-600 text-xl'>Account Details</h1>
      <div className='flex sm:flex-row flex-col gap-2 p-1 sm:items-center items-start justify-center'>
        {props.state.connectWallet.isConnected 
        ? <button onClick={handleAddress} className='text-xs bg-primary-650 px-4 py-2 rounded-md active:scale-95'>Get Account</button>
        : <button disabled className='text-xs bg-[#353535] px-4 py-2 rounded-md active:scale-95'>Get Account</button>}
        {props.state.connectWallet.isConnected && <h3 className='text-secondary-500 text-sm flex relative left-2'>
          {address}
        </h3>}
      </div>
      <div className='flex sm:flex-row flex-col gap-2 p-1 sm:items-center items-start justify-center'>
        {props.state.connectWallet.isConnected 
        ? <button onClick={handleBalance} className='text-xs bg-primary-650 px-4 py-2 rounded-md active:scale-95'>Get Balance</button>
        : <button disabled className='text-xs bg-[#353535] px-4 py-2 rounded-md active:scale-95'>Get Balance</button>}
        {props.state.connectWallet.isConnected && <h3 className="text-sm text-secondary-500 flex relative left-2">
          {balance}
        </h3>}
      </div>
      <div className='flex sm:flex-row flex-col gap-2 p-1 sm:items-center items-start justify-center'>
        {props.state.connectWallet.isConnected 
        ? <button onClick={handlePubicKey} className='text-xs bg-primary-650 px-4 py-2 rounded-md active:scale-95'>Get Public Key</button>
        : <button disabled className='text-xs bg-[#353535] px-4 py-2 rounded-md active:scale-95'>Get Public Key</button>}
        {props.state.connectWallet.isConnected && <h3 className='text-secondary-500 text-sm flex relative left-2'>
          {pubkey}
        </h3>}
      </div>
    </div>
  );
};

export default Account;