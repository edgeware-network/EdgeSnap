import React, { useState } from 'react';
import { snaps } from '../constants';
import SnapCard from '../components/SnapCard';

const SnapStore = (): React.JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSnaps = snaps.filter((snap) =>
    snap.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className='flex flex-col gap-5 items-center justify-center p-2'>
        <div className='flex flex-col gap-1 items-center w-[80vw] justify-center text-wrap text-center'>
          <h1 className="font-unbounded sm:text-5xl text-3xl text-primary-650">Explore Snaps</h1>
          <p className="font-unbounded sm:text-sm text-xs font-light text-[#c9c9c9]">
            Explore, install, and use Substrate snaps.
          </p>
        </div>
        <div className='flex flex-col items-center w-[80vw] justify-center font-poppins'>
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder='search chains' className='font-poppins sm:w-[60vw] w-[80vw] text-sm p-2 rounded-md bg-black focus:outline-none border-2 border-[#353535] focus:border-secondary-800' />          
          <div className="grid sm:grid-cols-2 grid-cols-1 sm:max-w-7xl w-[90vw] gap-5 p-4">
            {filteredSnaps.map((snap, index) => (
              <SnapCard key={index} name={snap.name} img={snap.img} description={snap.description} />
            ))}
          </div>
        </div>
      </div>
  );
};

export default SnapStore;
