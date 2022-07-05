const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv-safe').config();

const db = require('./database/mongoConfig');
db.connect();

const lanchesRoutes = require('./routes/lanchesRoutes');

app.use(express.json());
app.use("/lanches", lanchesRoutes);

module.exports = app;