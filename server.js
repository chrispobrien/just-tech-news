const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// sess object
const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static pages such as stylesheets, images
app.use(express.static(path.join(__dirname, 'public')));

// Use session
app.use(session(sess));

// API routes
app.use(routes);

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and routes
sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});