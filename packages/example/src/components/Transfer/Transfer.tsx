import React, {useCallback, useContext, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  Snackbar,
  TextField
} from '@mui/material';
import { Alert } from "@mui/lab";
import { getCurrency } from "../../services/format";
import {MetaMaskContext} from "../../context/metamask";
import { card_style } from "../../style/theme";

interface ITransferProps {
  network: string;
  // eslint-disable-next-line
  onNewTransferCallback: any;
}

type AlertSeverity = "success" | "warning" | "info" | "error";

export const Transfer: React.FC<ITransferProps> = ({ network, onNewTransferCallback }) => {
  const [state] = useContext(MetaMaskContext);

  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string | number>("");

  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState("success" as AlertSeverity);
  const [message, setMessage] = useState("");
  const [polkascanUrl, setPolkascanUrl] = useState("");

  const handleRecipientChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(event.target.value);
  }, [setRecipient]);

  const handleAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }, [setAmount]);

  const showAlert = (severity: AlertSeverity, message: string, txHash?: string) => {
    setPolkascanUrl(txHash ? `https://edgeware.subscan.io/extrinsic/${txHash}` : "");
    setSeverity(severity);
    setMessage(message);
    setAlert(true);
  };

  const onSubmit = useCallback(async () => {
    if (!state.polkadotSnap.snap) return;
    if (amount && recipient) {
      const api = await state.polkadotSnap.snap.getMetamaskSnapApi();
      if (amount && recipient) {

        const convertedAmount = BigInt(amount) * BigInt("1000000000");
        const txPayload = await api.generateTransactionPayload(convertedAmount.toString(), recipient);
        const signedTx = await api.signPayloadJSON(txPayload.payload);
        const tx = await api.send(signedTx, txPayload);
        showAlert("info", `Transaction: ${JSON.stringify(tx, null, 2)}`, tx.hash);
        // clear fields
        setAmount("");
        setRecipient("");
        // invoke provided callback to inform parent component that new tx is sent
        onNewTransferCallback();
      } else {
        showAlert("error", "Please fill recipient and amount fields.");
      }
    }
  }, [amount, recipient, setAmount, setRecipient, onNewTransferCallback]);

  return (
    <Card style={card_style.card}>
      <CardContent>
        <CardHeader title="Transfer" />
        <Grid 
          container 
          alignItems="center" 
          justifyContent="center"
        >
          <Grid item xs={12}>
            <TextField
              // eslint-disable-next-line max-len
              onChange={handleRecipientChange} size="medium" fullWidth id="recipient" label="Recipient" variant="outlined" value={recipient}>
            </TextField>
            <Box m="0.5rem" />
            <TextField
              // eslint-disable-next-line max-len
              InputProps={{ startAdornment: <InputAdornment position="start">{`${getCurrency(network)}`}</InputAdornment> }}
              // eslint-disable-next-line max-len
              onChange={handleAmountChange} size="medium" fullWidth id="recipient" label="Amount" variant="outlined" value={amount}>
            </TextField>
          </Grid>
        </Grid>
        <Box m="0.5rem" />
        <Grid container item xs={12} justifyContent={"right"}>
          <Button onClick={onSubmit} style={card_style.button} variant="outlined" size="large">Transfer</Button>
        </Grid>
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={() => setAlert(false)}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}>
          <Alert severity={severity} onClose={() => setAlert(false)}>
            {`${message} `}
            {
              <a href={polkascanUrl} target="_blank">See details</a>
            }
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};
