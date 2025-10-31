const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.includes('bookit-frontend') && origin.includes('vercel.app'))
      return callback(null, true);
    if (origin.startsWith('http://localhost'))
      return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

db.query('SELECT 1')
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection failed:', err.message));

app.use('/experiences', require('./routes/experiences'));
app.use('/slots', require('./routes/slots'));
app.use('/bookings', require('./routes/bookings'));
app.use('/promo', require('./routes/promo'));
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
