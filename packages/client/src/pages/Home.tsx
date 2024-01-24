import React from 'react';
import { Link } from 'react-router-dom';

const Home = (): React.JSX.Element => {
  return (
    <>
      <div className='bg-grid bg-cover bg-center bg-no-repeat z-0 w-full h-[95vh] absolute'></div>
      <div className='flex flex-col p-4 my-auto items-center justify-center w-[80vw] z-10 text-[#c9c9c9] gap-5'>
        <div className='flex flex-col text-wrap text-center'>
          <h1 className='sm:text-5xl text-4xl font-unbounded font-medium'>
            Customize your wallet with <span className='text-primary-650 underline'>EdgeSnap</span>
          </h1>
          <h3 className='font-unbounded sm:text-lg text-sm font-light'>
            Discover, install, and use Edgeware community-built features in your MetaMask wallet today.
          </h3>
        </div>
      <Link to='/snap-store' className='bg-black z-10'>
        <button className='py-2 px-4 bg-primary-800 font-unbounded font-medium hover:bg-primary-900 active:scale-95 border border-[#121212] rounded-[8px]'>Get Started</button>
      </Link>
      </div>
    </>
  );
};

export default Home;