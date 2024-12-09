const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const geminiRouter = require('./Routes/geminiRouter');

const corsOptions = {
  origin: ["https://pic2plate.vercel.app", "http://localhost:5174"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions))


// app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', geminiRouter);


app.get('/', (req, res) => {
  res.send('Server is running');
});


module.exports = app;

app.listen(port, () => {
  console.log(`Server is running on :${port}`);
});
