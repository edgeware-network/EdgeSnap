import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Transfer } from "../../components/Transfer/Transfer";
import { SignMessage } from "../../components/SignMessage/SignMessage";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";
// import { Account } from "../../components/Account/Account";
import { MetaMaskContext } from "../../context/metamask";
// import { LatestBlock } from "../../components/LatestBlock/LatestBlock";
import { SnapNetworks, Transaction } from "@chainsafe/metamask-polkadot-types";
import { MetamaskSnapApi } from "@chainsafe/metamask-polkadot-adapter/build/types";
// import { MetaMaskConnector } from "../MetaMaskConnector/MetaMaskConnector";

import { card_style } from "../../style/theme";
const Extrinsics = () => {
  const [state] = useContext(MetaMaskContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [network, setNetwork] = useState<SnapNetworks>("edgeware");
  const [address, setAddress] = useState("");
  const [api, setApi] = useState<MetamaskSnapApi | null>(null);

  const handleNewTransaction = useCallback(async () => {
    if (!api) return;
    setTransactions((await api.getAllTransactions()));
  }, [setTransactions]);

  const handleNetworkChange = async (event: SelectChangeEvent<string>) => {
    const networkName = event.target.value as SnapNetworks;
    if (networkName === network) return;
    if (!api) return;
    await api.setConfiguration({ networkName: networkName });
    setNetwork(networkName);
  };

  useEffect(() => {
    (async () => {
      if (state.polkadotSnap.isInstalled && state.polkadotSnap.snap) {
        const polkadotApi = await state.polkadotSnap.snap.getMetamaskSnapApi();
        setApi(polkadotApi);
      }
    })();
  }, [state.polkadotSnap.isInstalled, state.polkadotSnap.snap]);

  useEffect(() => {
    (async () => {
      if (api) {
        setAddress(await api.getAddress());
        setTransactions((await api.getAllTransactions()));
      }
    })();
  }, [api, network]);

  return (
    <Container>
      <Grid>
        <Box m="1rem" />
        <Grid container spacing={3} alignItems="stretch">
          <Grid item md={6} xs={12}>
            <Transfer network={network} onNewTransferCallback={handleNewTransaction} />
          </Grid>
          <Grid item md={6} xs={12}>
            <SignMessage address={address} />
          </Grid>
        </Grid>
        <Box m="1rem" />
        <Grid container spacing={3} alignItems={"stretch"}>
          <Grid item xs={12}>
            <Card style={card_style.card}>
              <CardHeader title="Account Transactions" />
              <CardContent>
                <TransactionTable txs={transactions} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box m="5rem" />
      </Grid>
    </Container>
  );
};

export default Extrinsics;
