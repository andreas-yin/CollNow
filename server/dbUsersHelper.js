const { pool } = require('./db');
const bcrypt = require('bcryptjs');


const emailExists = async (email) => {
    const data = await pool.query(
        `SELECT * 
        FROM users 
        WHERE email = $1`, [email]);
    if (data.rowCount === 0) return false;
    return data.rows[0];
};

const createUser = async (email, password, salutation, academic_title, first_name, last_name, role, user_specialty) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const data = await pool.query(
        `INSERT INTO users(email, password, salutation, academic_title, first_name, last_name, role, user_specialty) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [email, hash, salutation, academic_title, first_name, last_name, role, user_specialty]);
    
    if (data.rowCount === 0) return false;
    return data.rows[0];
};

const matchPassword = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match; //returns true or false
};

module.exports = { emailExists, createUser, matchPassword };