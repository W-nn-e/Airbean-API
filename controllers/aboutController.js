const aboutJSON = require('../data/about.json');

exports.aboutInfo = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'About successfully fetched',
      data: aboutJSON,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    });
  }
};
