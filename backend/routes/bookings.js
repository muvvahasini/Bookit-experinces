const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/', async (req, res, next) => {
    const { experience_slot_id, user_name, user_email, promo_code, price } = req.body;
    try {
        const { rows } = await db.query('SELECT available FROM experience_slots WHERE id=$1', [experience_slot_id]);
        if (!rows[0] || rows[0].available < 1) {
            return res.status(400).json({ error: 'No slots available' });
        }
        await db.query(
            'INSERT INTO bookings (experience_slot_id, user_name, user_email, status, promo_code, price) VALUES ($1, $2, $3, $4, $5, $6)',
            [experience_slot_id, user_name, user_email, 'confirmed', promo_code, price]
        );
        await db.query('UPDATE experience_slots SET available=available-1 WHERE id=$1', [experience_slot_id]);
        res.json({ success: true });
    } catch (err) { next(err); }
});

module.exports = router;


