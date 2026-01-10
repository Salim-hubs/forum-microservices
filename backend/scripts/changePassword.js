const { sendError, sendMessage } = require("../util/message");
const { hashPassword } = require("../util/hash");
const sql = require("../sql/sqlUsers");
const auth = require("../util/auth");

async function changePassword(req, res) {
  const payload = auth.isAuthenticated(req, res);
  if (!payload) return;

  const userId = payload.userId;
  const { oldPassword, newPassword } = req.body;

  const oldHash = hashPassword(oldPassword);
  const ok = await sql.checkPassword(userId, oldHash);
  if (!ok) return sendError(res, "Mot de passe actuel incorrect");

  const newHash = hashPassword(newPassword);
  await sql.updatePassword(userId, newHash);

  sendMessage(res, { status: "ok" });
}

module.exports.changePassword = changePassword;
