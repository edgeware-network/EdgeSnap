import React from 'react';
import { snaps } from '../constants';
import { SnapCard } from '.';

const Snaps = (): React.JSX.Element => {
  return (
    <div className='grid sm:grid-cols-2 sm:max-w-6xl w-[80vw] grid-cols-1 gap-5 p-4'>
      {snaps.map((snap) =>(
        <SnapCard key={snap.name} name={snap.name} img={snap.img} description={snap.description} />
      ))}
    </div>
  );
};

export default Snaps;