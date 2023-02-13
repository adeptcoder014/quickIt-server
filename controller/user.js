const model = require("../models/user");
const jwt = require("jsonwebtoken");
//==================================================
module.exports = {
  //===============  Login ====================================
  login: async (req, res) => {
    // Find the user in the list of users
    try {
      const user = await model.findOne({ email: req.body.email });
      console.log("user ======", user);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Email or password is incorrect" });
      }

      // Generate a JWT and send it as a response
      const token = jwt.sign({ userId: user.id }, "369");

      return res.header("auth-token", token).json({ token });
    } catch (error) {
      return res.status(500).json("Something went wrong !");
    }
  },
  //===================================================
  register: async (req, res) => {
    const { name, email, password } = req.body;
    const data = new model({ name, email, password });
    try {
      await data.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
