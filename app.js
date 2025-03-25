const express = require('express')
const app = express()
const dbConfig = require('./app/config/app.config');
const connectDB = require('./app/config/database.config');
const port = dbConfig.port || 3001
const routes = require('./app/routes/routes')
const i18n = require('./app/config/language.config');

connectDB();

app.use(i18n.init);
app.use((req, res, next) => {
    const lang = req.query.lang || req.headers['accept-language'] || 'vi';
    i18n.setLocale(req, lang);
    next();
  });
app.use(express.json());
app.use('/api' , routes);
app.listen(port, () => console.log(`Example app listening on port: localhost:${port}`));