DROP TABLE IF EXISTS Todos;
CREATE TABLE IF NOT EXISTS Todos (
    id INTEGER PRIMARY KEY, 
    title TEXT, 
    completed INT
);
INSERT INTO Todos (title, completed) VALUES ('Buy flight tickets', 0);
INSERT INTO Todos (title, completed) VALUES ('Book hotel', 0);
INSERT INTO Todos (title, completed) VALUES ('Pack luggage', 0);
INSERT INTO Todos (title, completed) VALUES ('Check in', 0);
INSERT INTO Todos (title, completed) VALUES ('Go to airport', 0);
INSERT INTO Todos (title, completed) VALUES ('Fly to destination', 0);
INSERT INTO Todos (title, completed) VALUES ('Enjoy vacation', 0);