module.exports = async (req, res) => {
    const Country = require('../models/mongo').Country;  
  
    let countries = await Country.find({ is_active: true, is_deleted: false }, "-_id").lean();
    if (countries) {
      return res.status(200).send({ type: "Sucess", data: countries });
    } else {
      return res.status(500).send({ type: "error", message: "Internal Server Error" });
    }
  
  };