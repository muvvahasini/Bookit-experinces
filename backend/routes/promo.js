const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:code', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM promo_codes WHERE code=$1', [req.params.code]);
    if (!rows[0] || new Date(rows[0].valid_until) < new Date()) {
      return res.status(400).json({ error: 'Promo code invalid' });
    }
    res.json(rows[0]);
  } catch (err) { next(err); }
});

module.exports = router;


