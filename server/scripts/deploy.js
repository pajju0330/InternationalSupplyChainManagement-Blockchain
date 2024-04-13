const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const RawMaterialJourney = await ethers.getContractFactory("RawMaterialJourney");
  const rawMaterialJourney = await RawMaterialJourney.deploy();
  await rawMaterialJourney.deployed();
  // console.log(rawMaterialJourney);
  console.log("RawMaterialJourney contract deployed to:", rawMaterialJourney.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
