const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

(async function () {
  try {
    const PORT = process.env.PORT || 5000;
    const corsOptions = {
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    };

    const app = express();
    app.use(cors(corsOptions));
    app.use(express.json({ extended: true }));

    app.use('/doctor', require('./routes/doctor.routes'));
    app.use('/appointment', require('./routes/appointment.routes'));

    if (process.env.NODE_ENV === 'production') {
      app.use('/', express.static(path.join(__dirname, 'client', 'build')));

      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log('server has been started on port', PORT);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
