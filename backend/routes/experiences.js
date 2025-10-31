const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT * FROM experiences ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT * FROM experiences WHERE id=$1', [req.params.id]);
        res.json(rows[0]);
    } catch (err) { next(err); }
});

module.exports = router;


