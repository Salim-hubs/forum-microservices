const { sendMessage } = require("../util/message");
const sql = require("../sql/sqlUsers");
const auth = require("../util/auth");

async function getProfile(req, res) {
  const payload = auth.isAuthenticated(req, res);
  if (!payload) return;

  const login = await sql.getUserLogin(payload.userId);

  return sendMessage(res, { login });
}

module.exports.getProfile = getProfile;
