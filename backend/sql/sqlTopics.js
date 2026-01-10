const mysqlConnect = require("./sqlConnect");
const sqlUsers = require("./sqlUsers");

async function getAllTopics() {
  const query = `
    SELECT t.id, t.title, t.last_activity AS date, t.messages_count AS messages, u.login AS creator
    FROM Topics t
    JOIN Users u ON t.id_user = u.id
  `;
  return mysqlConnect.query(query, []);
}

async function createTopic(title, userId) {
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = `INSERT INTO Topics (title, last_activity, messages_count, id_user) VALUES (?, ?, 0, ?)`;
  const res = await mysqlConnect.query(query, [title, timestamp, userId]);
  return res.insertId;
}

// Retourne les infos d'un topic
async function getTopicById(id) {
  const query = `SELECT id, title FROM Topics WHERE id = ?`;
  const res = await mysqlConnect.query(query, [id]);
  return res.length ? res[0] : null;
}

module.exports.getAllTopics = getAllTopics;
module.exports.createTopic = createTopic;
module.exports.getTopicById = getTopicById;