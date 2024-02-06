import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navLinks } from '../constants';
import { MetaMaskContext, MetamaskActions } from '../../context/metamask';
import { ConnectWallet } from '.';
import { AiOutlineDisconnect } from 'react-icons/ai';

const Navbar = (): React.JSX.Element => {
  const pathname = window.location.pathname;
  const activeNavLink: string = pathname.split("/")[1] === "" ? "EdgeSnap" : pathname.split("/")[1];
  const [isActive, setIsActive] = useState<string>(activeNavLink);
  const[state, dispatch] = useContext(MetaMaskContext);
  const navigate = useNavigate();

  useEffect(() => {
    const activeNavLink: string = pathname.split("/")[1] === "" ? "EdgeSnap" : pathname.split("/")[1];    
    setIsActive(activeNavLink);
  },[pathname]);

  const disConnect = () => {
    localStorage.setItem('isManuallyDisconnected', 'true'); // Set flag on manual disconnect
    dispatch({ type: MetamaskActions.SET_DISCONNECTED_STATUS, payload: { isManuallyDisconnected: true } });
    dispatch({ type: MetamaskActions.SET_INSTALLED_STATUS, payload: { isInstalled: false } });
    // The rest of the disconnect logic...
};

  return (
    <>
      {/* navbar for laptop */}
      <div className='sm:flex w-[80vw] h-[48px] p-2 z-10 hidden relative bg-transparent text-[#c9c9c9] mx-2 top-4 items-center justify-between outline outline-2 outline-[#404040] rounded-md'>
        <Link to="/">
          <h1 className='text-2xl p-2 font-medium font-unbounded cursor-pointer'>
            EdgeSnap
          </h1>
        </Link>
        <div className='flex items-center justify-center'>
          {navLinks.map((item) => (
            <Link to={item.link} key={item.name}>
              <h3 key={item.name} className={`text-sm font-bold font-unbounded px-4 py-1 cursor-pointer ${isActive === item.name ? "text-primary-600" : ""}`}
                  onClick={() => {
                  setIsActive(item.name)
                  navigate(item.link)
              }}>
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
				<div className='flex items-center justify-center gap-1'>
					<ConnectWallet />   
					{state.connectWallet.isConnected &&
						<AiOutlineDisconnect 
							onClick={disConnect} 
							className="h-8 w-8 text-red-600 rounded-md p-1 border border-[#353535] hover:bg-[#131313] active:scale-95" />}
				</div>
      </div>

      {/* navbar for mobile */}
      <div className='flex w-[90vw] h-[48px] p-2 z-10 sm:hidden relative bg-transparent text-[#c9c9c9] mx-2 top-4 items-center justify-between outline outline-2 outline-[#404040] rounded-md'>
        <Link to="/">
          <h1 className='text-2xl p-2 font-medium font-unbounded cursor-pointer'>EdgeSnap</h1>
        </Link>
				<div className='flex items-center'>
					<ConnectWallet />   
					{state.connectWallet.isConnected &&
						<AiOutlineDisconnect 
							onClick={disConnect}
							className="h-8 w-8 text-primary-600 rounded-full p-1 border border-[#353535] hover:bg-[#131313] active:scale-95" />}
				</div>
      </div>
    </>
  );
};

export default Navbar;