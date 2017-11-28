DROP TABLE IF EXISTS Likemark;

CREATE TABLE IF NOT EXISTS Likemark (
    id INTEGER NOT NULL PRIMARY KEY,
    parentId INTEGER NOT NULL REFERENCES Likemark(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    name TEXT NOT NULL,
    url TEXT
);

INSERT INTO Likemark (id, parentId, name, url) VALUES ('1', '0','Folder1', 'www.likemark.io' );
INSERT INTO Likemark (id, parentId, name, url) VALUES ('11', '1', 'Folder11', 'www.likemark.io' );
INSERT INTO Likemark (id, parentId, name, url) VALUES ('12', '1','Link12', 'www.likemark.io' );
INSERT INTO Likemark (id, parentId, name, url) VALUES ('2', '0','Folder2', 'www.likemark.io' );
INSERT INTO Likemark (id, parentId, name, url) VALUES ('21', '2', 'Folder21', 'www.likemark.io' );
INSERT INTO Likemark (id, parentId, name, url) VALUES ('22', '2', 'Folder22', 'www.likemark.io' );
INSERT INTO Likemark (id, parentId, name, url) VALUES ('23', '2','Folder23', 'www.likemark.io' );
INSERT INTO Likemark (id, parentId, name, url) VALUES ('231', '23','Folder231', 'www.likemark.io' );
INSERT INTO Likemark (id, parentId, name, url) VALUES ('3', '0', 'Link3', 'www.likemark.io' );