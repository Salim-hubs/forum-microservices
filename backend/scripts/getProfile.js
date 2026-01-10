const { sendMessage } = require("../util/message");
const sql = require("../sql/sqlUsers");
const auth = require("../util/auth");

async function getProfile(req, res) {
  // Vérifie que le JWT est valide
  const payload = auth.isAuthenticated(req, res);
  if (!payload) return; // Erreur renvoyée depuis isAuthenticated

  // Récupère le login depuis l'ID
  const login = await sql.getUserLogin(payload.userId);

  return sendMessage(res, { login });
}

module.exports.getProfile = getProfile;
