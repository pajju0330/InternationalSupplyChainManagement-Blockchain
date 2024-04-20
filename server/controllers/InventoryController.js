
const {InventoryConnector} = require('../utils/RawMaterialJourney')
const MessageService = require('../models/MessageService');
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
        const modifiedResp = resp.map(item => {
            return {
                productID: item.productID.toString(),
                productName: item.productName,
                description: item.description,
                quantity: item.quantity.toString(),
                unit: item.unit.toString(),
                location: item.location
            }
        });
        res.status(200).json(modifiedResp);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

const createMessage = async (req, res) => {
    try{
        const {sender,receiver,Date,MaterialID,Quantity,message} = req.body;
        const newMessage = new MessageService({sender,receiver,Date,MaterialID,Quantity,message});
        await newMessage.save();
        res.status(201).json(newMessage);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

const updateMessageStatus = async (req, res) => {
    try{
        const {status} = req.body;
        const updatedMessage = await MessageService.findByIdAndUpdate(req.params.messageId, {status}, {new: true});
        res.status(200).json(updatedMessage);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

module.exports = {
    CreateInventoryItem,
    GetInventoryItem,
    getAllInventoryItems,
    createMessage,
    updateMessageStatus
}
