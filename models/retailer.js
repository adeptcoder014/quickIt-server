const mongoose = require("mongoose");
//================================
const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});



const retailerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: locationSchema,
    required: true
  }
})
retailerSchema.index({ location: '2dsphere' });


const model = mongoose.model("retailer", retailerSchema);

module.exports = model;
