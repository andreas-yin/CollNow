CREATE DATABASE collnow;

CREATE TABLE questions(
    question_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    title VARCHAR(500) NOT NULL CHECK (title <> ''),
    specialty VARCHAR(20),
    setting VARCHAR(20),
    age VARCHAR(3),
    sex VARCHAR(10),
    primary_dx VARCHAR,
    secondary_dx VARCHAR,
    description VARCHAR NOT NULL CHECK (description <> ''),
    tags VARCHAR(500),    
    question_vote INTEGER DEFAULT 0,
    asked_on TIMESTAMP,
    asked_on_string VARCHAR(30)
);

CREATE TABLE answers(
    answer_id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(question_id),
    user_id INTEGER REFERENCES users(user_id),
    answer VARCHAR NOT NULL CHECK (answer <> ''),
    answer_vote INTEGER DEFAULT 0,
    answered_on TIMESTAMP,
    answered_on_string VARCHAR(30)
);

CREATE TABLE users(
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(130) NOT NULL CHECK (email <> ''),
    password CHAR(60) NOT NULL CHECK (password <> ''),
    salutation VARCHAR(4),
    academic_title VARCHAR(15),
    first_name VARCHAR(100) NOT NULL CHECK (first_name <> ''),
    last_name VARCHAR(100) NOT NULL CHECK (last_name <> ''),
    role VARCHAR(20),
    user_specialty VARCHAR(20)
);