const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');

const users = JSON.parse(userData);

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
  res.render('transfer', {
    from: 'checking',
    to: 'savings'
  });
});

app.post('/transfer', (req, res) => {
  accounts[req.body.from].balance = accounts[req.body.from].balance - parseInt(req.body.amount);
  accounts[req.body.to].balance = accounts[req.body.to].balance + parseInt(req.body.amount);
  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, { encoding: 'utf8' });
});

app.listen(3000, () => console.log('PS Project running on port 3000'));
