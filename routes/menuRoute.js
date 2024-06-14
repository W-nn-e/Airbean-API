const express = require('express');
const { isAdmin } = require('../middleware/adminAuth');
const { getMenu, createMenuItem, updateMenuItem, deleteMenuItem, menuPromotion } = require('../controllers/menuController');

const router = express.Router();

router.get('/menu', getMenu);
router.post('/admin/menu', isAdmin, createMenuItem);
router.put('/admin/menu/:itemID', isAdmin, updateMenuItem);
router.delete('/admin/menu/:itemID', isAdmin, deleteMenuItem);
router.post('/admin/menu/promotion', isAdmin, menuPromotion);

module.exports = router;
