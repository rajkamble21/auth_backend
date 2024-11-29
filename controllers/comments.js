const pool = require('../db.js')

const createComment = async (req, res) => {
    try {
        console.log(req.body)
        let { article_id, body, author_id } = req.body.comment;
        article_id = parseInt(article_id)
        author_id = parseInt(author_id)
        let data = await pool.query(`insert into comments(article_id, body, author_id)
            values ($1, $2, $3) returning *`,
            [article_id, body, author_id])
        let updateArticle = await pool.query(`update articles set  comment_ids = array_append(comment_ids, $1)
               where id = $2
               returning *`, [data.rows[0].id, article_id])
        res.status(201).json({ article: data.rows[0] })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

module.exports = {
    createComment
}