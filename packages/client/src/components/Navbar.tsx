import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navLinks } from '../constants';
import { shortAddress } from '../../services/format';
import { MetaMaskContext, MetamaskActions } from '../../context/metamask';
import { initiatePolkadotSnap } from '../../services/metamask';

const Navbar = (): React.JSX.Element => {
  const pathname = window.location.pathname;
  const activeNavLink: string = pathname.split("/")[1] === "" ? "EdgeSnap" : pathname.split("/")[1];
  const [isActive, setIsActive] = useState<string>(activeNavLink);
  const [address, setAddress] = useState<string>('');
  const[state, dispatch] = useContext(MetaMaskContext);
  const navigate = useNavigate();

  useEffect(() => {
    const activeNavLink: string = pathname.split("/")[1] === "" ? "EdgeSnap" : pathname.split("/")[1];    
    setIsActive(activeNavLink);
    isWalletConnected();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pathname]);

  const updateWallet = (address: string) => {
    setAddress(address)
  }

  const connectWallet = async() => {
    if (window.ethereum){
      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        updateWallet(accounts[0]);
        const installResult = await initiatePolkadotSnap();
        if (!installResult.isSnapInstalled) {
          dispatch({
            payload: {
              isInstalled: false,
              message: 'Please accept snap installation prompt'
            },
            type: MetamaskActions.SET_INSTALLED_STATUS
          });
        } else {
          dispatch({
            payload: { isInstalled: true, snap: installResult.snap },
            type: MetamaskActions.SET_INSTALLED_STATUS
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  const isWalletConnected = async() => {
    try {
      if (window.ethereum) {
        const accounts: string[] = await window.ethereum.request({ method: "eth_accounts"});
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          const installResult = await initiatePolkadotSnap();
          if (!installResult.isSnapInstalled) {
            dispatch({
              payload: {
                isInstalled: false,
                message: 'Please accept snap installation prompt'
              },
              type: MetamaskActions.SET_INSTALLED_STATUS
            });
          } else {
            dispatch({
              payload: { isInstalled: true, snap: installResult.snap },
              type: MetamaskActions.SET_INSTALLED_STATUS
            });
          }
        }
      } else {
        alert("Install Metamask!");
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return (
    <>
      {/* navbar for laptop */}
      <div className='sm:flex w-[80vw] z-10 h-[56px] hidden relative bg-transparent text-[#c9c9c9] outline outline-2 outline-[#303030] p-2.5 mx-2 top-4 rounded-[12px] items-center justify-between'>
        {navLinks.map((item) => (
          <Fragment key={item.name}>{item.name === "EdgeSnap" ? 
            <Link to="/">
              <h1 className='text-3xl p-1.5 text-[#c9c9c9] font-medium font-unbounded cursor-pointer'>
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
        <button onClick={connectWallet} className='py-2 px-4 bg-primary-800 font-poppins font-medium hover:bg-primary-900 active:scale-95 border border-[#121212] rounded-[8px]'>
          {address ? shortAddress(address) : "Connect"}
        </button>    
      </div>

      {/* navbar for mobile */}
      <div className='flex w-[80vw] z-10 sm:hidden h-[56px] relative bg-transparent text-[#c9c9c9] p-2.5 mx-2 top-4 outline outline-2 outline-[#303030] rounded-[8px] gap-4 items-center justify-between'>
        <Link to="/">
          <h1 className='text-2xl p-2 font-medium font-unbounded cursor-pointer'>EdgeSnap</h1>
        </Link>
        {!state.polkadotSnap.isInstalled && <button onClick={connectWallet} className='py-2 px-4 bg-primary-800 font-poppins font-medium hover:bg-primary-900 active:scale-95 border border-[#121212] rounded-[8px]'>
          {address ? shortAddress(address) : "Connect"}
        </button>}
      </div>
    </>
  );
};

export default Navbar;