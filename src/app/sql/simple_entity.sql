DROP TABLE IF EXISTS Likemark;

CREATE TABLE IF NOT EXISTS Likemark (
    id TEXT NOT NULL PRIMARY KEY,
    parentId TEXT NOT NULL REFERENCES Likemark(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    title TEXT NOT NULL,
    url TEXT
);

INSERT INTO Likemark (id, parentId, title, url) VALUES ('0', '-1','Folder1', 'http://likemark.io' );
INSERT INTO Likemark (id, parentId, title, url) VALUES ('1', '0','Folder1', 'http://likemark.io' );
INSERT INTO Likemark (id, parentId, title, url) VALUES ('11', '1', 'Folder11', 'http://likemark.io' );
INSERT INTO Likemark (id, parentId, title, url) VALUES ('12', '1','Link12', 'http://likemark.io' );
INSERT INTO Likemark (id, parentId, title, url) VALUES ('2', '0','Folder2', 'http://likemark.io' );
INSERT INTO Likemark (id, parentId, title, url) VALUES ('21', '2', 'Folder21', "http://likemark.io" );
INSERT INTO Likemark (id, parentId, title, url) VALUES ('22', '2', 'Folder22', 'http://likemark.io' );
INSERT INTO Likemark (id, parentId, title, url) VALUES ('23', '2','Folder23', 'http://likemark.io' );
INSERT INTO Likemark (id, parentId, title, url) VALUES ('231', '23','Folder231', 'http://likemark.io' );
INSERT INTO Likemark (id, parentId, title, url) VALUES ('3', '0', 'Link3', 'http://likemark.io' );
