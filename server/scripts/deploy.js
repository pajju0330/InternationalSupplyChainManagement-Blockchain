const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const RawMaterialJourney = await ethers.getContractFactory("RawMaterialJourney");
  const rawMaterialJourney = await RawMaterialJourney.deploy();
  await rawMaterialJourney.deployed();

  const InventoryContract = await ethers.getContractFactory("InventoryContract");
  const inventoryContract = await InventoryContract.deploy();
  await inventoryContract.deployed();

  console.log("RawMaterialJourney contract deployed to:", rawMaterialJourney.address);
  console.log("InventoryContract contract deployed to:", inventoryContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
