const auth = require("../util/auth.js");
const sqlt = require("../sql/sqlTopics.js");
const sqlm = require("../sql/sqlMessages.js");
const { sendMessage } = require("../util/message.js");

async function getMessages(req, res) {
  const payload = auth.isAuthenticated(req, res);
  if(!payload) return;

  const { id } = req.body;

  console.log("[TOPIC-SERVICE] getMessages for topic:", id);

  const topic = await sqlt.getTopicById(id);
  if(!topic) return sendMessage(res, { topic: null, messages: [] });

  const messages = await sqlm.getMessagesById(id);

  sendMessage(res, {
    title: topic.title,
    messages
  });
}

module.exports.getMessages = getMessages;
