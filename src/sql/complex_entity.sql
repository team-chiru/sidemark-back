DROP TABLE entity;

CREATE TABLE IF NOT EXISTS Entity (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    tree_id TEXT NOT NULL,
    name TEXT NOT NULL,
    url TEXT,
    struct_type TEXT NOT NULL, -- Link, Node, Folder, Tag, Groupe...
    fn_type TEXT, -- Music, Playlist, Video, NULL
    rev_no INTEGER NOT NULL,

    FOREIGN KEY(tree_id) REFERENCES entity(id) ON DELETE CASCADE
);

INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('1', 'test_node', "none", "folder", "music", 1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('11', 'test_node', "none", "folder","music", 1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('2', 'test_node', "none", "folder", "music", 1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('21', 'test_node', "none", "folder","music", 1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('211', 'test_node', "none", "folder","music",1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('22', 'test_node', "none", "folder","music", 1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('221', 'test_node',"none", "folder","music",1);

INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('1',"link name" ,'http://www.test.com', "link","music",1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('11', "link name",'http://www.test.com',"link","music",1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('12',"link name",'http://www.test.com',"link","music",1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('2', "link name",'http://www.test.com', "link","music",1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('21',"link name",'http://www.test.com', "link","music",1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('211',"link name",'http://www.test.com', "link","music",1);
INSERT INTO entity (tree_id, name, url, struct_type, fn_type, rev_no) VALUES ('22',"link name",'http://www.test.com', "link","music",1);
