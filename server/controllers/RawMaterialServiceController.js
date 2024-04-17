const RawMaterialService = require('../models/RawMaterialService');
const {RMJConnector} = require('../utils/RawMaterialJourney')


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
        await RawMaterialService.findByIdAndDelete(req.params.materialId);
        res.status(200).json({message: 'Raw Material Deleted Successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

const getRawMaterialJourney = async (req, res) => {
    try{
        const step = parseInt(req.body.step);
        const materialId = req.params.materialId;
        console.log(step,materialId);
        
        const RMJ = await RMJConnector();
        const resp = await RMJ.getJourneyStep(materialId, step);
        console.log(resp);
        return res.status(200).json(resp);
    }catch(err){
        // console.log(err);
        return res.status(500).json({message: err.message});
    }
};
const addRawMaterialJourney = async (req, res) => {
    try{
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
module.exports = {
    createRawMaterial,
    getRawMaterials,
    getRawMaterialById,
    updateRawMaterial,
    deleteRawMaterial,
    getRawMaterialJourney,
    addRawMaterialJourney
}