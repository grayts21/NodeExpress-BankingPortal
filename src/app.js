const path = require('path');
const express = require('express');

const app = express();

const { accounts, users, writeJSON } = require('./data');
const { accountRoutes } = require('./routes/accounts');
const { servicesRoutes } = require('./routes/services');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
// const accounts = JSON.parse(accountData);
// accounts();

// const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');
// const users = JSON.parse(userData);
// users();

app.get('/', (req, res) => res.render('index', { title: 'Accounts Summary', accounts }));

app.get('/profile', (req, res) => {
  res.render('profile', { users: users[0] });
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.listen(3000, () => console.log('PS Project running on port 3000'));
