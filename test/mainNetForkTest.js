const { messagePrefix } = require("@ethersproject/hash");
const Web3 = require("web3");
const web3 = new Web3('http://127.0.0.1:8545');


contract("TestUniswap", (accounts) => {
  let stableCoin;
  let conAddresss;
  let myAdd;
  let Value1;
  let Value;

  beforeEach(async () => {
    const StableCoin = await artifacts.require("stableCoin");
    stableCoin = await StableCoin.new();
    tknConAddresss = await stableCoin.address;
    const Access = await artifacts.require("Access");
    access = await Access.new();
    accConAddress = await access.address;
    Value1 =  web3.utils.toWei('50', 'ether');
    Value = Value1.toString();
    myAdd = '0x28846f1Ec065eEa239152213373bb58B1C9Fc93B';
    
  });

  // it("Shoult give price", async () => {
  //   await stableCoin.mint('0x415B7A6e580Ba1864B58FD357afD92ca27Ead284',Value);
  //   console.log((await stableCoin.balanceOf('0x415B7A6e580Ba1864B58FD357afD92ca27Ead284')).toString());
  //   console.log((await stableCoin.totalSupply()).toString());
  // });

  it("shoult pass", async () => {
    console.log(`tkn to eth ${((await access.getPrice())/1e18).toString()}`);
    console.log(`Eth bal ${await web3.eth.getBalance(myAdd)/1e18}`);
    await access.getStableToken(tknConAddresss,{from:myAdd,value:Value});
    let x = ((await stableCoin.balanceOf(myAdd))).toString();
    console.log(`coin bal${x/1e18}`);
    console.log(`Eth bal ${await web3.eth.getBalance(myAdd)/1e18}`);
    await stableCoin.approve(accConAddress,x,({from:myAdd}));
    await access.getETHBack(tknConAddresss,x,{from:myAdd});
    let y = ((await stableCoin.balanceOf(accConAddress))).toString();
    console.log(`coin bal${y}`);
    console.log(`Eth bal ${await web3.eth.getBalance(myAdd)/1e18}`);

  });

});