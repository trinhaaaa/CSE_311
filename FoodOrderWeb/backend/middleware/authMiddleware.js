function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next(); // Tiếp tục đến route yêu cầu xác thực
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Please log in first!" });
  }
}

module.exports = { isAuthenticated };
