const pool = require('../db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const saltRounds = 10;



const register = async (req, res) => {
    try {
        let { username, email, password } = req.body.user;

        let userExists = await pool.query(`select * from users where email = $1`, [email])
        if (userExists.rows.length == 0) {
            res.status(400).json({ error: 'User Already exists with that email' })
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        let data = await pool.query(`insert into users(username, email, password)
                                   values ($1, $2, $3) returning *`, [username, email, hashedPassword])
        res.status(201).json({
            user: data.rows
        })
    } catch (error) {
        res.status(500).json({ error })
    }

}

const login = async (req, res) => {
    try {
        let { email, password } = req.body.user;
        let data = await pool.query(`select * from users where email = $1`, [email])
        if (data.rows.length == 0) {
            res.status(400).json({ error: 'Invalid email & password' })
        }
        let userExists = data.rows[0];
        let isValid = bcrypt.compareSync(password, userExists.password);
        if (!isValid) {
            res.status(400).json({ error: 'Invalid email & password' })
        }
        let token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET);
        res.json({
            user: {
                username: userExists.username,
                password: userExists.password,
                token
            }
        })
    } catch (error) {
        res.status(500).json({ error })
    }

}

const getAllUsers = async (req, res) => {
    try {
        let data = await pool.query('select * from users');
        res.status(200).json({
            users: data.rows,
        })
    } catch (error) {
        res.status(500).json({ error })
    }

}

module.exports = {
    register,
    login,
    getAllUsers
}