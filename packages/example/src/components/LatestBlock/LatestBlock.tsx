import React from "react";
import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { BlockInfo } from "@chainsafe/metamask-polkadot-types";
import { card_style } from "../../style/theme";

export const LatestBlock = (props: { block: BlockInfo }) => {

  return (
    <Card style={card_style.card}>
      <CardHeader title="Latest Block" />
      <CardContent>
        <Grid container alignItems="center">
          <Grid item md={6} xs={12}>
            <Typography variant="h6">Block No:</Typography>
            <Typography variant="subtitle2">{props.block.number}</Typography>
            <Box m={"0.5rem"} />
            <Typography variant="h6">Hash:</Typography>
            <Typography variant="subtitle2">{props.block.hash}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};