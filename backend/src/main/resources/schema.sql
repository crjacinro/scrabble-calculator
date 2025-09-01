-- schema.sql
CREATE TABLE IF NOT EXISTS rules_letters(
    letter CHAR(1) PRIMARY KEY,
    score INT NOT NULL
);

-- For demonstration purposes, initialize database by default
MERGE INTO rules_letters (letter, score)
VALUES ('A', 1),
       ('E', 1),
       ('I', 1),
       ('O', 1),
       ('U', 1),
       ('L', 1),
       ('N', 1),
       ('S', 1),
       ('T', 1),
       ('R', 1),
       ('D', 2),
       ('G', 2),
       ('B', 3),
       ('C', 3),
       ('M', 3),
       ('P', 3),
       ('F', 4),
       ('H', 4),
       ('V', 4),
       ('W', 4),
       ('Y', 4),
       ('K', 6),
       ('J', 8),
       ('X', 8),
       ('Q', 10),
       ('Z', 10);

CREATE TABLE IF NOT EXISTS word_scores (
     id         INT         AUTO_INCREMENT  PRIMARY KEY,
     word_used  VARCHAR(50) NOT NULL,
     score      INT         NOT NULL,
     played_at  TIMESTAMP   DEFAULT         CURRENT_TIMESTAMP
);
