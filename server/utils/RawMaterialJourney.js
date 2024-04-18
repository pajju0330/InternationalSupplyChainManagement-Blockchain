const { ethers } = require("hardhat");
require('dotenv').config();
const fs = require('fs');
exports.RMJConnector = async () => {
    try {
        const [owner] = await ethers.getSigners();
        
        const RMJConnector = "0x573E7d2207A8E551Af78B5805D0492dcc60D4653"; 
        const abi = JSON.parse(fs.readFileSync('./artifacts/contracts/RawMaterialJourney.sol/RawMaterialJourney.json').toString()).abi;
        // console.log(abi);
        const Rmj = new ethers.Contract(RMJConnector, abi, owner);    
        // console.log(Rmj);  
        return Rmj;
    } catch (error) {
        console.log('Error initializing RawMaterialJourney contract:');
        // throw error; // Rethrow the error for proper handling in the calling code
    }
};

exports.InventoryConnector = async () => {
    try {
        const [owner] = await ethers.getSigners();
        
        const InventoryConnector = "0xcf133D9E584aF4EA2aB0e373AE135c1D3d587147"; 
        const abi = JSON.parse(fs.readFileSync('./artifacts/contracts/InventoryContract.sol/InventoryContract.json').toString()).abi;
        // console.log(abi);
        const Inventory = new ethers.Contract(InventoryConnector, abi, owner);    
        // console.log(Inventory);  
        return Inventory;
    } catch (error) {
        console.log('Error initializing InventoryContract contract:');
        // throw error; // Rethrow the error for proper handling in the calling code
    }
}
