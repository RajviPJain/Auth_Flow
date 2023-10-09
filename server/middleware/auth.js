const isAuthenticated = async (req, res, next) => {
  console.log(req.isAuthenticated());
  // console.log(req)
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("PLease Authenticate"); // Redirect to login if not authenticated
};

module.exports = isAuthenticated;
