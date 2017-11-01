DROP TABLE entity;

CREATE TABLE IF NOT EXISTS Entity (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT
);

INSERT INTO entity ( name, url) VALUES ('test_node', 'www.likemark.io' );
INSERT INTO entity ( name, url) VALUES ('test_node', 'www.likemark.io' );
INSERT INTO entity ( name, url) VALUES ('test_node', 'www.likemark.io' );
INSERT INTO entity ( name, url) VALUES ('test_node', 'www.likemark.io' );
INSERT INTO entity ( name, url) VALUES ('test_node', 'www.likemark.io' );