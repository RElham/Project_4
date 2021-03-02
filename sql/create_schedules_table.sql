DROP TABLE IF EXISTS schedules;

CREATE TABLE schedules(
    schedule_id serial PRIMARY KEY, 
    user_id INTEGER NOT NULL, 
    day INTEGER NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    CONSTRAINT fk_userid
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);

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