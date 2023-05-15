const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
  
    res.status(200).json({
      email,
      subscription: subscription,
    });
  };
  
  module.exports = getCurrent;