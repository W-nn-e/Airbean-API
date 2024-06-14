const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' }
});

const MenuModel = mongoose.model('menu', MenuSchema);

const PromotionSchema = new mongoose.Schema({
  includedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'menu',
    required: true
  }],
  promotionalPrice: {
    type: Number,
    required: true
  }
});

const PromotionModel = mongoose.model('promotion', PromotionSchema);

module.exports = {
  MenuSchema,
  MenuModel,
  PromotionSchema,
  PromotionModel,
};
