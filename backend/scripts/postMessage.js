const auth = require("../util/auth");
const sql = require("../sql/sqlMessages.js");
const { sendMessage, sendError } = require("../util/message");

async function postMessage(req, res) {
  const payload = auth.isAuthenticated(req, res);
  if(!payload) return;

  const { topicId, content } = req.body;
  if(!content) return sendError(res, "Le message est vide");

  const userId = payload.userId;

  await sql.addMessageToTopic(topicId, userId, content);

  sendMessage(res, { status: "ok" });
}

module.exports.postMessage = postMessage;
