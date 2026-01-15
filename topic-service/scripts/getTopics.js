const sql = require("../sql/sqlTopics");
const auth = require("../util/auth");
const { sendMessage } = require("../util/message");

async function getTopics(req, res) {
  const payload = auth.isAuthenticated(req, res);
  if(!payload) return;

  console.log("[TOPIC-SERVICE] getTopics");

  const topics = await sql.getAllTopics();
  // Retourner trié par date décroissante
  topics.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  sendMessage(res, { topics });
}

module.exports.getTopics = getTopics;
