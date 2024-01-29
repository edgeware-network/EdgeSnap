import React, { useState } from 'react';
import { snaps } from '../constants';
import SnapCard from '../components/SnapCard';

const SnapStore = (): React.JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSnaps = snaps.filter((snap) =>
    snap.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-1 justify-center items-center w-[80vw] p-4 text-wrap text-center">
        <h1 className="font-unbounded sm:text-5xl text-3xl text-primary-650">Explore Snaps</h1>
        <p className="font-unbounded sm:text-sm text-xs font-light text-[#c9c9c9]">
          Explore, install, and use Substrate snaps.
        </p>
        <div className="w-full flex justify-center items-center my-4">
          <input
            type="text"
            placeholder="Search Chains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar-class w-[90%] max-w-[600px] p-2"
          />
        </div>
        <div className="grid sm:grid-cols-2 sm:max-w-6xl w-[90vw] grid-cols-1 gap-5 p-4">
          {filteredSnaps.map((snap, index) => (
            <SnapCard key={index} name={snap.name} img={snap.img} description={snap.description} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SnapStore;
