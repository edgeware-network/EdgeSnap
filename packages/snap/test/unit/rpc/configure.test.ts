import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {beresheetConfiguration, edgewareConfiguration} from "../../../src/configuration/predefined";
import {configure} from "../../../src/rpc/configure";
import {EmptyMetamaskState} from "../../../src/interfaces";
import {SnapConfig} from "@chainsafe/metamask-polkadot-types";

chai.use(sinonChai);

describe('Test rpc handler function: configure', function() {
  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should set predefined beresheet configuration', async function() {
    walletStub.request.returns(EmptyMetamaskState());
    // tested method
    const result = await configure(walletStub, "beresheet", {});

    // assertions
    expect(result).to.be.deep.eq(beresheetConfiguration);
  });

  it('should set predefined edgeware configuration', async function() {
    walletStub.request.returns(EmptyMetamaskState());
    // tested method
    const result = await configure(walletStub, "edgeware", {});
    // assertions
    expect(result).to.be.deep.eq(edgewareConfiguration);
  });

  it('should set custom configuration', async function() {
    walletStub.request.returns(EmptyMetamaskState());
    // stubs
    const customConfiguration: SnapConfig = {
      addressPrefix: 1,
      networkName: "edgeware",
      unit: {customViewUrl: "custom-view-url", decimals: 1, image: "image", symbol: "TST"},
      wsRpcUrl: "ws-rpc-url",

    };
    // tested method
    const result = await configure(walletStub, "test-network", customConfiguration);
    // assertions
    expect(result).to.be.deep.eq(customConfiguration);
  });

  it('should set predefined beresheet configuration with additional property override', async function () {
    walletStub.request.returns(EmptyMetamaskState());
    // tested method
    const customConfiguration = beresheetConfiguration;
    customConfiguration.unit.symbol = "TST_KSM";
    const result = await configure(walletStub, "beresheet", {unit: {symbol: "TST_KSM"}} as SnapConfig);
    // assertions
    expect(result).to.be.deep.eq(customConfiguration);
  });
});