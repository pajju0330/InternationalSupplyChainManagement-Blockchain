const InventoryController = require('../controllers/InventoryController');
const express = require('express');
const router = express.Router();

router.post('/create', InventoryController.CreateInventoryItem);
router.get('/:productID', InventoryController.GetInventoryItem);
router.post('/createMessage', InventoryController.createMessage);
router.get('/', InventoryController.getAllInventoryItems);
module.exports = router;
