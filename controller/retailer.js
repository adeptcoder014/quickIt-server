const model = require("../models/retailer");
//==================================================
module.exports = {
  //===============  GET_ALL ====================================
  getRetailer: async (req, res) => {
    try {
      const data = await model.find({});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //===============  POST_ACCOUNTS_HEADS_DEBITS ====================================
  postRetailer: async (req, res) => {
    const { name, location } = req.body;
    const data = new model({ name, location });
    try {
      await data.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
