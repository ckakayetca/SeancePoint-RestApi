const express = require('express');
const expressCfg = require('./config/expressCfg');
const mongoose = require('./config/mongooseCfg')
const routes = require('./routes');

const app = express();
const PORT = 3000;

expressCfg(app);
mongoose();

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));