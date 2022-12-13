const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'collnow'
});

const createQuestion = async (title, specialty, setting, age, sex, primary_dx, secondary_dx, description, tags, user_id) => {
    const { rows } = await pool.query(
        `INSERT INTO questions(title, specialty, setting, age, sex, primary_dx, secondary_dx, description, tags, asked_on, user_id) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, $10) 
        RETURNING *`,
        [title, specialty, setting, age, sex, primary_dx, secondary_dx, description, tags, user_id]);
    return rows[0];
};

const getAllQuestions = async () => {
    const { rows } = await pool.query(
        `SELECT question_id, title, specialty, setting, age, sex, primary_dx, secondary_dx, description, tags, question_vote, asked_on, TO_CHAR(asked_on, 'DD.MM.YYYY um HH24:MI Uhr') AS asked_on_string, 
        questions.user_id, academic_title, first_name, last_name, role, user_specialty 
        FROM questions
        INNER JOIN users
        ON questions.user_id = users.user_id`
    );
    return rows;
};

const getQuestion = async (questionId) => {
    const { rows } = await pool.query(
        `SELECT question_id, title, specialty, setting, age, sex, primary_dx, secondary_dx, description, tags, question_vote, asked_on, TO_CHAR(asked_on, 'DD.MM.YYYY um HH24:MI Uhr') AS asked_on_string, 
        questions.user_id, academic_title, first_name, last_name, role, user_specialty 
        FROM questions
        INNER JOIN users
        ON questions.user_id = users.user_id 
        WHERE question_id = $1`,
        [questionId]);
    return rows[0];
};

const updateQuestionVote = async (question_vote, questionId) => {
    const { rows } = await pool.query('UPDATE questions SET question_vote = $1 WHERE question_id = $2 RETURNING *',
        [question_vote, questionId]);
    return rows[0];
};

const getAllAnswersToQuestion = async (questionId) => {
    const { rows } = await pool.query(
        `SELECT answer_id, question_id, answer, answer_vote, answered_on, TO_CHAR(answered_on, 'DD.MM.YYYY um HH24:MI Uhr') AS answered_on_string,
        answers.user_id, academic_title, first_name, last_name, role, user_specialty
        FROM answers 
        INNER JOIN users
        ON answers.user_id = users.user_id
        WHERE question_id = $1`,
        [questionId]);
    return rows;
};

const updateAnswerVote = async (answer_vote, questionId, answerId) => {
    const { rows } = await pool.query(
        `UPDATE answers 
        SET answer_vote = $1 
        WHERE question_id = $2 AND answer_id = $3 
        RETURNING *`,
        [answer_vote, questionId, answerId]);
    return rows[0];
};

const createAnswer = async (questionId, answer, user_id) => {
    const { rows } = await pool.query(
        `INSERT INTO answers(question_id, answer, answered_on, user_id) 
        VALUES($1, $2, CURRENT_TIMESTAMP, $3) 
        RETURNING *`,
        [questionId, answer, user_id]);
    return rows[0];
};

const searchQuestions = async (searchTerm) => {
    const { rows } = await pool.query(
        `SELECT question_id, title, specialty, setting, age, sex, primary_dx, secondary_dx, description, tags, question_vote, asked_on, TO_CHAR(asked_on, 'DD.MM.YYYY um HH24:MI Uhr') AS asked_on_string, 
        questions.user_id, academic_title, first_name, last_name, role, user_specialty 
        FROM questions
        INNER JOIN users
        ON questions.user_id = users.user_id
        WHERE title ILIKE $1 
        OR primary_dx ILIKE $1 
        OR secondary_dx ILIKE $1 
        OR description ILIKE $1
        OR tags ILIKE $1`,
        [`%${searchTerm}%`]
    );
    return rows;
};

module.exports = {
    pool,
    createQuestion,
    getAllQuestions,
    getQuestion,
    updateQuestionVote,
    getAllAnswersToQuestion,
    updateAnswerVote,
    createAnswer,
    searchQuestions
};