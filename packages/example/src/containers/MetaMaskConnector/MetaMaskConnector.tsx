import { Box, Button, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useCallback, useContext, useEffect, Fragment } from "react";
import Alert from "@mui/lab/Alert";
import { MetamaskActions, MetaMaskContext } from "../../context/metamask";
import { initiateFilecoinSnap, isPolkadotSnapInstalled } from "../../services/metamask";
import LinkIcon from '@mui/icons-material/Link';

export const MetaMaskConnector = () => {

  const [state, dispatch] = useContext(MetaMaskContext);

  useEffect(() => {
    (async () => {
      if (await isPolkadotSnapInstalled()) {
        dispatch({ payload: { isInstalled: true }, type: MetamaskActions.SET_INSTALLED_STATUS });
      }
    })();
  }, [dispatch]);

  const installSnap = useCallback(async () => {
    const installResult = await initiateFilecoinSnap();
    if (!installResult.isSnapInstalled) {
      // eslint-disable-next-line max-len
      dispatch({ payload: { isInstalled: false, message: "Please accept snap installation prompt" }, type: MetamaskActions.SET_INSTALLED_STATUS });
    } else {
      // eslint-disable-next-line max-len
      dispatch({ payload: { isInstalled: true, snap: installResult.snap }, type: MetamaskActions.SET_INSTALLED_STATUS });
    }
  }, [dispatch]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ payload: false, type: MetamaskActions.SET_INSTALLED_STATUS });
  };

  const shouldDisplaySnackbar = (): boolean => {
    if (!state.polkadotSnap.isInstalled && state.polkadotSnap.message) return true;
    else return false;
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        open={shouldDisplaySnackbar()}
        autoHideDuration={6000}
        onClose={handleClose}
        message={state.polkadotSnap.message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {/* Fix this style */}

      {!state.hasMetaMask &&
        <Fragment>
          <Alert variant="outlined" severity="warning">Ensure that MetaMask flask is installed!</Alert>
          <Box mt={"1rem"} />
        </Fragment>
      }
      <Button
        disabled={!state.hasMetaMask}
        onClick={installSnap}
        variant="outlined"
        size={"large"}
        style={{
          borderColor:"#d42b69",
          borderRadius:20,
        }}
        startIcon={<LinkIcon />}
      >
        Connect Metamask
      </Button>
    </div>
  );

};