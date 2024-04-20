const RawMaterialServiceController = require('../controllers/RawMaterialServiceController')
const express = require('express');
const router = express.Router();

router.post('/create', RawMaterialServiceController.createRawMaterial);
router.get('/messages/', RawMaterialServiceController.getMessages);
router.get('/journey/:materialId', RawMaterialServiceController.getRawMaterialJourney);
router.post('/journey/:materialId', RawMaterialServiceController.addRawMaterialJourney);
router.get('/:materialId', RawMaterialServiceController.getRawMaterialById);
router.put('/:materialId', RawMaterialServiceController.updateRawMaterial);
router.delete('/delete/:materialId', RawMaterialServiceController.deleteRawMaterial);
router.get('/', RawMaterialServiceController.getRawMaterials);

module.exports = router;
