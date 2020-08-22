drop table game;
drop table room_numbers;
CREATE TABLE room_numbers (
    room_number VARCHAR(5) PRIMARY KEY,
    date_start DATETIME,
    users_count INT
);

CREATE TABLE game (
    room_number VARCHAR(5) PRIMARY KEY FOREIGN KEY REFERENCES room_numbers(room_number),
    board TEXT NOT NULL
);
