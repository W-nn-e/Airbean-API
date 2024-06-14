const { MenuModel, PromotionModel } = require('../models/menuModel');

exports.getMenu = async (req, res, next) => {
  try {
    const menu = await MenuModel.find();
    if (!menu) {
      throw new Error('No items found in the menu');
    }
    res.status(200).json({
      status: 'success',
      message: 'Menu successfully fetched',
      data: menu,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const newItem = await MenuModel.create({ ...req.body });
    res.status(201).json({
      status: 'success',
      message: 'New item successfully created',
      id: newItem._id,
      createdAt: newItem.createdAt,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const itemID = req.params.itemID;
    const update = req.body;
    const updatedItem = await MenuModel.findByIdAndUpdate(itemID, update, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return res.status(404).json({
        status: 'fail',
        message: 'Menu item not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Updated item successfully',
      data: updatedItem,
    });
  } catch (e) {
    res.status(400).json({
      status: 'error',
      message: e.message,
    });
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    const itemID = req.params.itemID;
    const deletedItem = await MenuModel.findByIdAndDelete(itemID);
    if (!deletedItem) {
      return res.status(404).json({
        status: 'fail',
        message: 'Menu item not found'
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Deleted item successfully',
      deletedItem
    });
  } catch (e) {
    res.status(400).json({
      status: 'error',
      message: e.message
    });
  }
};

exports.menuPromotion = async (req, res, next) => {
  try {
    const { item1Id, item2Id } = req.body;
    const item1 = await MenuModel.findById(item1Id);
    const item2 = await MenuModel.findById(item2Id);
    const originalPrice = item1.price + item2.price;
    const discountedPrice = originalPrice * 0.75;
    const newPromotionalOffer = new PromotionModel({
      includedProducts: [item1Id, item2Id],
      promotionalPrice: discountedPrice,
    });
    const savedOffer = await newPromotionalOffer.save();
    res.status(201).json({
      status: 'success',
      message: 'Promotion offer created successfully',
      data: savedOffer,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};
