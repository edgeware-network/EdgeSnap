import { formatBalance } from '@polkadot/util';
import type { Transaction } from '@chainsafe/metamask-polkadot-types';
import { shortAddress } from '../../services/format';

export interface TxTableProps {
  txs: Transaction[];
}
const TxTable = (props: TxTableProps): React.JSX.Element => {
  return (
    <div className='flex w-[70vw] flex-col font-unbounded items-start justify-center gap-4 shadow-[4px_4px] border-2 border-[#cbcbcb] shadow-secondary-800 p-4'>
      <h1 className='text-primary-600 text-xl'>Transaction Logs</h1>
      
    </div>
  );
};

export default TxTable;