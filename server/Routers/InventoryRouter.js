const InventoryController = require('../controllers/InventoryController');
const express = require('express');
const router = express.Router();

router.post('/create', InventoryController.CreateInventoryItem);
router.get('/:productID', InventoryController.GetInventoryItem);
router.get('/', InventoryController.getAllInventoryItems);
module.exports = router;
