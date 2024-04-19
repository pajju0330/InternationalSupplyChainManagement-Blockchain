
const {InventoryConnector} = require('../utils/RawMaterialJourney')
const CreateInventoryItem = async (req, res) => {
    try{
        /*
        string memory _productID,
        string memory _productName,
        string memory _description,
        uint _quantity,
        string memory _unit,
        string memory _location
        */
        const {name,productID, description, Quantity, PricePerUnit, location} = req.body;
        const InvConnector = await InventoryConnector(); 
        const resp = await InvConnector.createInventoryItem(productID, name, description, Quantity, PricePerUnit, location);
        res.status(201).json(resp);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

const GetInventoryItem = async (req, res) => {
    try{
        const {productID} = req.params;
        const InvConnector = await InventoryConnector(); 
        const resp = await InvConnector.getInventoryItem(productID);
        res.status(200).json(resp);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}
const getAllInventoryItems = async (req, res) => {
    try{
        const InvConnector = await InventoryConnector(); 
        const resp = await InvConnector.getAllInventoryItems();
        res.status(200).json(resp);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}


module.exports = {
    CreateInventoryItem,
    GetInventoryItem,
    getAllInventoryItems
}