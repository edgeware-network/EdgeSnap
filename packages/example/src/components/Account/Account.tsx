import React, { useContext } from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { formatBalance } from "@polkadot/util/format/formatBalance";
import { getCurrency } from "../../services/format";
import { MetaMaskContext } from "../../context/metamask";
import { card_style } from "../../style/theme";

export interface AccountProps {
  address: string;
  publicKey: string;
  balance: string;
  network: string;
}

export const Account = (props: AccountProps) => {

  const [state] = useContext(MetaMaskContext);

  const handleExport = async () => {
    if (!state.polkadotSnap.snap) return;
    const api = await state.polkadotSnap.snap.getMetamaskSnapApi();
    const privateKey = await api.exportSeed();
    alert(privateKey);
  };

  return (
    <Card style={card_style.card}>
      <CardHeader title="Account Details" />
      <CardContent>
        <Grid container alignItems="center">
          <Grid item md={6} xs={12}>
            <Typography variant="h6">Address:</Typography>
            <Typography variant="subtitle2">{props.address}</Typography>
            <Box m={"0.5rem"} />
            <Typography variant="h6">Public Key:</Typography>
            <Typography variant="subtitle2">{props.publicKey}</Typography>
            <Box m={"0.5rem"} />
            {/* eslint-disable-next-line max-len */}
            <Typography variant="h6">Account Balance: {formatBalance(props.balance, { decimals: 18, withSi: true, withUnit: getCurrency(props.network) })}
            </Typography>
            {/* eslint-disable-next-line max-len */}
            <Typography variant="subtitle2">
              {formatBalance(props.balance, { decimals: 18, withSi: true, withUnit: getCurrency(props.network) })}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="flex-end">
          <Button style={card_style.button} variant={"outlined"} onClick={handleExport}>Export Private Key</Button>
        </Grid>
      </CardContent>
    </Card>
  );
};
