const pool = require('../db.js')

const createArticle = async (req, res) => {
    try {
        let { title, description, body, tag_list, favorited, favorites_count, author_id } = req.body.article;
        author_id = parseInt(author_id)
        favorites_count = parseInt(favorites_count)
        let data = await pool.query(`insert into articles(title, description, body, tag_list, favorited, favorites_count, author_id)
            values ($1, $2, $3, $4, $5, $6, $7) returning *`,
            [title, description, body, tag_list, favorited, favorites_count, author_id])
        res.status(201).json({ article: data.rows[0] })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

const getAllArticles = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let data = await pool.query('select * from articles where id=$1', [id]);
        res.status(200).json({
            articles: data.rows,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

const deleteArticles = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let data = await pool.query('delete from articles where id=$1', [id]);
        res.status(200).json({
            articles: data.rows,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

const updateArticles = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let { title, description, body, tag_list, favorited, favorites_count } = req.body.user;
        let data = await pool.query('update articles set title = $1, description = $2, body = $3, tag_list = $4, favorited = $5, favorites_count = $6 where id = $7 returning *', [title, description, body, tag_list, favorited, favorites_count, id]);
        res.status(200).json({
            users: data.rows,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}


module.exports = {
    getAllArticles,
    createArticle,
    deleteArticles,
    updateArticles,
}