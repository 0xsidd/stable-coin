/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle")
 require("@nomiclabs/hardhat-truffle5");
 const ALCHEMY_API_KEY = "25HIH4mOEe99JryjIzWujRkKc2uUmr72";
 const WALLET_PRIVATE_KEY = "0cb9ff1849e6d47f991d09b8ce9acec5e5d24866dc4683a45415fcaa47e652e0";
 
 module.exports = {
   solidity: "0.8.9",
 
   networks:{
     rinkeby:{
       url:`https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
       accounts:[`${WALLET_PRIVATE_KEY}`],
 
     },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
  }
}
 