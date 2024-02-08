import React from 'react';
import { formatBalance } from '@polkadot/util';
import { getCurrency, shortAddress } from '../../services/format';
import { MetamaskState } from '../../context/metamask';
import { PiCopyDuotone } from "react-icons/pi";
import { toast } from 'react-toastify';

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

  const handleCopy = async(item: string) => {
    await navigator.clipboard.writeText(item);
    toast.success("Copied!")
  }

  return (
    <div className='flex w-full flex-col font-unbounded items-start justify-center gap-5 shadow-[4px_4px] border-2 border-[#cbcbcb] shadow-secondary-800 p-4'>
      <h1 className='text-primary-600 text-xl'>Account Details</h1>
        {props.state.connectWallet.isConnected 
          ? <div className='flex sm:flex-row flex-col gap-2 p-1 sm:items-center items-start justify-center'>
              <button onClick={handleAddress} className='text-xs bg-primary-650 px-4 py-2 rounded-md active:scale-95'>Get Account</button>
              <div className='flex flex-row gap-4 items-center justify-center'>
                <h3 className='text-secondary-500 text-sm flex relative left-2'>{address}</h3>
                <PiCopyDuotone onClick={() => handleCopy(props.address)} size={20} className='text-[#454545] active:scale-95' />
              </div>
            </div>
          : <button disabled className='text-xs bg-[#353535] px-4 py-2 rounded-md active:scale-95'>Get Account</button>
        }
        {props.state.connectWallet.isConnected 
          ? <div className='flex sm:flex-row flex-col gap-2 p-1 sm:items-center items-start justify-center'>
              <button onClick={handleBalance} className='text-xs bg-primary-650 px-4 py-2 rounded-md active:scale-95'>Get Balance</button>
              <div className='flex flex-row gap-4 items-center justify-center'>
                <h3 className='text-secondary-500 text-sm flex relative left-2'>{balance}</h3>
              </div>
            </div>
          : <button disabled className='text-xs bg-[#353535] px-4 py-2 rounded-md active:scale-95'>Get Balance</button>
        }
        {props.state.connectWallet.isConnected 
          ? <div className='flex sm:flex-row flex-col gap-2 p-1 sm:items-center items-start justify-center'>
              <button onClick={handlePubicKey} className='text-xs bg-primary-650 px-4 py-2 rounded-md active:scale-95'>Get Public Key</button>
              <div className='flex flex-row gap-4 items-center justify-center'>
                <h3 className='text-secondary-500 text-sm flex relative left-2'>{pubkey}</h3>
                <PiCopyDuotone onClick={() => handleCopy(props.pubkey)} size={20} className='text-[#454545] active:scale-95' />
              </div>
            </div>
          : <button disabled className='text-xs bg-[#353535] px-4 py-2 rounded-md active:scale-95'>Get Public Key</button>
        }
    </div>
  );
};

export default Account;