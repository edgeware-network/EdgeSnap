import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Account, Transfer } from '../components';
import { SnapNetworks, Transaction } from '@chainsafe/metamask-polkadot-types';
import type { MetamaskSnapApi } from '@chainsafe/metamask-polkadot-adapter/src/types';
import { MetaMaskContext } from '../../context/metamask';

const InteractiveUI = (): React.JSX.Element => {
  const [state] = useContext(MetaMaskContext);
  const [balance, setBalance] = useState('0');
  const [address, setAddress] = useState('');
  const [pubkey, setPublicKey] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [network, setNetwork] = useState<SnapNetworks>('westend');
  const [api, setApi] = useState<MetamaskSnapApi | null>(null);

  const handleNewTransaction = useCallback(async () => {
    if (!api) return;
    setTransactions(await api.getAllTransactions());
  }, [setTransactions, api]);

  const handleNetworkChange = async (
    event: React.ChangeEvent<{ value: unknown }>
  ): Promise<void> => {
    const networkName = event.target.value as SnapNetworks;
    if (networkName === network) return;
    if (!api) return;
    await api.setConfiguration({ networkName: networkName });
    setNetwork(networkName);
    
  };
  console.log(address, network, pubkey, balance);

  useEffect(() => {
    void (() => {
      if (state.polkadotSnap.isInstalled && state.polkadotSnap.snap) {
        const polkadotApi = state.polkadotSnap.snap.getMetamaskSnapApi();
        setApi(polkadotApi);
      }
    })();
  }, [state.polkadotSnap.isInstalled, state.polkadotSnap.snap]);

  useEffect(() => {
    void (async () => {
      if (api) {
        setAddress(await api.getAddress());
        setPublicKey(await api.getPublicKey());
        setBalance(await api.getBalance());
        setTransactions(await api.getAllTransactions());
      }
    })();
  }, [api, network]);

  useEffect(() => {
    // periodically check balance
    const interval = setInterval(async () => {
      if (api) {
        const newBalance = await api.getBalance();
        setBalance(newBalance);
      }
    }, 60000); // every 60 seconds
    return () => clearInterval(interval);
  }, [api, balance, setBalance]);

  console.log(transactions)
  return (
    <>
      <div>
        <select value={network} onChange={handleNetworkChange}>
          <option value="westend">Westend</option>
          <option value="polkadot">Polkadot</option>
          <option value="kusama">Kusama</option>
        </select>
      </div>
      <div className='flex z-0 flex-col gap-10 w-[70vw]'>
        <Account address={address} pubkey={pubkey} balance={balance} network={network} />
        <Transfer network={network} onNewTransferCallback={handleNewTransaction} />
      </div>
    </>
  );
};

export default InteractiveUI;