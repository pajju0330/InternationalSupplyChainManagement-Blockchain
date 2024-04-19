const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const cors = require('cors');
const RawMaterialServiceRouter = require('./Routers/RawMaterialServiceRouter')
const InventoryRouter = require('./Routers/InventoryRouter');
const UserRouter = require('./Routers/UserRoute');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/api/RawMaterial', RawMaterialServiceRouter);
app.use('/api/Inventory', InventoryRouter);
app.use('/api/User', UserRouter);
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


