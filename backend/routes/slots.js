const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:experienceId', async (req, res, next) => {
    try {
        const { rows } = await db.query(
            'SELECT * FROM experience_slots WHERE experience_id=$1',
            [req.params.experienceId]
        );
        res.json(rows);
    } catch (err) { next(err); }
});

// Get single slot by id
router.get('/id/:slotId', async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT * FROM experience_slots WHERE id=$1', [req.params.slotId]);
        if (!rows[0]) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) { next(err); }
});

module.exports = router;


