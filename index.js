const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(bodyParser.raw());
// app.use(bodyParser.text());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/group', require('./routes/group.routes'));
app.use('/api/user', require('./routes/user.routes'));

const PORT = process.env.port || config.get('port');

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            console.log('Database connected ...')
        })
        .catch(e => {
            console.log('Database connect error:', e)
            throw (e);
        });

        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        });
    } catch(e) {
        console.log('Ошибка: ', e);
        process.exit(1)
    }
}

start();
