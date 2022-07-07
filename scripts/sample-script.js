// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const StableCoin = await hre.ethers.getContractFactory("stableCoin");
  const stableCoin = await StableCoin.deploy();
  await stableCoin.deployed();
  const Access = await hre.ethers.getContractFactory("Access");
  const access = await Access.deploy();
  await access.deployed();

  console.log("StableCoin Address:", stableCoin.address);
  console.log("Access Address:", access.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
