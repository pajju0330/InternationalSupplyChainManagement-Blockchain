const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const RawMaterialServiceRouter = require('./Routers/RawMaterialServiceRouter');
dotenv.config();

app.use(express.json());
app.use('/RawMaterial', RawMaterialServiceRouter);
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const start = async() => {
   await connectDB();
   app.listen(port, () => {
    console.log(`Server is running on port ${port}, you can ctrl + click 🫳  http://localhost:${port}`);
  }); 
}

start();


