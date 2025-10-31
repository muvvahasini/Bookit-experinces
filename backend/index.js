const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Verify database connection on startup
try {
    db.query('SELECT 1').then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.error('Database connection failed:', err.message);
    });
} catch (e) {
    console.error('Database module load failed:', e.message);
}

app.use('/experiences', require('./routes/experiences'));
app.use('/slots', require('./routes/slots'));
app.use('/bookings', require('./routes/bookings'));
app.use('/promo', require('./routes/promo'));

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


