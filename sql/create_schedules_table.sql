DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    schedule_id serial PRIMARY KEY, 
    user_id INTEGER NOT NULL, 
    day INTEGER NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL);

INSERT INTO schedules
(user_id, day, start_at, end_at) 
VALUES 
('1', '1', '14:00:00', '16:00:00');

INSERT INTO schedules
(user_id, day, start_at, end_at) 
VALUES 
('1', '2', '14:00:00', '16:00:00');

INSERT INTO schedules
(user_id, day, start_at, end_at) 
VALUES 
('1', '3', '14:00:00', '16:00:00');

INSERT INTO schedules
(user_id, day, start_at, end_at) 
VALUES 
('3', '5', '08:00:00', '18:00:00');