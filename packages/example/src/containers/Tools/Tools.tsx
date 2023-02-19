import React from 'react';
import { Intro, EVMDeposit, EVMWithdrawal, ConvertAddress, ConvertPublicKey } from '../../components/Tools';

const Tools = () => {
  return (
    <>
      <Intro />
      <EVMDeposit />
      <EVMWithdrawal />
      <ConvertAddress />
      <ConvertPublicKey />
    </>
  );
};

export default Tools;