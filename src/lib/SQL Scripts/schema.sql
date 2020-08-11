CREATE TABLE room_numbers (
    room_number VARCHAR(5) PRIMARY KEY,
    room_name VARCHAR(252),
    date_start DATE,
);

CREATE TABLE users (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    username VARCHAR(252)
);

CREATE TABLE game (
    room_number VARCHAR(5) PRIMARY KEY FOREIGN KEY REFERENCES room_numbers(room_number),
    player1_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES users(id),
    player2_id UNIQUEIDENTIFIER FOREIGN KEY REFERENCES users(id),
    board TEXT NOT NULL
);
