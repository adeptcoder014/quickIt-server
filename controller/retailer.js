const { default: axios } = require("axios");
const { URL } = require("../constants/url");
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

  //===============  GET_ALL ====================================
  getNearestRetailer: async (req, res) => {
    const shopData = await axios.get(`http://34.224.95.138:5000/retailer`);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the earth in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      // console.log('==================>', dLat);
      // console.log('==================>', dLon);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in meters
      return d;
    };

    const filterShopsByDistance = (shops, lat, lon) => {
      const distance = 150;
      const NEAREST_DISTANCE_IN_KM = distance / 1000; // Convert meters to kilometers
      // console.log("--->", shops);

      return shops.filter((shop) => {
        const distance = calculateDistance(
          lat,
          lon,
          shop.location.coordinates[0],
          shop.location.coordinates[1]
        );
        return distance <= NEAREST_DISTANCE_IN_KM;
      });
    };
    try {
      const data = filterShopsByDistance(shopData.data, req.body.lat, req.body.long);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //===================================================
  postRetailer: async (req, res) => {
    const { name, location, category, mobile } = req.body;
    const data = new model({ name, location, category, mobile });
    try {
      await data.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
