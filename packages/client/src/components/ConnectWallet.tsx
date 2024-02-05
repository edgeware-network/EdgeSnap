// import React, { useCallback, useContext, useEffect } from "react"
// import { MetaMaskContext, MetamaskActions } from "../../context/metamask";
// import { shortAddress } from "../../services/format";
// import { initiatePolkadotSnap } from "../../services/metamask";

// const ConnectWallet = (): React.JSX.Element => {
//     const [state, dispatch ] = useContext(MetaMaskContext);
//     const [, setAddress] = React.useState<string>('')
    
//     const updateWallet = useCallback(async () => {
//         if (window.ethereum && state.connectWallet.isManuallyDisConnected) {
//             try {
//                 const accounts: string[] = await window.ethereum.request({
//                     method: "eth_accounts",
//                 });
//                 if (accounts.length > 0) {
//                     setAddress(accounts[0]);
//                     dispatch({ type: MetamaskActions.SET_CONNECTED_STATUS, payload: { isConnected: true, address: accounts[0] } });
//                     const installResult = await initiatePolkadotSnap();
//                     if (!installResult.isSnapInstalled) {
//                         dispatch({
//                             payload: {
//                                 isInstalled: false,
//                                 message: 'Please accept snap installation prompt'
//                             },
//                             type: MetamaskActions.SET_INSTALLED_STATUS
//                         });
//                     } else {
//                         dispatch({
//                             payload: { isInstalled: true, snap: installResult.snap },
//                             type: MetamaskActions.SET_INSTALLED_STATUS
//                         });
//                     }
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }, [dispatch, state.connectWallet.isManuallyDisConnected]);

//     useEffect(() => {
//         updateWallet();
//     }, [updateWallet]);

//     const connectWallet = async () => {
//         try {
//             if(window.ethereum && !state.connectWallet.isManuallyDisConnected ) {
//                 dispatch({type: MetamaskActions.SET_DISCONNECTED_STATUS , payload: {isManuallyDisconnected: false}});
//                 await window.ethereum.request({
//                     method: "wallet_requestPermissions",
//                     params: [{ eth_accounts: {} }],
//                 });
//                 const accounts: string[] = await window.ethereum.request({
//                     method: "eth_requestAccounts",
//                 })
//                 setAddress(accounts[0]);
//                 dispatch({type: MetamaskActions.SET_CONNECTED_STATUS, payload: {isConnected: true, address: accounts[0]}});
//                 const installResult = await initiatePolkadotSnap();
//                 if (!installResult.isSnapInstalled) {
//                   dispatch({
//                     payload: {
//                       isInstalled: false,
//                       message: 'Please accept snap installation prompt'
//                     },
//                     type: MetamaskActions.SET_INSTALLED_STATUS
//                   });
//                 } else {
//                   dispatch({
//                     payload: { isInstalled: true, snap: installResult.snap },
//                     type: MetamaskActions.SET_INSTALLED_STATUS
//                   });
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };
    
//   return (
//     <button onClick={connectWallet} className='px-4 py-1 bg-inherit font-unbounded font-medium hover:bg-[#131313] active:scale-95 border border-[#353535] rounded-[6px]'>
//         {state.connectWallet.isConnected ? (
//             <div className="flex items-center justify-center gap-1">
//                 <h3 className="text-sm font-bold font-unbounded">{shortAddress(state.connectWallet.address)}</h3>
//             </div>
//         ) : (
// 					"Connect Wallet"
// 					)}
//     </button>
//   );
// };

// export default ConnectWallet

import React, { useCallback, useContext, useEffect } from "react"
import { MetaMaskContext, MetamaskActions } from "../../context/metamask";
import { shortAddress } from "../../services/format";
import { initiatePolkadotSnap } from "../../services/metamask";

const ConnectWallet = (): React.JSX.Element => {
    const [state, dispatch ] = useContext(MetaMaskContext);
    const [, setAddress] = React.useState<string>('');

    const updateWallet = useCallback(async () => {
        if (window.ethereum && !isManuallyDisconnected()) {
            try {
                const accounts: string[] = await window.ethereum.request({
                    method: "eth_accounts",
                });
                if (accounts.length > 0) {
                    setAddress(accounts[0]);
                    dispatch({ type: MetamaskActions.SET_CONNECTED_STATUS, payload: { isConnected: true, address: accounts[0] } });
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
            } catch (error) {
                console.log(error);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        updateWallet();
    }, [updateWallet]);

    const isManuallyDisconnected = () => localStorage.getItem('isManuallyDisconnected') === 'true';

    const connectWallet = async () => {
        try {
            localStorage.setItem('isManuallyDisconnected', 'false'); // Reset manual disconnection on attempt to connect
            if(window.ethereum) {
                await window.ethereum.request({
                    method: "wallet_requestPermissions",
                    params: [{ eth_accounts: {} }],
                });
                const accounts: string[] = await window.ethereum.request({
                    method: "eth_requestAccounts",
                })
                setAddress(accounts[0]);
                dispatch({type: MetamaskActions.SET_CONNECTED_STATUS, payload: {isConnected: true, address: accounts[0]}});
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
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <button onClick={connectWallet} className='px-4 py-1 bg-inherit font-unbounded font-medium hover:bg-[#131313] active:scale-95 border border-[#353535] rounded-[6px]'>
        {state.connectWallet.isConnected ? (
            <div className="flex items-center justify-center gap-1">
                <h3 className="text-sm font-bold font-unbounded">{shortAddress(state.connectWallet.address)}</h3>
            </div>
        ) : (
					"Connect Wallet"
					)}
    </button>
  );
};

export default ConnectWallet