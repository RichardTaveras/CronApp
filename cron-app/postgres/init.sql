CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    sent BOOLEAN DEFAULT FALSE
);

INSERT INTO messages (content, sent) VALUES
('Mensaje 1', FALSE),
('Mensaje 2', FALSE),
('Mensaje 3', FALSE);
