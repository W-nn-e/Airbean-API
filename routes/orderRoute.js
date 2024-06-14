const express = require('express');
const { createNewOrder } = require('../controllers/createOrderController');
const { getDeliveryInformation } = require('../controllers/seeDeliveryStatsController');
const { getOrderHistory } = require('../controllers/seeOrderHistoryController');
const { updateOrderStatus } = require('../controllers/updateOrderStatus');

const router = express.Router();

router.post('/order', createNewOrder);
router.get('/deliveryStats/:orderID', getDeliveryInformation);
router.get('/orderHistory/:id', getOrderHistory);
router.patch('/deliveryStats/:orderID/:userID', updateOrderStatus);

module.exports = router;
