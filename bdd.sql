CREATE DATABASE IF NOT EXISTS forum
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE forum;

-- =========================
-- TABLE USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME NULL
) ENGINE=InnoDB;

-- =========================
-- TABLE TOPICS
-- =========================
CREATE TABLE topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_activity DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    messages_count INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- =========================
-- TABLE MESSAGES
-- =========================
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    topic_id INT NOT NULL,

    CONSTRAINT fk_messages_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_messages_topic
        FOREIGN KEY (topic_id) REFERENCES topics(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- INDEXES (performance)
-- =========================
CREATE INDEX idx_messages_topic ON messages(topic_id);
CREATE INDEX idx_messages_user ON messages(user_id);
CREATE INDEX idx_topics_activity ON topics(last_activity);
