const RawMaterialServiceController = require('../controllers/RawMaterialServiceController')
const express = require('express');
const router = express.Router();

router.post('/create', RawMaterialServiceController.createRawMaterial);
router.get('/', RawMaterialServiceController.getRawMaterials);
router.get('/:materialId', RawMaterialServiceController.getRawMaterialById);
router.put('/:materialId', RawMaterialServiceController.updateRawMaterial);
router.delete('/:materialId', RawMaterialServiceController.deleteRawMaterial);
router.get('/journey/:materialId', RawMaterialServiceController.getRawMaterialJourney);
router.post('/journey/:materialId', RawMaterialServiceController.addRawMaterialJourney);

module.exports = router;
