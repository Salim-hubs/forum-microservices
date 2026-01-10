const mysqlConnect = require("./sqlConnect");

// Retourne tous les messages d'un topic
async function getMessagesById(topicId) {
  const query = `
    SELECT m.id, m.content, m.created_at AS date, u.login AS creator
    FROM Messages m
    JOIN Users u ON m.user_id = u.id
    WHERE m.topic_id = ?
    ORDER BY m.created_at ASC
  `;
  return mysqlConnect.query(query, [topicId]);
}

// Ajoute un message et met à jour le topic (messages + last_activity)
async function addMessageToTopic(topicId, userId, content) {
  const timestamp = new Date().toISOString().slice(0,19).replace('T', ' ');

  // Insert message
  await mysqlConnect.query(
    `INSERT INTO Messages (content, created_at, user_id, topic_id) VALUES (?, ?, ?, ?)`,
    [content, timestamp, userId, topicId]
  );

  // Update topic
  await mysqlConnect.query(
    `UPDATE Topics SET messages_count = messages_count + 1, last_activity = ? WHERE id = ?`,
    [timestamp, topicId]
  );
}

module.exports.getMessagesById = getMessagesById;
module.exports.addMessageToTopic = addMessageToTopic;