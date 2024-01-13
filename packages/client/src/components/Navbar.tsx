import React from 'react';

const Navbar = (): React.JSX.Element => {
  return (
    <>
      {/* navbar for laptop */}
      <div className='sm:flex w-[90vw] h-[64px] hidden relative bg-transparent text-[#c9c9c9] p-2.5 mx-2 top-4 outline outline-2 outline-primary-800 rounded-[8px] gap-4 items-center justify-between'>
        <h1 className='text-2xl p-2 font-medium font-poppins cursor-pointer'>EdgeSnap</h1>
        <div className='rounded-[8px]'>
          <button className='px-4 py-1 bg-primary-800 font-poppins font-medium hover:bg-primary-900 border-l border-[#010101] rounded-l-[8px]'>SnapStore</button>
          <button className='px-4 py-1 bg-[#404040] text-black font-poppins font-medium border-r border-[#010101] rounded-r-[8px]'>InteractiveUI</button>
        </div>
        <button className='py-2 px-4 bg-primary-800 font-poppins font-medium hover:bg-primary-900 active:scale-95 border border-[#010101] rounded-[8px]'>Connect</button>
      </div>

      {/* navbar for mobile */}
      <div className='flex w-[90vw] sm:hidden h-[56px] relative bg-transparent text-[#c9c9c9] p-2.5 mx-2 top-4 outline outline-2 outline-primary-800 rounded-[8px] gap-4 items-center justify-between'>
        <h1 className='text-2xl p-2 font-medium font-poppins cursor-pointer'>EdgeSnap</h1>
        <button className='py-2 px-4 bg-primary-800 font-poppins font-medium hover:bg-primary-900 active:scale-95 border border-[#010101] rounded-[8px]'>Connect</button>
      </div>
    </>
  );
};

export default Navbar;