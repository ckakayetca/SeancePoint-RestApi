const express = require('express');
const expressCfg = require('./config/expressCfg');
const handlebarsCfg = require('./config/handlebarsCfg');
const mongoose = require('./config/mongooseCfg')
const routes = require('./routes');

const app = express();
const PORT = 3000;

expressCfg(app);
handlebarsCfg(app);
mongoose();

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));