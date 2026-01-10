const { sendMessage } = require("./message");

const activeSessions = require("../util/activeSessions");

function logout(req, res) {
  if(req.cookies.SESSIONID) activeSessions.removeSession(req.cookies.SESSIONID);
  res.clearCookie("SESSIONID");
  sendMessage(res, "Déconnecté.");
}

module.exports.logout = logout;