const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();

const lanchesRoutes = require('./routes/lanchesRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use("/lanches", lanchesRoutes);
app.use("/users", userRoutes);

module.exports = app;