-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 10 jan. 2026 à 19:36
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `forum`
--

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_messages_topic` (`topic_id`),
  KEY `idx_messages_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `content`, `created_at`, `user_id`, `topic_id`) VALUES
(11, 'Bienvenue à tous sur ce forum 👋', '2026-01-10 18:10:00', 9, 1),
(12, 'Merci, super interface 😄', '2026-01-10 18:12:00', 3, 1),
(13, 'Hâte de discuter ici', '2026-01-10 18:15:00', 2, 1),
(14, 'Très propre ce forum', '2026-01-10 18:18:00', 6, 1),
(15, 'Bravo au dev !', '2026-01-10 18:22:00', 7, 1),
(16, 'Oui c’est super fluide', '2026-01-10 18:30:00', 10, 1),
(17, 'Le design est cool', '2026-01-10 18:35:00', 8, 1),
(18, 'Merci pour vos retours ❤️', '2026-01-10 18:40:00', 9, 1),
(19, 'Angular reste plus structuré', '2026-01-10 18:30:00', 4, 2),
(20, 'React est plus populaire', '2026-01-10 18:35:00', 2, 2),
(21, 'Angular a Typescript intégré', '2026-01-10 18:40:00', 1, 2),
(22, 'React est plus flexible', '2026-01-10 18:50:00', 5, 2),
(23, 'Angular pour gros projets', '2026-01-10 19:00:00', 4, 2),
(24, 'React pour MVP', '2026-01-10 19:05:00', 7, 2),
(25, 'Ça dépend du contexte', '2026-01-10 19:10:00', 3, 2),
(26, 'Je fais un RPG en JS', '2026-01-10 18:20:00', 2, 3),
(27, 'Un moteur de jeu en Rust', '2026-01-10 18:25:00', 7, 3),
(28, 'Un forum comme celui-ci 😉', '2026-01-10 18:30:00', 1, 3),
(29, 'Une app météo', '2026-01-10 18:40:00', 10, 3),
(30, 'Un bot Discord', '2026-01-10 18:45:00', 8, 3),
(31, 'Un éditeur de pixel art', '2026-01-10 18:55:00', 3, 3),
(32, 'Mon JWT expire trop vite', '2026-01-10 18:50:00', 1, 4),
(33, 'Regarde le refresh token', '2026-01-10 18:55:00', 4, 4),
(34, 'Vérifie ton timezone serveur', '2026-01-10 19:00:00', 6, 4),
(35, 'Oui c’est sûrement ça', '2026-01-10 19:05:00', 1, 4),
(36, 'Utilise UTC en DB', '2026-01-10 19:10:00', 9, 4),
(37, 'Et convertis côté front', '2026-01-10 19:15:00', 4, 4),
(38, 'Merci problème résolu !', '2026-01-10 19:20:00', 1, 4),
(39, 'GTA 7 est incroyable', '2026-01-10 18:00:00', 6, 5),
(40, 'J’adore le nouveau Zelda', '2026-01-10 18:05:00', 10, 5),
(41, 'Les graphismes sont fous', '2026-01-10 18:10:00', 3, 5),
(42, 'L’IA est bluffante', '2026-01-10 18:15:00', 5, 5),
(43, 'Mon PC souffre 😅', '2026-01-10 18:20:00', 7, 5),
(44, 'Mais ça vaut le coup', '2026-01-10 18:30:00', 6, 5),
(45, 'Je suis Admin 👑', '2026-01-10 18:10:00', 9, 6),
(46, 'Moi c’est NeoFox', '2026-01-10 18:15:00', 2, 6),
(47, 'PixelGirl, dev front', '2026-01-10 18:20:00', 3, 6),
(48, 'Rusty ici 👋', '2026-01-10 18:25:00', 7, 6),
(49, 'Luna, UX designer', '2026-01-10 18:30:00', 10, 6),
(50, 'Bienvenue tout le monde', '2026-01-10 18:45:00', 9, 6);

-- --------------------------------------------------------

--
-- Structure de la table `topics`
--

DROP TABLE IF EXISTS `topics`;
CREATE TABLE IF NOT EXISTS `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `last_activity` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `messages_count` int NOT NULL DEFAULT '0',
  `id_user` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_topics_activity` (`last_activity`),
  KEY `fk_topic_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `topics`
--

INSERT INTO `topics` (`id`, `title`, `last_activity`, `messages_count`, `id_user`) VALUES
(1, 'Bienvenue sur le forum', '2026-01-10 18:40:00', 8, 9),
(2, 'Angular vs React', '2026-01-10 19:10:00', 7, 4),
(3, 'Vos projets perso', '2026-01-10 18:55:00', 6, 2),
(4, 'Bug avec JWT', '2026-01-10 19:20:00', 7, 1),
(5, 'Jeux vidéo 2026', '2026-01-10 18:30:00', 6, 6),
(6, 'Présentez-vous', '2026-01-10 18:45:00', 6, 9);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `login`, `password`) VALUES
(1, 'bectaly', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(2, 'NeoFox', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(3, 'PixelGirl', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(4, 'CodeWizard', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(5, 'DarkMoon', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(6, 'ZeldaDev', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(7, 'Rusty', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(8, 'SnowCat', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(9, 'Admin', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
(10, 'Luna', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_messages_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `fk_topic_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
