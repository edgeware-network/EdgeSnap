import React from 'react';
import type { BlockInfo } from '@chainsafe/metamask-polkadot-types';

const LatestBlock = (props: {block: BlockInfo}): React.JSX.Element => {
  return (
    <div>
      <h1>{props.block.number}</h1>
      <h1>{props.block.hash}</h1>
    </div>
  )
}

export default LatestBlock