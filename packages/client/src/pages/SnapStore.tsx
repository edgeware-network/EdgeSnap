import React from 'react';
import { Snaps } from '../components';

const SnapStore = (): React.JSX.Element => {
  return (
    <>
      <div className="flex flex-col gap-1 justify-center items-center w-[80vw] p-4">
        <h1 className="font-unbounded sm:text-5xl text-3xl text-primary-650">Explore our Snaps</h1>
        <p className="font-poppins sm:text-sm text-xs font-light text-[#c9c9c9]">Explore, install, and use Edgeware community-built snaps.</p>
      </div>
      <Snaps />
    </>
  );
};

export default SnapStore;