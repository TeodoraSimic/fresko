const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: '../.env' });
const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('POVEZANO');
  })
  .catch((err) => {
    console.log('GRESKA:');
    console.log(err);
  });

app.get('/', (req, res) => {
    res.send('Freshko API radi...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));