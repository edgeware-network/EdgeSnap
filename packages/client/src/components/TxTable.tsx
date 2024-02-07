import { formatBalance } from '@polkadot/util';
import type { Transaction } from '@chainsafe/metamask-polkadot-types';
import { getCurrency, shortAddress } from '../../services/format';

export interface TxTableProps {
  txs: Transaction[];
	network: string;
}
// testing data
// const txs = [
// 	{
// 		hash: "0x121213232",
// 		block: 112,
// 		sender: "0x12121212121212121",
// 		destination: "0x12121212121212121",
// 		amount: "100",
// 		fee: "1",
// 	},
// 	{
// 		hash: "0x121213232",
// 		block: 112,
// 		sender: "0x12121212121212121",
// 		destination: "0x12121212121212121",
// 		amount: "100",
// 		fee: "1",
// 	},
// 	{
// 		hash: "0x121213232",
// 		block: 112,
// 		sender: "0x12121212121212121",
// 		destination: "0x12121212121212121",
// 		amount: "100",
// 		fee: "1",
// 	},
// 	{
// 		hash: "0x121213232",
// 		block: 112,
// 		sender: "0x12121212121212121",
// 		destination: "0x12121212121212121",
// 		amount: "100",
// 		fee: "1",
// 	}
// ]
const TxTable = (props: TxTableProps): React.JSX.Element => {
  return (
    <div className='flex w-[70vw] flex-col overscroll-contain overflow-x-auto scrollbar-none font-unbounded items-start justify-center gap-4 shadow-[4px_4px] border-2 border-[#cbcbcb] shadow-secondary-800 p-4'>
      <h1 className='text-primary-600 text-xl'>Transaction Logs</h1>
      <table className='table-auto text-sm w-full text-[#c9c9c9] text-center'>
				<thead>
					<tr className='table-row'>
						<th className='p-4 border border-[#000] bg-primary-650 text-black'>Tx Id</th>
						<th className='p-4 border border-[#000] bg-primary-650 text-black'>Block</th>
						<th className='p-4 border border-[#000] bg-primary-650 text-black'>Sender</th>
						<th className='p-4 border border-[#000] bg-primary-650 text-black'>Destination</th>
						<th className='p-4 border border-[#000] bg-primary-650 text-black'>Amount</th>
						<th className='p-4 border border-[#000] bg-primary-650 text-black'>Fees</th>
					</tr>
				</thead>
				<tbody>
					{props.txs.map((tx, index) => (
						<tr key={index} className={`${index % 2 === 0 ? 'bg-[#121212]' : 'bg-[#252525]'}`}>
							<td className='p-4 border border-[#303030]'>{tx.hash}</td>
							<td className='p-4 border border-[#303030]'>{tx.block}</td>
							<td className='p-4 border border-[#303030]'>{shortAddress(tx.sender)}</td>
							<td className='p-4 border border-[#303030]'>{shortAddress(tx.destination)}</td>
							<td className='p-4 border border-[#303030]'>{formatBalance(tx.amount, { decimals: 12, withSi: true, withUnit: getCurrency(props.network)})}</td>
							<td className='p-4 border border-[#303030]'>{formatBalance(tx.fee, { decimals: 12, withSi: true, withUnit: getCurrency(props.network)})}</td>
						</tr>
					))}
				</tbody>
      </table>
    </div>
  );
};

export default TxTable;