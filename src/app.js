const path = require('path');
const express = require('express');

const app = express();

const { accounts, users, writeJSON } = require('./data');

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

app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});

app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});

app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

app.get('/profile', (req, res) => {
  res.render('profile', { users: users[0] });
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  accounts[req.body.from].balance = parseInt(accounts[req.body.from].balance)
    - parseInt(req.body.amount);
  accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance)
    + parseInt(req.body.amount);
  writeJSON();
  // const accountsJSON = JSON.stringify(accounts, null, 4);
  // fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
  res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (req, res) => {
  res.render('payment', {
    account: accounts.credit
  });
});

app.post('/payment', (req, res) => {
  accounts.credit.balance = parseInt(accounts.credit.balance)
    - parseInt(req.body.amount);
  accounts.credit.available = parseInt(accounts.credit.available)
    + parseInt(req.body.amount);
  accounts.checking.balance = parseInt(accounts.checking.balance)
    - parseInt(req.body.amount);
  writeJSON();
  // const accountsJSON = JSON.stringify(accounts, null, 4);
  // fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
  res.render('payment', {
    account: accounts.credit,
    message: 'Payment Completed'
  });
});
app.listen(3000, () => console.log('PS Project running on port 3000'));
