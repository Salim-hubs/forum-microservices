const sql = require("../sql/sqlTopics");
const auth = require("../util/auth");
const { sendMessage, sendError } = require("../util/message");

async function createTopic(req, res) {
  const payload = auth.isAuthenticated(req, res);
  if(!payload) return;

  const { title } = req.body;
  if(!title) return sendError(res, "Le titre est requis");

  console.log("[TOPIC-SERVICE] createTopic:", title);

  const topicId = await sql.createTopic(title, payload.userId);

  sendMessage(res, { id: topicId });
}

module.exports.createTopic = createTopic;
