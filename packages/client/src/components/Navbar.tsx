import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navLinks } from '../constants';

const Navbar = (): React.JSX.Element => {
  const pathname = window.location.pathname;
  const activeNavLink: string = pathname.split("/")[1] === "" ? "EdgeSnap" : pathname.split("/")[1];
  const [isActive, setIsActive] = useState<string>(activeNavLink);
  const navigate = useNavigate();

  useEffect(() => {
    const activeNavLink: string = pathname.split("/")[1] === "" ? "EdgeSnap" : pathname.split("/")[1];    
    setIsActive(activeNavLink);
  },[pathname]);

  return (
    <>
      {/* navbar for laptop */}
      <div className='sm:flex w-[80vw] z-10 h-[56px] hidden relative bg-transparent text-[#c9c9c9] outline outline-2 outline-[#303030] p-2.5 mx-2 top-4 rounded-[12px] items-center justify-between'>
        {navLinks.map((item) => (
          <Fragment key={item.name}>{item.name === "EdgeSnap" ? 
            <Link to="/">
              <h1 className='text-3xl p-1.5 font-medium font-unbounded cursor-pointer'>
                {item.name}
              </h1>
            </Link> : 
            <div className='flex items-center justify-center gap-4'>
              <h3 className={`hover:text-primary-600 text-lg font-normal font-unbounded cursor-pointer ${isActive === item.name ? "text-primary-600" : ""}`}
                onClick={() => {
                setIsActive(item.name)
                navigate(item.link)
              }}>
                {item.name}
              </h3>
            </div>}
          </Fragment>
        ))}
        <button className='py-2 px-4 bg-primary-800 font-poppins font-medium hover:bg-primary-900 active:scale-95 border border-[#121212] rounded-[8px]'>Connect</button>
      </div>

      {/* navbar for mobile */}
      <div className='flex w-[80vw] z-10 sm:hidden h-[56px] relative bg-transparent text-[#c9c9c9] p-2.5 mx-2 top-4 outline outline-2 outline-[#303030] rounded-[8px] gap-4 items-center justify-between'>
        <Link to="/">
          <h1 className='text-2xl p-2 font-medium font-unbounded cursor-pointer'>EdgeSnap</h1>
        </Link>
        <button className='py-2 px-4 bg-primary-800 font-poppins font-medium hover:bg-primary-900 active:scale-95 border border-[#121212] rounded-[8px]'>Connect</button>
      </div>
    </>
  );
};

export default Navbar;