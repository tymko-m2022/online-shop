const { Schema, model} = require('mongoose');

const lotSchema = new Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  exchangePrice: { type: Number, required: true },
  comments: [{ type: String }],
});

const LotModel = model('Lot', lotSchema);

module.exports = LotModel;