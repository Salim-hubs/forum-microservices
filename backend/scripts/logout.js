function logout(req, res) {
  res.clearCookie("SESSIONID");
  res.json({ status: "ok" });
}

module.exports.logout = logout;
