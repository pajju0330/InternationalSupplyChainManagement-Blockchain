const RawMaterialService = require('../models/RawMaterialService');
const {RMJConnector} = require('../utils/RawMaterialJourney')
const {timestampToDate} = require('../utils/converter')
const MessageService = require('../models/MessageService');
const createRawMaterial = async (req, res) => {
    try{
        const {name, MateriaID, description, PricePerUnit, Quantity, SupplierID, ExpiryDate, Status} = req.body;
        const newRawMaterial = new RawMaterialService({name, MateriaID, description, PricePerUnit, Quantity, SupplierID, ExpiryDate, Status});
        await newRawMaterial.save();
        res.status(201).json(newRawMaterial);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

const getRawMaterials = async (req, res) => {
    try{
        const rawMaterials = await RawMaterialService.find();
        res.status(200).json(rawMaterials);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

const getRawMaterialById = async (req, res) => {
    try{    
       const MateriaID = req.params.materialId
        const rawMaterial = await RawMaterialService.find({MateriaID});
        res.status(200).json(rawMaterial);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}
const updateRawMaterial = async (req, res) => {
    try{
        const {name, MateriaID, description, PricePerUnit, Quantity, SupplierID, ExpiryDate, Status} = req.body;
        const updatedRawMaterial = await RawMaterialService.findByIdAndUpdate(req.params.materialId, {name, MateriaID, description, PricePerUnit, Quantity, SupplierID, ExpiryDate, Status}, {new: true});
        res.status(200).json(updatedRawMaterial);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

const deleteRawMaterial = async (req, res) => {
    try{
        const MateriaID = req.params.materialId;
            await RawMaterialService.deleteOne({MateriaID});
        res.status(200).json({message: 'Raw Material Deleted Successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

const getRawMaterialJourney = async (req, res) => {
    try{
        const materialId = req.params.materialId;
        if(!materialId) return res.status(400).json({message: 'Material ID is required'});
        
        const RMJ = await RMJConnector();
        let resp = await RMJ.getAllJourneyDetailsForMaterial(materialId);
        let modifiedResp = resp.map(item => {
            return {
                materialID: item.materialID,
                timestamp: timestampToDate(item.timestamp),
                location: item.location,
                description: item.description
            };
        });
        return res.status(200).json(modifiedResp);
    }catch(err){
        // console.log(err);
        return res.status(500).json({message: err.message});
    }
};
const addRawMaterialJourney = async (req, res) => {
    try{
        // console.log(reqparams, req.body);
        const RMJ = await RMJConnector();
        // console.log(req.params.materialId);
        const resp = await RMJ.addJourneyStep(req.params.materialId, req.body.location, req.body.description);
        // console.log(resp);
        return res.status(200).json(resp);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
};
const getMessages = async (req, res) => {
    try{
        console.log("hello");
        const messages = await MessageService.find();
        console.log(messages);
        res.status(200).json(messages);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}
module.exports = {
    createRawMaterial,
    getRawMaterials,
    getRawMaterialById,
    updateRawMaterial,
    deleteRawMaterial,
    getRawMaterialJourney,
    addRawMaterialJourney,
    getMessages
}