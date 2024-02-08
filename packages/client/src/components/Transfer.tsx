import React, { useCallback, useContext, useState } from 'react';
import { MetaMaskContext } from '../../context/metamask';
import { getCurrency } from '../../services/format';

interface ITransferProps {
  network: string;
  onNewTransferCallback: () => void;
}

const Transfer: React.FC<ITransferProps> = ({network, onNewTransferCallback}) => {
  const [state] = useContext(MetaMaskContext);
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string | number>('');
  const units: string = `m${getCurrency(network)}`;

  const handleRecipientChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRecipient(event.target.value);
    },
    [setRecipient]
  );

  const handleAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(event.target.value);
    },
    [setAmount]
    );
    
  const onSubmit = useCallback(async () => {
    if (!state.polkadotSnap.snap) return;
    if (amount && recipient) {
      const api = state.polkadotSnap.snap.getMetamaskSnapApi();
      if (amount && recipient) {
        const convertedAmount = BigInt(amount) * BigInt('1000000000');
        const txPayload = await api.generateTransactionPayload(
          convertedAmount.toString(),
          recipient
        );
        const signedTx = await api.signPayloadJSON(txPayload.payload);
        const tx = await api.send(signedTx, txPayload);
        console.log('info', `Transaction: ${JSON.stringify(tx, null, 2)}`);
        // clear fields
        setAmount('');
        setRecipient('');
        // invoke provided callback to inform parent component that new tx is sent
        onNewTransferCallback();
      } else {
        console.log('error', 'Please fill recipient and amount fields.');
      }
    }
  }, [amount, recipient, setAmount, setRecipient, onNewTransferCallback, state.polkadotSnap.snap]);

  return (
    <div className='flex w-full flex-col font-unbounded items-start justify-center gap-4 shadow-[4px_4px] border-2 border-[#cbcbcb] shadow-secondary-800 p-4'>
      <h1 className='text-primary-600 text-xl'>Transfer Tokens</h1>
      <form onSubmit={onSubmit} className='flex flex-col font-unbounded w-full gap-2'>
        <label className='flex flex-col items-start justify-center gap-2 p-1'>
          <p className='text-sm'>Recipient</p>
          <input value={recipient} onChange={handleRecipientChange} type="text" placeholder='address' className='font-poppins w-full text-sm p-1.5 rounded-md bg-black focus:outline-none border border-[#353535] focus:border-primary-650' />
        </label>
        <label className='flex flex-col items-start justify-center gap-2 p-1'>
          <p className='text-sm'>Amount</p>
          <input value={amount} onChange={handleAmountChange} type="number" placeholder={`${network !== '' ? units : ""}`} className='font-poppins w-full text-sm p-1.5 rounded-md bg-black focus:outline-none border border-[#353535] focus:border-primary-650' />
        </label>
        {state.connectWallet.isConnected 
        ? <button type='submit' className='text-xs bg-primary-650 px-4 py-2 rounded-md active:scale-95'>Transfer</button>
        : <button type='submit' disabled className='text-xs bg-[#353535] px-4 py-2 rounded-md active:scale-95'>Transfer</button>
        }
      </form>
    </div>
  );
};

export default Transfer;