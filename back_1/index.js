const session = require('express-session');
const Keycloak = require('keycloak-connect');
const express = require('express');

const PORT = process.env.PORT || 3000;
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const app = express();
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));
app.use(keycloak.middleware());

app.get('/public', (_, res) => {
  res.send('Hello world');
})

const todos = [
  { text: 'Homework' },
  { text: 'Go shopping ' },
  { text: 'Do Yoga' }
]

app.get('/todos', keycloak.protect(), (_, res) => {
  res.send(todos)
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
})
